import { User } from '@prisma/client';
import { ValidationParameters } from '../../../interfaces/validation-parameters';
import { Criteria } from '../../../lib/criteria/criteria';
import { Filters } from '../../../lib/criteria/filters';
import { Order } from '../../../lib/criteria/order';
import { usersRepository } from '../repository/users-repository';
import { usersValidator, UsersValidator } from './users-validator';
import { EmailAlreadyInUse } from '../errors/email-already-in-use';
import { CRUD } from '../../../interfaces/service';
import { Validator } from '../../../interfaces/validator';

export class UserUpdaterValidator implements Validator<User> {
    /**
     * Class constructor
     * @param _userRepository
     */
    constructor(private _userRepository: CRUD<User>, private _usersValidator: Validator<User>) {}

    public async validate(parameters: ValidationParameters<User>): Promise<void> {
        // Call the parent validations
        await this._usersValidator.validate(parameters);

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
        const response = await this._userRepository.getByCriteria(criteria);

        // Check if the response is empty
        if (!response.length) {
            // Cut the execution
            return;
        }

        // Throw an error
        throw new EmailAlreadyInUse(parameters.object!.email);
    }
}

// Instantiate the user creator validator
const userUpdaterValidator = new UserUpdaterValidator(usersRepository, usersValidator);

// Export the instance
export { userUpdaterValidator };
