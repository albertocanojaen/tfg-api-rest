import { User } from '@prisma/client';
import { Validator } from '../../../lib/validation/validator';
import { ValidationParameters } from '../../../lib/validation/validation-parameters';

export class UsersValidator implements Validator<User> {
    /**
     * Validate the received primitives
     *
     * @param primitives
     */
    public async validate(parameters: ValidationParameters<User>): Promise<void> {
        // Check both validation parameters
        this._ensureValidationParameters(parameters);
    }

    /**
     * Ensure the validation parameters are not empty
     *
     * @param primitives
     */
    private _ensureValidationParameters(parameters: ValidationParameters<User>) {
        // Check if the object is given
        if (!parameters.object && !parameters.id) {
            throw new Error();
        }

        // Cut the execution
        return;
    }
}

// Instantiate the user creator validator
const usersValidator = new UsersValidator();

// Export the instance
export { usersValidator };
