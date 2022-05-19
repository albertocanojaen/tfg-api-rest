import { Request, Response } from 'express';
import UsersService from '../../services/users-service';
import { Controller } from '../../../interfaces/controller';
import httpStatus from 'http-status';
import { UserModel } from '../../models/user-model';
import { UserUpdaterValidator } from '../../validators/users/user-updater-validator';
import { User } from '@prisma/client';

export class UpdateUserController implements Controller {
    /**
     * Execute the use case
     * @param request
     * @param response
     * @returns
     */
    public async run(request: Request, response: Response): Promise<void> {
        // Parse the identifier to a number
        const userId = Number(request.params.id);

        // Validate the update
        await new UserUpdaterValidator().validate({
            id: userId,
            object: request.body,
        });

        // Get the user form the database
        let savedUser = await new UsersService().getById(userId);

        // Get the user data from the database
        const user = Object.assign(UserModel.fromPrismaToModel(savedUser)!, request.body);

        // Insert into the database
        await new UsersService().update(user.fromModelToPrisma());

        // Return the response
        response.status(httpStatus.OK).send();
    }
}
