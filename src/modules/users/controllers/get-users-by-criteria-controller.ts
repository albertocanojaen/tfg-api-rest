import { Request, Response } from 'express';
import { usersRepository } from '../repository/users-repository';
import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Controller } from '../../../lib/controller/controller';
import { Criteria } from '../../../lib/criteria/classes/criteria';
import { CRUD } from '../../../lib/crud/crud';

export class GetUsersByCriteriaController implements Controller {
    /**
     * Class constructor
     * @param _userRepository
     * @param _userValidator
     */
    constructor(private _userRepository: CRUD<User>) {}

    /**
     * Execute the use case
     * @param request
     * @param response
     * @returns
     */
    public async run(request: Request, response: Response): Promise<void> {
        // Generate the criteria from the request body
        const criteria: Criteria = Criteria.fromBodyParameters(request.body);

        // Call the service to insert into the database
        const users: User[] = await this._userRepository.getByCriteria(criteria);

        // Return the response
        response.status(httpStatus.OK).send({ result: true, list: users });
    }
}

const getUsersByCriteriaController = new GetUsersByCriteriaController(usersRepository);

export { getUsersByCriteriaController };
