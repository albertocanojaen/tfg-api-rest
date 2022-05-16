import { InvalidArgumentError } from '../invalid-argument-error';
import httpStatus from 'http-status';

export class IdentifierIsEmpty extends InvalidArgumentError {
    public statusCode = httpStatus.BAD_REQUEST;

    constructor() {
        super();
        this.message = 'You should provide an identifier';
    }
}
