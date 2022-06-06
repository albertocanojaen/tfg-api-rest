import httpStatus from 'http-status';
import { InvalidArgumentError } from '../../../lib/exceptions/invalid-argument-error';

export class EmailAlreadyInUse extends InvalidArgumentError {
    public statusCode = httpStatus.BAD_REQUEST;

    constructor(email: string) {
        super();
        this.message = `The email ${email} is already in use`;
    }
}
