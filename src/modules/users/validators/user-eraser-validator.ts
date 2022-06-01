import { User } from '@prisma/client';
import { ValidationParameters } from '../../../interfaces/validation-parameters';
import { Criteria } from '../../../lib/criteria/criteria';
import { Filters } from '../../../lib/criteria/filters';
import { Order } from '../../../lib/criteria/order';
import { usersRepository } from '../repository/users-repository';
import { UsersValidator } from '../users-validator';
import { UserNotExists } from '../errors/user-not-exists';
import { CRUD } from '../../../interfaces/service';

export class UserEraserValidator extends UsersValidator {
    /**
     * Class constructor
     * @param _userRepository
     */
    constructor(private _userRepository: CRUD<User>) {
        super();
    }

    public override async validate(parameters: ValidationParameters<User>): Promise<void> {
        // Call the parent validation
        await super.validate(parameters);

        // Ensure user to delete exists
        await this._ensureUserToDeleteExists(parameters.id!);
    }

    private async _ensureUserToDeleteExists(id: number) {
        // Generate the criteria
        const criteria = new Criteria(
            Filters.fromValues([
                {
                    connector: 'AND',
                    field: 'id',
                    operator: 'equals',
                    value: id as unknown as string,
                },
            ]),
            Order.defaultOrder()
        );

        // Search the users with the received identifier
        const response = await this._userRepository.getByCriteria(criteria);

        // Check if the user not exists
        if (!response || !response.length) {
            throw new UserNotExists();
        }
    }
}

const userEraserValidator = new UserEraserValidator(usersRepository);

export { userEraserValidator };
