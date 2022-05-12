import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { encrypt } from './crypto';
import Logger from './logger';

function send(res: Response): void {
    let obj = {};
    obj = res.locals.data;
    if (environment.isProductionEnvironment()) {
        Logger.info(JSON.stringify(obj, null, 2));
    }
    if (environment.forceEncryption) {
        obj = encrypt(JSON.stringify(obj), environment.secretKey);
    }
    res.status(StatusCodes.OK).send(obj);
}

function json(res: Response): void {
    let obj = {};
    obj = res.locals.data;
    if (environment.isProductionEnvironment()) {
        Logger.info(JSON.stringify(obj, null, 2));
    }
    if (environment.forceEncryption) {
        obj = encrypt(JSON.stringify(obj), environment.secretKey);
    }
    res.status(StatusCodes.OK).json(obj);
}

export { send, json };
