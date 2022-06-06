import httpStatus from 'http-status';
import { InvalidArgumentError } from '../../../lib/exceptions/invalid-argument-error';

export class InvalidCredentialsError extends InvalidArgumentError {
    public statusCode = httpStatus.BAD_REQUEST;

    constructor() {
        super();
        this.message = `The received credentials are not valid`;
    }
}
