import { Request, Response } from 'express';
import { Controller } from '../../../interfaces/controller';
import httpStatus from 'http-status';
import { User } from '@prisma/client';
import { CRUD } from '../../../interfaces/service';
import { usersRepository } from '../../users/repository/users-repository';
import { InvalidCredentialsError } from '../errors/invalid-credentials';
import { AuthenticationToken } from '../../../lib/authentication-token/authentication-token';
import { AuthenticationTokenPrimitives } from '../../../lib/authentication-token/authentication-token-primitives';
import { AuthenticationByTokenPrimitives } from '../../../lib/authentication-token/authentication-by-token-primitives';

class AuthenticateByTokenController implements Controller {
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
        const primitives: AuthenticationByTokenPrimitives = {
            token: request.body.token,
        };

        // Check if the received token is empty
        if (!primitives.token) {
            throw new InvalidCredentialsError();
        }

        // Decode the given token
        const token = await AuthenticationToken.fromEncoded<AuthenticationTokenPrimitives>(request.body.token, this._secretKey);

        // Search the user with the following criteria
        const user = await this._repository.getById(token.decoded.idUser);

        // Check if no users were found
        this._ensureUserExists(user!);

        // Return the decoded token
        response.status(httpStatus.OK).send({
            token: token.decoded,
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
}

// Instantiate the controller injecting the dependencies
const authenticateByTokenController = new AuthenticateByTokenController(usersRepository, process.env.SECRET_KEY!);

// Export the instance
export { authenticateByTokenController };
