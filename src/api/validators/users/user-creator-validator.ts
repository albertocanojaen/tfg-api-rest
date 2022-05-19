import { User } from '@prisma/client';
import { UserValidator } from '../user-validator';
import { ValidationParameters } from '../../../interfaces/validation-parameters';
import { Criteria } from '../../../lib/criteria/criteria';
import { Filters } from '../../../lib/criteria/filters';
import { Order } from '../../../lib/criteria/order';
import UsersService from '../../services/users-service';
import { EmailAlreadyInUse } from '../../../exceptions/users/email-already-in-use';

export class UserCreatorValidator extends UserValidator {
    /**
     * Validate the user primitives
     *
     * @param primitives
     */

    public override async validate(primitives: ValidationParameters<User>): Promise<void> {
        // Call the parent validation
        await super.validate(primitives);

        // Ensure the user object is defined
        this._ensureUserObjectIsDefined(primitives);

        // Ensure the email for creation is not used by another user
        await this._ensureEmailIsNotBeingUsedByAnotherUser(primitives.object!);
    }

    /**
     * Ensure the object to create is defined
     * @param object
     * @returns
     */
    private _ensureUserObjectIsDefined(primitives: ValidationParameters<User>): void {
        // Check if the user to insert is not defined
        if (!primitives.object) {
            throw new Error();
        }
    }

    /**
     * Ensure the email for creation is not used by another user
     * @param object
     * @returns
     */
    private async _ensureEmailIsNotBeingUsedByAnotherUser(object: User): Promise<void> {
        // Generate the criteria
        const criteria = new Criteria(
            Filters.fromValues([
                {
                    connector: 'AND',
                    field: 'email',
                    operator: 'equals',
                    value: object.email,
                },
            ]),
            Order.defaultOrder()
        );

        // Search the users with the received email
        const response = await new UsersService().getByCriteria(criteria);

        console.log(response);

        // Check if the response is empty
        if (!response || !response.length) {
            // Cut the execution
            return;
        }

        // Throw an error
        throw new EmailAlreadyInUse(object.email);
    }
}
