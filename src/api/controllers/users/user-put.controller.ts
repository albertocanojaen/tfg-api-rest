import { prisma, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

export class UserPutController {
    /**
     * Class constructor
     *
     */
    constructor() {}

    static async run(req: Request, res: Response): Promise<void> {
        const prisma = new PrismaClient();

        const newUser = await prisma.user.create({
            data: {
                name: 'Test',
                email: 'test@test.com',
                password: '123456',
            },
        });

        res.statusCode = 201;
        res.send(newUser);
    }
}
