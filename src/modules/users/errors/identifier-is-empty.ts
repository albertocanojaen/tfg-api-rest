import httpStatus from 'http-status';
import { InvalidArgumentError } from '../../../lib/errors/invalid-argument-error';

export class IdentifierIsEmpty extends InvalidArgumentError {
    public statusCode = httpStatus.BAD_REQUEST;

    constructor() {
        super();
        this.message = 'You should provide an identifier';
    }
}
