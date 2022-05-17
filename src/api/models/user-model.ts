import { Passwords } from '../../lib/password';
import { User } from '@prisma/client';

export class UserModel implements User {
    public id: number;
    public name: string;
    public password: string;
    public email: string;
    public createdAt: Date;

    /**
     * Class constructor
     *
     * @param args
     */
    constructor(args: User) {
        this.id = args?.id;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.name = args.name!;
        this.password = Passwords.encrypt(args?.password);
        this.email = args?.email;
        this.createdAt = new Date();
    }
}
