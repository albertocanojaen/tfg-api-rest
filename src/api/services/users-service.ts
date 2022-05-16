import PrismaHandler from '../../lib/prisma-handler';
import { User } from '@prisma/client';
import { CRUD } from '../../interfaces/service';

class UsersService implements CRUD<User> {
    public async create(args: User): Promise<User | void> {
        return await PrismaHandler.client.user.create({
            data: args,
        });
    }

    public async read(queryParameters: any): Promise<User[]> {
        return await PrismaHandler.client.user.findMany(queryParameters);
    }

    update(modifiedObject: User): Promise<void> {
        throw new Error('Method not implemented.');
    }

    delete(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

export default UsersService;
