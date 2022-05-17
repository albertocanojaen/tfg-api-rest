import { Request, Response } from 'express';
import UsersService from '../../services/users-service';
import { Controller } from '../../../interfaces/controller';
import httpStatus from 'http-status';
import { UserCreatorValidator } from '../../validators/users/user-creator-validator';
import { UserModel } from '../../models/user-model';
import { User } from '@prisma/client';

export class CreateUserController implements Controller {
    /**
     * Execute the use case
     * @param request
     * @param response
     * @returns
     */
    public async run(request: Request, response: Response): Promise<void> {
        // Validate the body parameters
        await new UserCreatorValidator().validate(request.body);

        // Create the user model
        const user: User = new UserModel(request.body);

        // Insert into the database
        await new UsersService().create(user);

        // Return the response
        response.status(httpStatus.OK).send();
    }
}
