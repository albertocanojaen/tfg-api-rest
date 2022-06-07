import { Request, Response, NextFunction } from 'express';
import Logger from '../lib/logger';
import { headersTokenExtractor } from '../lib/token/headers-token-extractor';

/**
 * Validate the authentication token
 *
 * @param request
 * @param response
 * @param next
 */
export async function authenticationTokenValidator(request: Request, response: Response, next: NextFunction): Promise<void> {
    // Extract the token from the headers
    await headersTokenExtractor(request, response, next, process.env.SECRET_KEY!);
}
