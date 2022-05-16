import PrismaHandler from '../../lib/prisma-handler';
import { User } from '@prisma/client';
import { CRUD } from '../../interfaces/service';

class UsersService implements CRUD<User> {
    public async create(args: User): Promise<User> {
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

    public async delete(id: number): Promise<User> {
        return await PrismaHandler.client.user.delete({
            where: {
                id: id,
            },
        });
    }
}

export default UsersService;
