import { User } from '@prisma/client';
import { ValidationParameters } from '../../../interfaces/validation-parameters';
import { Criteria } from '../../../lib/criteria/criteria';
import { Filters } from '../../../lib/criteria/filters';
import { Order } from '../../../lib/criteria/order';
import UsersService from '../../services/users-service';
import { UserValidator } from '../user-validator';
import { EmailAlreadyInUse } from '../../../exceptions/users/email-already-in-use';

export class UserUpdaterValidator extends UserValidator {
    public override async validate(parameters: ValidationParameters<User>): Promise<void> {
        // Call the parent validations
        await super.validate(parameters);

        // Ensure the user object and identifier are defined
        this._ensureObjectAndIdentifierAreDefined(parameters);

        // Ensure the updated email is not used by another distributor
        await this._ensureUpdatedEmailIsNotUsedByAnotherUser(parameters);
    }

    /**
     * Determines if the validation parameters are valid
     *
     * @param parameters
     */
    private _ensureObjectAndIdentifierAreDefined(parameters: ValidationParameters<User>): void {
        // Check if the validation parameters are defined
        if (!parameters.id || !parameters) {
            throw new Error();
        }
    }

    /**
     * Determines if the updated email is not used by another user (only if an email is provided in body params)
     *
     * @param parameters
     */
    private async _ensureUpdatedEmailIsNotUsedByAnotherUser(parameters: ValidationParameters<User>): Promise<void> {
        // Check if the email is not updated
        if (!parameters.object?.email) {
            // Cut the execution
            return;
        }

        // Generate the criteria
        const criteria = new Criteria(
            Filters.fromValues([
                {
                    connector: 'AND',
                    field: 'email',
                    operator: 'equals',
                    value: parameters.object!.email,
                },
                {
                    connector: 'OR',
                    field: 'id',
                    operator: 'not',
                    value: parameters.id as unknown as string,
                },
            ]),
            Order.defaultOrder()
        );

        // Search the users with the received email and distinct email
        const response = await new UsersService().getByCriteria(criteria);

        // Check if the response is empty
        if (!response.length) {
            // Cut the execution
            return;
        }

        // Throw an error
        throw new EmailAlreadyInUse(parameters.object!.email);
    }
}
