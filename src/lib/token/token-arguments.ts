import { TokenPrimitives } from './token-primitives';

export interface TokenArguments<Primitives extends TokenPrimitives> {
    /**
     * The decoded token
     */
    decoded: Primitives;

    /**
     * The encoded token
     */
    encoded: string;
}
