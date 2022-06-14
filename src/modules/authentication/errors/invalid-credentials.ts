import httpStatus from 'http-status';
import { InvalidArgumentError } from '../../../lib/errors/invalid-argument-error';

export class InvalidCredentialsError extends InvalidArgumentError {
    public statusCode = httpStatus.UNAUTHORIZED;

    constructor() {
        super();
        this.message = `The received credentials are not valid`;
    }
}
