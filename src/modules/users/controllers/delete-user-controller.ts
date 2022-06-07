import { Request, Response } from 'express';
import { usersRepository } from '../repository/users-repository';
import { Controller } from '../../../lib/controller/controller';
import httpStatus from 'http-status';
import { userEraserValidator } from '../validators/user-eraser-validator';
import { CRUD } from '../../../lib/crud/crud';
import { User } from '@prisma/client';
import { Validator } from '../../../lib/validation/validator';

export class DeleteUserController implements Controller {
    /**
     * Class constructor
     * @param _userRepository
     * @param _userValidator
     */
    constructor(private _userRepository: CRUD<User>, private _userValidator: Validator<User>) {}

    /**
     * Execute the use case
     * @param request
     * @param response
     * @returns
     */
    public async run(request: Request, response: Response): Promise<void> {
        // Gets the user identifier
        const userId = Number(request.params.id);

        // Validate for erase
        await this._userValidator.validate({
            id: userId,
        });

        // Erase from the database
        await this._userRepository.delete(userId);

        // Return the response
        response.status(httpStatus.OK).send();
    }
}

const deleteUserController = new DeleteUserController(usersRepository, userEraserValidator);

export { deleteUserController };
