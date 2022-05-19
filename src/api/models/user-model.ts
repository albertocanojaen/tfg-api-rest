import { Passwords } from '../../lib/password';
import { User } from '@prisma/client';

export class UserModel {
    public id?: number;
    public name?: string | null;
    public password?: string;
    public email?: string;
    public createdAt?: Date;

    /**
     * Class constructor
     *
     * @param args
     */
    constructor(args: User) {
        this.id = args?.id;
        this.name = args?.name ? args.name : '';
        this.password = args?.password ? Passwords.encrypt(args.password) : '';
        this.email = args?.email ? args.email : '';
        this.createdAt = args?.createdAt ? args.createdAt : new Date();
    }

    public fromModelToPrisma() {
        return {
            id: this.id!,
            name: this.name!,
            email: this.email!,
            password: this.password!,
            createdAt: this.createdAt!,
        };
    }

    public static fromPrismaToModel(args: User | null): UserModel | null {
        if (args) {
            return new UserModel({
                id: args?.id,
                name: args?.name,
                email: args?.email,
                password: args?.password,
                createdAt: args?.createdAt,
            });
        }

        return null;
    }
}
