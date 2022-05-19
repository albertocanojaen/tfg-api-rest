import { Request, Response } from 'express';
import UsersService from '../../services/users-service';
import { Controller } from '../../../interfaces/controller';
import httpStatus from 'http-status';
import { UserCreatorValidator } from '../../validators/users/user-creator-validator';
import { UserModel } from '../../models/user-model';
import { User } from '@prisma/client';
import { ValidationParameters } from '../../../interfaces/validation-parameters';

export class CreateUserController implements Controller {
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

        // Validate the creation
        await new UserCreatorValidator().validate(validationParams);

        // Create the user model
        const user = new UserModel(request.body);

        // Insert into the database
        await new UsersService().create(user.fromModelToPrisma());

        // Return the response
        response.status(httpStatus.OK).send();
    }
}
