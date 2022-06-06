import { InvalidArgumentError } from '../invalid-argument-error';
import httpStatus from 'http-status';

export class TokenMalformedError extends InvalidArgumentError {
    public statusCode = httpStatus.UNAUTHORIZED;

    constructor() {
        super();
        this.message = 'The provided token is malformed.';
    }
}
