import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Token } from './token';
/**
 * Extract the token from the received request headers and set the primitives into the received response locals
 */
export async function headersTokenExtractor<Primitives>(
    request: Request,
    response: Response,
    next: NextFunction,
    secretKey: string
): Promise<void> {
    // Get the encoded token from the request
    const encoded = request.headers.authorization ?? '';

    // Catch any error
    try {
        // Generate the token from the encoded one
        const token: Token<Primitives> = await Token.fromEncoded<Primitives>(encoded, secretKey);

        // Set the token primitives into the response
        response.locals['tokenPrimitives'] = token.decoded;

        // Continue to the next middleware
        next();
    } catch (error) {
        // Send an unauthorized response with the message
        response.status(httpStatus.UNAUTHORIZED).json('Unauthorized');
    }
}
