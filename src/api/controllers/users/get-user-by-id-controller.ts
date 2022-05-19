import { Request, Response } from 'express';
import UsersService from '../../services/users-service';
import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Controller } from '../../../interfaces/controller';
import { IdentifierIsEmpty } from '../../../exceptions/users/identifier-is-empty';

export class GetUserByIdController implements Controller {
    public async run(request: Request, response: Response): Promise<void> {
        // Check if the user id is given in the parameters
        if (!request.params.id) {
            // Throw error if is empty
            throw new IdentifierIsEmpty();
        }

        // Parse the identifier from string to number
        const id = Number(request.params.id);

        // Call the service to get the user by id
        const user: User | null = await new UsersService().getById(id);

        // Return the response
        response.status(httpStatus.OK).send(user);
    }
}
