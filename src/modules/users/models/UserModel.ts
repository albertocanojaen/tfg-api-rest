import { IUser } from './IUser';
import { Passwords } from '../../../lib/password';
import { User } from '@prisma/client';

export class UserModel implements IUser {
    public id?: number;
    public name?: string;
    public password?: string;
    public email?: string;
    public createdAt?: Date;

    /**
     * Class constructor
     *
     * @param args
     */
    constructor(args: IUser) {
        this.id = args?.id;
        this.name = args?.name ? args.name : '';
        this.password = args?.password ? Passwords.encrypt(args.password) : '';
        this.email = args?.email ? args.email : '';
        this.createdAt = args?.createdAt ? args.createdAt : new Date();
    }

    /**
     * Parse the user from the User Model to the Prisma Model
     *
     * @returns User
     */
    public fromModelToPrisma(): User {
        return {
            id: this.id!,
            name: this.name!,
            email: this.email!,
            password: this.password!,
            createdAt: this.createdAt!,
        };
    }

    public static fromPrismaToModel(args: User | null): UserModel {
        if (args) {
            return new UserModel({
                id: args?.id,
                name: args?.name ? args.name : '',
                email: args?.email,
                password: args?.password,
                createdAt: args?.createdAt,
            });
        }

        return new UserModel({});
    }
}
