import { Validator } from '../../../interfaces/validator';
import { User } from '@prisma/client';
import PrismaHandler from '../../../lib/prisma-handler';
import { EmailAlreadyInUse } from '../../../exceptions/users/email-already-in-use';
import { EmailIsEmpty } from '../../../exceptions/users/email-is-empty';
import { PasswordIsEmpty } from '../../../exceptions/users/password-is-empty';
import { Passwords } from '../../../lib/password';
import { PasswordIsNotSecure } from '../../../exceptions/users/password-is-not-secure';
import { IdentifierIsEmpty } from '../../../exceptions/users/identifier-is-empty';
import { UserNotExists } from '../../../exceptions/users/user-not-exists';

export class UserEraserValidator implements Validator<User> {
    /**
     * Validate the user primitives
     *
     * @param primitives
     */

    async validate(primitives: User): Promise<void> {
        await this.checkIfUsersExists(primitives?.id);
    }

    /**
     * Determines if there is an user with the following id
     *
     * @param id
     */
    private async checkIfUsersExists(id: number): Promise<void> {
        // Check if the identifier is empty
        if (!id) {
            throw new IdentifierIsEmpty();
        }

        // Check if the email exists
        const user = await PrismaHandler.client.user.findUnique({
            where: {
                id: id,
            },
        });

        // Check if the user exists
        if (!user) {
            throw new UserNotExists();
        }
    }
}
