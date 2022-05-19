import { User } from '@prisma/client';
import { Validator } from '../../interfaces/validator';
import { ValidationParameters } from '../../interfaces/validation-parameters';

export class UserValidator implements Validator<User> {
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
