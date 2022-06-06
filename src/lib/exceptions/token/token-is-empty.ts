import { InvalidArgumentError } from '../invalid-argument-error';
import httpStatus from 'http-status';

export class TokenIsEmptyError extends InvalidArgumentError {
    public statusCode = httpStatus.UNAUTHORIZED;

    constructor() {
        super();
        this.message = 'The provided token is empty.';
    }
}
