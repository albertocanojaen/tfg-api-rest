import { InvalidArgumentError } from '../invalid-argument-error';
import httpStatus from 'http-status';

export class PasswordIsEmpty extends InvalidArgumentError {
    public statusCode = httpStatus.BAD_REQUEST;

    constructor() {
        super();
        this.message = 'The password is empty';
    }
}
