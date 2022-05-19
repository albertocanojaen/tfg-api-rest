import { Request, Response } from 'express';
import UsersService from '../../services/users-service';
import { Controller } from '../../../interfaces/controller';
import httpStatus from 'http-status';
import { UserEraserValidator } from '../../validators/users/user-eraser-validator';

export class DeleteUserController implements Controller {
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
        await new UserEraserValidator().validate({
            id: userId,
        });

        // Erase from the database
        await new UsersService().delete(userId);

        // Return the response
        response.status(httpStatus.OK).send();
    }
}
