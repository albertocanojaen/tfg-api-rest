import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { PasswordIsEmpty } from '../modules/users/errors/password-is-empty';
/**
 * The regular expression to check the password validity
 */
const regex = /^\$2a\$10\$.{53}$/;

export class Passwords {
    /**
     * Gets the password regex
     */
    public static get regex(): RegExp {
        return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    }

    /**
     * Encrypt the received password
     *
     * @param password
     */
    public static encrypt(password: string): string {
        // Check if the received password is empty
        if (!password) {
            // Throw exception
            throw new PasswordIsEmpty();
        }

        // Check if the password is already encrypted
        if (Passwords.isEncrypted(password)) {
            // Return the same password
            return password;
        }

        // Generate the salt
        const salt = genSaltSync();

        // Return the encrypted password
        return hashSync(password, salt);
    }

    /**
     * Determines if the received passwords are equals
     *
     * @param origin
     * @param password
     */
    public static areEquals(origin: string, password: string): boolean {
        return compareSync(password, origin);
    }

    /**
     * Determines if the received password is encrypted
     *
     * @param password
     */
    public static isEncrypted(password: string): boolean {
        return regex.test(password);
    }
}
