import { Request, Response } from 'express';
import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Controller } from '../../../interfaces/controller';
import { IdentifierIsEmpty } from '../errors/identifier-is-empty';
import { CRUD } from '../../../interfaces/service';
import { usersRepository } from '../repository/users-repository';

class GetUserByIdController implements Controller {
    /**
     * Class constructor
     * @param _userRepository
     * @param _userValidator
     */
    constructor(private _userRepository: CRUD<User>) {}

    /**
     * Execute the use case
     * @param request
     * @param response
     * @returns
     */
    public async run(request: Request, response: Response): Promise<void> {
        // Check if the user id is given in the parameters
        if (!request.params.id) {
            // Throw error if is empty
            throw new IdentifierIsEmpty();
        }

        // Parse the identifier from string to number
        const id = Number(request.params.id);

        // Call the repository to get the user by id
        const user: User | null = await this._userRepository.getById(id);

        // Return the response
        response.status(httpStatus.OK).send(user);
    }
}

const getUserByIdController = new GetUserByIdController(usersRepository);

export { getUserByIdController };
