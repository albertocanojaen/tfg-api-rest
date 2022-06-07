import { Request, Response } from 'express';
import { Controller } from '../../../lib/controller/controller';
import httpStatus from 'http-status';
import { UserModel } from '../models/UserModel';
import { User } from '@prisma/client';
import { ValidationParameters } from '../../../lib/validation/validation-parameters';
import { CRUD } from '../../../lib/crud/crud';
import { Validator } from '../../../lib/validation/validator';
import { userCreatorValidator } from '../validators/user-creator-validator';
import { usersRepository } from '../repository/users-repository';

class CreateUserController implements Controller {
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
        // Generate the validation parameters
        const validationParams: ValidationParameters<User> = {
            object: request.body,
        };

        // Validate for create
        await this._userValidator.validate(validationParams);

        // Create the user model
        const user = new UserModel(request.body);

        // Insert into the database
        await this._userRepository.create(user.fromModelToPrisma());

        // Return the response
        response.status(httpStatus.OK).send();
    }
}

// Instantiate the controller injecting the dependencies
const createUserController = new CreateUserController(usersRepository, userCreatorValidator);

// Export the instance
export { createUserController };
