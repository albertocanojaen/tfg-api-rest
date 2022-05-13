import { Request, Response } from 'express';
import UsersService from '../../services/users-service';
import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Controller } from '../../../interfaces/controller';

class GetUsersController implements Controller {
    private static instance: GetUsersController;

    /**
     * Method that handles the singleton class
     *
     * @return instance
     */
    static getInstance(): GetUsersController {
        if (!GetUsersController.instance) {
            GetUsersController.instance = new GetUsersController();
        }

        return GetUsersController.instance;
    }

    public async run(request: Request, response: Response): Promise<any> {
        // Call the service to insert into the database
        const users: User[] = await UsersService.listAllUsers();

        // Return the response
        response.status(httpStatus.OK).send(users);
    }
}

export default GetUsersController.getInstance();
