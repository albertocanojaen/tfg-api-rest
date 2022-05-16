import { Request, Response } from 'express';
import UsersService from '../../services/users-service';
import { User } from '@prisma/client';
import { Controller } from '../../../interfaces/controller';
import httpStatus from 'http-status';
import { UserCreatorValidator } from '../../validators/users/user-creator-validator';
import { Passwords } from '../../../lib/password';
import { UserEraserValidator } from '../../validators/users/user-eraser-validator';

export class DeleteUserController implements Controller {
    /**
     * Execute the use case
     * @param request
     * @param response
     * @returns
     */
    public async run(request: Request, response: Response): Promise<any> {
        // Gets the user identifier
        const userId = Number(request.params.id);

        // Get the user object
        const user: User = {
            id: userId,
            createdAt: new Date(),
            email: '',
            name: null,
            password: '',
        };

        // Validate for erase
        await new UserEraserValidator().validate(user);

        // Erase from the database
        await new UsersService().delete(userId);

        // Return the response
        response.status(httpStatus.OK).send();
    }
}
