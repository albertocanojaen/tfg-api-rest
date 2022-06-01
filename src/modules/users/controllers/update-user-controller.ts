import { Request, Response } from 'express';
import { Controller } from '../../../interfaces/controller';
import httpStatus from 'http-status';
import { UserModel } from '../../../models/user';
import { userUpdaterValidator } from '../validators/user-updater-validator';
import { CRUD } from '../../../interfaces/service';
import { User } from '@prisma/client';
import { Validator } from '../../../interfaces/validator';
import { usersRepository } from '../repository/users-repository';

export class UpdateUserController implements Controller {
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
        // Parse the identifier to a number
        const userId = Number(request.params.id);

        // Validate the update
        await this._userValidator.validate({
            id: userId,
            object: request.body,
        });

        // Get the user form the database
        let savedUser = await this._userRepository.getById(userId);

        // Get the user data from the database
        const user = Object.assign(UserModel.fromPrismaToModel(savedUser)!, request.body);

        // Insert into the database
        await this._userRepository.update(user.fromModelToPrisma());

        // Return the response
        response.status(httpStatus.OK).send();
    }
}

const updateUserController = new UpdateUserController(usersRepository, userUpdaterValidator);

export { updateUserController };
