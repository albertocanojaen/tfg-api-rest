import httpStatus from 'http-status';
import { InvalidArgumentError } from '../../../exceptions/invalid-argument-error';

export class EmailIsEmpty extends InvalidArgumentError {
    public statusCode = httpStatus.BAD_REQUEST;

    constructor() {
        super();
        this.message = 'The email is empty';
    }
}
