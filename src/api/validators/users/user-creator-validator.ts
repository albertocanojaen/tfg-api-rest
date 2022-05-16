import { Validator } from '../../../interfaces/validator';
import { User } from '@prisma/client';
import PrismaHandler from '../../../lib/prisma-handler';
import { EmailAlreadyInUse } from '../../../exceptions/users/email-already-in-use';
import { EmailIsEmpty } from '../../../exceptions/users/email-is-empty';
import { PasswordIsEmpty } from '../../../exceptions/users/password-is-empty';
import { Passwords } from '../../../lib/password';
import { PasswordIsNotSecure } from '../../../exceptions/users/password-is-not-secure';

export class UserCreatorValidator implements Validator<User> {
    /**
     * Validate the user primitives
     *
     * @param primitives
     */

    async validate(primitives: User): Promise<void> {
        await this.isEmailInUse(primitives?.email);
        await this.isPasswordSecure(primitives?.password);
    }

    /**
     * Determines if the email is already in use
     *
     * @param email
     */
    private async isEmailInUse(email: string): Promise<void> {
        // Check if the email is empty
        if (!email) {
            throw new EmailIsEmpty();
        }

        // Check if the email exists
        const user = await PrismaHandler.client.user.findUnique({
            where: {
                email: email,
            },
        });

        console.log(user);

        // Check if the user exists
        if (user) {
            throw new EmailAlreadyInUse();
        }
    }

    /**
     * Determines if the password matches the defined RegEx
     *
     * @param password
     */
    private async isPasswordSecure(password: string): Promise<void> {
        // Check if the password is empty
        if (!password) {
            throw new PasswordIsEmpty();
        }

        // Check if password match the RegEx
        if (!Passwords.regex.test(password)) {
            throw new PasswordIsNotSecure();
        }
    }
}
