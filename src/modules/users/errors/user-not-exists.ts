import httpStatus from 'http-status';
import { InvalidArgumentError } from '../../../lib/errors/invalid-argument-error';

export class UserNotExists extends InvalidArgumentError {
    public statusCode = httpStatus.NOT_FOUND;

    constructor(message = 'There is no user in the system that matches the specified parameters.') {
        super();
        this.message = message;
    }
}
