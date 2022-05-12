import { IError } from '../../interfaces/error.interface';

export class ApiError extends Error implements IError {
    public status = 500;

    public success = false;

    public fields: { name: { message: string } };

    constructor(status: number, name: string = 'ApiError', msg: string, additionalFields: { name: { message: string } }) {
        super();
        this.status = status;
        this.name = name;
        this.message = msg;
        this.fields = additionalFields;
    }
}

export default ApiError;
