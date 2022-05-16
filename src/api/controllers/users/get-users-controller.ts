import { Request, Response } from 'express';
import UsersService from '../../services/users-service';
import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Controller } from '../../../interfaces/controller';

export class GetUsersController implements Controller {
    public async run(request: Request, response: Response): Promise<any> {
        // Call the service to insert into the database
        const users: User[] = await new UsersService().read({});

        // Return the response
        response.status(httpStatus.OK).send(users);
    }
}
