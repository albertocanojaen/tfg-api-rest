import { InvalidArgumentError } from '../../errors/invalid-argument-error';
import httpStatus from 'http-status';

export class InvalidOrderFormat extends InvalidArgumentError {
    public statusCode = httpStatus.BAD_REQUEST;

    constructor() {
        super();
        this.message = 'The order can just be asc or desc';
    }
}
