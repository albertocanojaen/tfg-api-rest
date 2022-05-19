import { User } from '@prisma/client';
import { ValidationParameters } from '../../../interfaces/validation-parameters';
import { Criteria } from '../../../lib/criteria/criteria';
import { Filters } from '../../../lib/criteria/filters';
import { Order } from '../../../lib/criteria/order';
import UsersService from '../../services/users-service';
import { UserValidator } from '../user-validator';
import { UserNotExists } from '../../../exceptions/users/user-not-exists';

export class UserEraserValidator extends UserValidator {
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
        const response = await new UsersService().getByCriteria(criteria);

        // Check if the user not exists
        if (!response || !response.length) {
            throw new UserNotExists();
        }
    }
}
