import PrismaHandler from '../../lib/prisma-handler';
import { User } from '@prisma/client';
import { CRUD } from '../../interfaces/service';
import { Criteria } from '../../lib/criteria/criteria';

class UsersService implements CRUD<User> {
    /**
     * Create a new user in the database
     *
     * @param args
     */
    public async create(args: User): Promise<User> {
        return await PrismaHandler.client.user.create({
            data: args,
        });
    }

    /**
     * Get the users from the database by criteria.
     *
     * @param queryParameters
     */
    public async getByCriteria(queryParameters: Criteria): Promise<User[]> {
        // Generate the Prisma query parameters
        let prismaQueryParameters = {};

        // If the parameters are not empty
        if (queryParameters) {
            // Get the parameters readable for Prisma
            prismaQueryParameters = queryParameters.parseCriteriaToPrisma();
        }

        // Make the query
        return await PrismaHandler.client.user.findMany(prismaQueryParameters);
    }

    /**
     * Get an user from the database by id.
     *
     * @param id
     */
    public async getById(id: number): Promise<User | null> {
        return await PrismaHandler.client.user.findUnique({
            where: {
                id: id,
            },
        });
    }

    /**
     * Update a user from the database.
     *
     * @param id
     */
    async update(modifiedObject: User): Promise<User> {
        return await PrismaHandler.client.user.update({
            where: {
                id: modifiedObject.id,
            },
            data: modifiedObject,
        });
    }

    /**
     * Delete a user from the database by id
     * @param id
     * @returns
     */
    public async delete(id: number): Promise<User> {
        return await PrismaHandler.client.user.delete({
            where: {
                id: id,
            },
        });
    }
}

export default UsersService;
