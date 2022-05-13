import { Request, Response } from 'express';
import UsersService from '../../services/users-service';
import { User } from '@prisma/client';
import { Controller } from '../../../interfaces/controller';
import httpStatus from 'http-status';
import { UserCreatorValidator } from '../../validators/users/user-creator-validator';

export class CreateUserController implements Controller {
    private static instance: CreateUserController;

    /**
     * Class to check if the class is instantiated (Singleton)
     * @returns
     */
    static getInstance() {
        // Check if the class is not instantiated
        if (!this.instance) {
            CreateUserController.instance = new CreateUserController();
        }

        // Return the instance
        return CreateUserController.instance;
    }

    /**
     * Execute the use case
     * @param request
     * @param response
     * @returns
     */
    public async run(request: Request, response: Response): Promise<any> {
        // Instance the validator
        let validator = new UserCreatorValidator();

        // Call the validator
        await validator.validate(request.body);

        // Create the object
        const user: User = request.body;

        console.log(user);

        // Insert into the database
        await UsersService.create(request.body);

        // Return the response
        response.status(httpStatus.OK).send();
    }
}
