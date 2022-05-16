import { Request, Response } from 'express';
import UsersService from '../../services/users-service';
import { User } from '@prisma/client';
import { Controller } from '../../../interfaces/controller';
import httpStatus from 'http-status';
import { UserCreatorValidator } from '../../validators/users/user-creator-validator';
import { nextTick } from 'process';
import { Passwords } from '../../../lib/password';

export class CreateUserController implements Controller {
    /**
     * Execute the use case
     * @param request
     * @param response
     * @returns
     */
    public async run(request: Request, response: Response): Promise<any> {
        // Validate the body parameters
        await new UserCreatorValidator().validate(request.body);

        // Encrypt the user password
        request.body.password = Passwords.encrypt(request.body.password);

        // Create the object
        const user: User = request.body;

        // Insert into the database
        await new UsersService().create(request.body);

        // Return the response
        response.status(httpStatus.OK).send();
    }
}
