import { InvalidArgumentError } from '../../errors/invalid-argument-error';
import httpStatus from 'http-status';

export class TokenExpiredError extends InvalidArgumentError {
    public statusCode = httpStatus.UNAUTHORIZED;

    constructor() {
        super();
        this.message = 'The provided token is expired.';
    }
}
