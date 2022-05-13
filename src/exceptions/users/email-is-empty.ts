import { InvalidArgumentError } from '../invalid-argument-error';
import httpStatus from 'http-status';

export class EmailIsEmpty extends InvalidArgumentError {
    public statusCode = httpStatus.BAD_REQUEST;

    constructor() {
        super();
        this.message = 'The email is empty';
    }
}
