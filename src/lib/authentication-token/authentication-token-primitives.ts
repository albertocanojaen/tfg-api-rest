import { TokenPrimitives } from '../token/token-primitives';

export interface AuthenticationTokenPrimitives extends TokenPrimitives {
    /**
     * The user identifier
     */
    idUser: number;
}
