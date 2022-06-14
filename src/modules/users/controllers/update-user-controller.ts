import { Request, Response } from 'express';
import { Controller } from '../../../lib/controller/controller';
import httpStatus from 'http-status';
import { UserModel } from '../models/UserModel';
import { userUpdaterValidator } from '../validators/user-updater-validator';
import { Repository } from '../../../lib/repository';
import { User } from '@prisma/client';
import { Validator } from '../../../lib/validation/validator';
import { usersRepository } from '../repository/users-repository';

export class UpdateUserController implements Controller {
    /**
     * Class constructor
     * @param _userRepository
     * @param _userValidator
     */
    constructor(private _userRepository: Repository<User>, private _userValidator: Validator<User>) {}

    /**
     * Execute the use case
     * @param request
     * @param response
     * @returns
     */
    public async run(request: Request, response: Response): Promise<void> {
        // Parse the identifier to a number
        const userId = Number(request.params.id);

        // Validate for update
        await this._userValidator.validate({
            id: userId,
            object: request.body,
        });

        // Get the user form the database
        const savedUser = await this._userRepository.getById(userId);

        // Merge the repository user with the modified fields
        const user = Object.assign<UserModel, User>(UserModel.fromPrismaToModel(savedUser)!, request.body);

        // Insert into the database
        await this._userRepository.update(user.fromModelToPrisma());

        // Return the response
        response.status(httpStatus.OK).send();
    }
}

const updateUserController = new UpdateUserController(usersRepository, userUpdaterValidator);

export { updateUserController };
