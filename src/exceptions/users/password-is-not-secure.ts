import { InvalidArgumentError } from '../invalid-argument-error';
import httpStatus from 'http-status';

export class PasswordIsNotSecure extends InvalidArgumentError {
    public statusCode = httpStatus.BAD_REQUEST;

    constructor() {
        super();
        this.message = 'The password should contain at least: 1 capital letter, 1 minus letter, 1 number, 1  special symbol.';
    }
}
