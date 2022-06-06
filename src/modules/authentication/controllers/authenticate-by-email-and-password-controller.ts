import { Request, Response } from 'express';
import { Controller } from '../../../interfaces/controller';
import httpStatus from 'http-status';
import { User } from '@prisma/client';
import { CRUD } from '../../../interfaces/service';
import { usersRepository } from '../../users/repository/users-repository';
import { InvalidCredentialsError } from '../errors/invalid-credentials';
import { Criteria } from '../../../lib/criteria/criteria';
import { Filters } from '../../../lib/criteria/filters';
import { Order } from '../../../lib/criteria/order';
import { AuthenticationByEmailAndPasswordPrimitives } from '../../../lib/authentication-token/authentication-by-email-and-password-primitives';
import { Passwords } from '../../../lib/password';
import { AuthenticationToken } from '../../../lib/authentication-token/authentication-token';
import { AuthenticationTokenPrimitives } from '../../../lib/authentication-token/authentication-token-primitives';

class AuthenticateByEmailAndPasswordController implements Controller {
    /**
     * Class constructor
     * @param _repository
     * @param _userValidator
     */
    constructor(private _repository: CRUD<User>, private _secretKey: string) {}

    /**
     * Execute the use case
     * @param request
     * @param response
     * @returns
     */
    public async run(request: Request, response: Response): Promise<void> {
        // Get the username and password form the body parameters
        const primitives: AuthenticationByEmailAndPasswordPrimitives = {
            email: request.body.email,
            password: request.body.password,
        };

        // Check if the received email or password are empty
        if (!primitives.email || !primitives.password) {
            throw new InvalidCredentialsError();
        }

        // Generate the criteria
        const criteria = new Criteria(
            Filters.fromValues([
                {
                    connector: 'AND',
                    field: 'email',
                    operator: 'equals',
                    value: primitives.email,
                },
            ]),
            Order.defaultOrder()
        );

        // Search the user with the following criteria
        const users = await this._repository.getByCriteria(criteria);

        // Check if no users were found
        this._ensureUserExists(users[0]);

        // Check if the passwords matches
        this._ensurePasswordsMatch(users[0], primitives);

        // Return the response
        response.status(httpStatus.OK).send({
            user: users[0],
            token: await AuthenticationToken.fromPrimitives<AuthenticationTokenPrimitives>(
                { idUser: users[0].id },
                this._secretKey,
                { expiresIn: '15m' }
            ),
        });
    }

    /**
     * Ensure the user exists in the repository
     * @param user
     */
    private _ensureUserExists(user: User): void {
        // Check if the user exists on the repository
        if (user) {
            return;
        }

        // Throw an error
        throw new InvalidCredentialsError();
    }

    /**
     * Ensure passwords match
     * @param user
     * @param primitives
     */
    private _ensurePasswordsMatch(user: User, primitives: AuthenticationByEmailAndPasswordPrimitives): void {
        // Check if the passwords matches
        if (Passwords.areEquals(user.password, primitives.password)) {
            // Cut the execution
            return;
        }

        // Throw an error
        throw new InvalidCredentialsError();
    }
}

// Instantiate the controller injecting the dependencies
const authenticateByEmailAndPasswordController = new AuthenticateByEmailAndPasswordController(
    usersRepository,
    process.env.SECRET_KEY || ''
);

// Export the instance
export { authenticateByEmailAndPasswordController };
