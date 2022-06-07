import { TokenPrimitives } from './token-primitives';
import { TokenArguments } from './token-arguments';
import { sign, TokenExpiredError as JWTExpiredError, verify } from 'jsonwebtoken';
import { TokenIsEmptyError } from './errors/token-is-empty';
import { TokenExpiredError } from './errors/token-expired';
import { TokenMalformedError } from './errors/token-malformed';

interface EncodingOptions {
    /**
     * Time when the token will be expired.
     *
     * Expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d"
     */
    expiresIn?: string | number | undefined;

    /**
     * Excludes the "issued at" (iat) from the encoded token
     */
    noTimestamp?: boolean;
}

export class Token<Primitives extends TokenPrimitives> {
    /**
     * The decoded token
     */
    public readonly decoded: Primitives;

    /**
     * The encoded token
     */
    public readonly encoded: string;

    /**
     * Class constructor
     */
    constructor(public readonly args: TokenArguments<Primitives>) {
        // Set the arguments
        this.decoded = args.decoded;
        this.encoded = args.encoded;
    }

    /**
     * Generates a token from the received encoded string
     *
     * @param encoded
     * @param secretKey
     */
    public static async fromEncoded<Primitives extends TokenPrimitives>(
        encoded: string,
        secretKey: string
    ): Promise<Token<Primitives>> {
        // Check if the received token is empty
        if (encoded === '') {
            // Throw the error
            throw new TokenIsEmptyError();
        }

        // Catch any error
        try {
            // Verify the encoded token with the received key
            const decoded = verify(encoded, secretKey);

            // Return the both the decoded and encoded token
            return new Token<Primitives>({
                decoded: decoded as Primitives,
                encoded: encoded,
            });
        } catch (error) {
            // Check if the token is expired
            if (error instanceof JWTExpiredError) {
                // Throw error
                throw new TokenExpiredError();
            }

            // Throw error if is not expired and is malformed
            throw new TokenMalformedError();
        }
    }

    /**
     * Generate a token from the received primitives
     *
     * @param primitives
     * @param secretKey
     * @param options
     */
    public static async fromPrimitives<Primitives extends TokenPrimitives>(
        primitives: Primitives,
        secretKey: string,
        options?: EncodingOptions
    ): Promise<Token<Primitives>> {
        // Sign the primitives with the received options
        const encoded = sign(primitives, secretKey, options);

        // Verify the token with the received key
        const decoded = verify(encoded, secretKey, { ignoreExpiration: true });

        // Return the token
        return new Token<Primitives>({
            decoded: decoded as Primitives,
            encoded: encoded,
        });
    }
}
