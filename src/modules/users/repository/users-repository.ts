import PrismaHandler from '../../../lib/prisma/prisma-handler';
import { User } from '@prisma/client';
import { CRUD } from '../../../interfaces/service';
import { Criteria } from '../../../lib/criteria/classes/criteria';

class UsersRepository implements CRUD<User> {
    /**
     * Create a new user in the database
     *
     * @param object
     */
    public async create(object: User): Promise<User> {
        return await PrismaHandler.client.user.create({
            data: object,
        });
    }

    /**
     * Get the users from the database by criteria.
     *
     * @param parameters
     */
    public async getByCriteria(parameters: Criteria): Promise<User[]> {
        // Generate the Prisma query parameters
        let prismaQueryParameters = {};

        // If the parameters are not empty
        if (parameters) {
            // Get the parameters readable for Prisma
            prismaQueryParameters = parameters.parseCriteriaToPrisma();
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
     * @param object
     */
    public async update(object: User): Promise<User> {
        return await PrismaHandler.client.user.update({
            where: {
                id: object.id,
            },
            data: object,
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

// Instantiate the users repository
const usersRepository = new UsersRepository();

// Export the instance
export { usersRepository };
