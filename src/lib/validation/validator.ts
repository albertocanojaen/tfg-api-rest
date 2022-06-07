import { ValidationParameters } from './validation-parameters';

export interface Validator<Primitives> {
    /**
     * Validate the received primitives
     *
     * @param primitives
     */
    validate(primitives: ValidationParameters<Primitives>): Promise<void>;
}
