import httpStatus from 'http-status';
import { InvalidArgumentError } from '../../../lib/errors/invalid-argument-error';

export class PasswordIsEmpty extends InvalidArgumentError {
    public statusCode = httpStatus.BAD_REQUEST;

    constructor() {
        super();
        this.message = 'The password is empty';
    }
}
