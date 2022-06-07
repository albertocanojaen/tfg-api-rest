import { InvalidArgumentError } from '../../errors/invalid-argument-error';
import httpStatus from 'http-status';

export class InvalidFilterFormat extends InvalidArgumentError {
    public statusCode = httpStatus.BAD_REQUEST;

    constructor() {
        super();
        this.message = 'The filters format is not correct';
    }
}
