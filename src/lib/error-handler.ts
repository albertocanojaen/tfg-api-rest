import { Request, Response } from 'express';
import { ApiError } from '../components/errors';
import logger from './logger';

/**
 * Handle the exceptions to return a correct error message and http code, and log it
 * Not remove the _next parameter, it is required to catch the error
 *
 * @export
 * @param {unknown} _err
 * @param {Request} _req
 * @param {Response} _res
 * @param {unknown} _next
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(_err: any, _req: Request, _res: Response, _next: any): void {
    if (_err && _err instanceof ApiError) {
        _res.sendStatus(204);
        return;
    }
    logger.error(_req.method + ' ' + _req.originalUrl + ' - ' + (_err['message'] ? _err['message'] : _err));
    if (_err) {
        const errorObject = {
            error: 'internal error',
            message: '',
        };
        if (process.env.ENVIRONNEMENT === 'dev') {
            errorObject['error'] = _err['stack'].split('\n');
        }
        errorObject['message'] = _err['message'];
        if (_err instanceof ApiError) {
            errorObject['error'] = 'access denied';
            _res.status(401).send(errorObject);
            return;
        }
        if (_err instanceof ApiError) {
            errorObject['error'] = 'access not granted';
            _res.status(403).send(errorObject);
            return;
        }
        if (_err instanceof ApiError) {
            errorObject['error'] = 'invalid request';
            logger.error(errorObject);
            logger.error(_err.stack);
            // errorObject['error_params'] = err.getErrorParameters();
            _res.status(400).send(errorObject);
            return;
        }
        if (_err instanceof ApiError) {
            errorObject['error'] = 'resource not found';
            _res.status(404).send(errorObject);
            return;
        }
        logger.error(errorObject);
        logger.error(_err['stack']);
        if (_err['sql']) {
            logger.error(_err['sql']);
        }
        _res.status(500).send(errorObject);
        return;
    }
    _res.status(500).send({ error: 'undefined error' });
}
