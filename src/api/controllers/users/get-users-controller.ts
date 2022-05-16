import { Request, Response } from 'express';
import UsersService from '../../services/users-service';
import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Controller } from '../../../interfaces/controller';
import { Criteria } from '../../../lib/criteria/criteria';

export class GetUsersController implements Controller {
    public async run(request: Request, response: Response): Promise<any> {
        // Generate the criteria from the request body
        let criteria: Criteria = Criteria.fromBodyParameters(request.body);

        // Call the service to insert into the database
        const users: User[] = await new UsersService().read(criteria.parseCriteriaToPrisma());

        // Return the response
        response.status(httpStatus.OK).send(users);
    }
}
