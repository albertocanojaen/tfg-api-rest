import { InvalidArgumentError } from '../invalid-argument-error';
import httpStatus from 'http-status';

export class EmailAlreadyInUse extends InvalidArgumentError {
    public statusCode = httpStatus.BAD_REQUEST;

    constructor(email: string) {
        super();
        this.message = `The email ${email} is already in use`;
    }
}
