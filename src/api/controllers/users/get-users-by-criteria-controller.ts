import { Request, Response } from 'express';
import UsersService from '../../services/users-service';
import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Controller } from '../../../interfaces/controller';
import { Criteria } from '../../../lib/criteria/criteria';

export class GetUsersByCriteriaController implements Controller {
    public async run(request: Request, response: Response): Promise<void> {
        // Generate the criteria from the request body
        const criteria: Criteria = Criteria.fromBodyParameters(request.body);

        // Call the service to insert into the database
        const users: User[] = await new UsersService().getByCriteria(criteria);

        // Return the response
        response.status(httpStatus.OK).send({ result: true, list: users });
    }
}
