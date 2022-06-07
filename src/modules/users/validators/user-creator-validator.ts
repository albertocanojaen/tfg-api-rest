import { User } from '@prisma/client';
import { ValidationParameters } from '../../../lib/validation/validation-parameters';
import { Criteria } from '../../../lib/criteria/classes/criteria';
import { Filters } from '../../../lib/criteria/classes/filters';
import { Order } from '../../../lib/criteria/classes/order';
import { EmailAlreadyInUse } from '../errors/email-already-in-use';
import { CRUD } from '../../../interfaces/service';
import { usersRepository } from '../repository/users-repository';
import { Validator } from '../../../lib/validation/validator';

class UserCreatorValidator implements Validator<User> {
    /**
     * Class constructor
     * @param _userRepository
     */
    constructor(private _userRepository: CRUD<User>) {}

    /**
     * Validate the user primitives
     *
     * @param primitives
     */

    public async validate(primitives: ValidationParameters<User>): Promise<void> {
        // Ensure the user object is defined
        this._ensureUserObjectIsDefined(primitives);

        // Ensure the email for creation is not used by another user
        await this._ensureEmailIsNotBeingUsedByAnotherUser(primitives.object!);
    }

    /**
     * Ensure the object to create is defined
     * @param primitives
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
        const response = await this._userRepository.getByCriteria(criteria);

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

// Instantiate the user creator validator
const userCreatorValidator = new UserCreatorValidator(usersRepository);

// Export the instance
export { userCreatorValidator };
