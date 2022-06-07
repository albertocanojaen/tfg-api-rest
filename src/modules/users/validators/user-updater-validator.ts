import { User } from '@prisma/client';
import { ValidationParameters } from '../../../lib/validation/validation-parameters';
import { Criteria } from '../../../lib/criteria/classes/criteria';
import { Filters } from '../../../lib/criteria/classes/filters';
import { Order } from '../../../lib/criteria/classes/order';
import { usersRepository } from '../repository/users-repository';
import { usersValidator } from './users-validator';
import { EmailAlreadyInUse } from '../errors/email-already-in-use';
import { CRUD } from '../../../lib/crud/crud';
import { Validator } from '../../../lib/validation/validator';
import { Passwords } from '../../../lib/password';

export class UserUpdaterValidator implements Validator<User> {
    /**
     * Class constructor
     * @param _userRepository the repository
     * @param _usersValidator the user global validator
     */
    constructor(private _userRepository: CRUD<User>, private _usersValidator: Validator<User>) {}

    public async validate(parameters: ValidationParameters<User>): Promise<void> {
        // Call the global user validator
        await this._usersValidator.validate(parameters);

        // Ensure the updated email is not used by another distributor
        await this._ensureUpdatedEmailIsNotUsedByAnotherUser(parameters);

        // Ensure the password is encrypted
        await this._ensurePasswordIsEncrypted(parameters);
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

    /**
     * Determines if the given password is encrypted if its not encrypt it
     *
     * @param parameters
     */
    private async _ensurePasswordIsEncrypted(parameters: ValidationParameters<User>): Promise<void> {
        // Check if the password is not updated
        if (!parameters.object?.password) {
            // Cut the execution
            return;
        }

        // Check if the password is encrypted
        if (Passwords.isEncrypted(parameters.object.password)) {
            // Cut the execution
            return;
        }

        // Encrypt it if its not encrypted
        parameters.object.password = Passwords.encrypt(parameters.object.password);
    }
}

// Instantiate the user creator validator
const userUpdaterValidator = new UserUpdaterValidator(usersRepository, usersValidator);

// Export the instance
export { userUpdaterValidator };
