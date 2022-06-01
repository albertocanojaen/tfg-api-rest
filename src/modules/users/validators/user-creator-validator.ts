import { User } from '@prisma/client';
import { UsersValidator } from '../users-validator';
import { ValidationParameters } from '../../../interfaces/validation-parameters';
import { Criteria } from '../../../lib/criteria/criteria';
import { Filters } from '../../../lib/criteria/filters';
import { Order } from '../../../lib/criteria/order';
import { EmailAlreadyInUse } from '../errors/email-already-in-use';
import { CRUD } from '../../../interfaces/service';
import { usersRepository } from '../repository/users-repository';

class UserCreatorValidator extends UsersValidator {
    /**
     * Class constructor
     * @param _userRepository
     */
    constructor(private _userRepository: CRUD<User>) {
        // Call the parent constructor
        super();
    }

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
