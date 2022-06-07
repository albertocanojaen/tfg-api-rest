import { InvalidArgumentError } from '../../errors/invalid-argument-error';
import httpStatus from 'http-status';

export class OrderMaxLength extends InvalidArgumentError {
    public statusCode = httpStatus.BAD_REQUEST;

    constructor() {
        super();
        this.message = 'Argument orderBy needs exactly one argument.';
    }
}
