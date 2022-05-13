import { Validator } from '../../../interfaces/validator';
import { User } from '@prisma/client';
import PrismaHandler from '../../../lib/prisma-handler';
import { EmailAlreadyInUse } from '../../../exceptions/users/email-already-in-use';
import { EmailIsEmpty } from '../../../exceptions/users/email-is-empty';

export class UserCreatorValidator implements Validator<User> {
    /**
     * Validate the user primitives
     *
     * @param primitives
     */

    async validate(primitives: User): Promise<void> {
        await this.isEmailInUse(primitives?.email);
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
}
