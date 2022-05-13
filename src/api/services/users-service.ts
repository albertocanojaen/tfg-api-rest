import PrismaHandler from '../../lib/prisma-handler';
import { User } from '@prisma/client';

class UsersService {
    private static instance: UsersService;

    static getInstance(): UsersService {
        if (!UsersService.instance) {
            UsersService.instance = new UsersService();
        }

        return UsersService.instance;
    }

    public async create(args: User): Promise<User | void> {
        return await PrismaHandler.client.user.create({
            data: args,
        });
    }

    public async listAllUsers(): Promise<User[]> {
        return await PrismaHandler.client.user.findMany({});
    }
}

export default UsersService.getInstance();
