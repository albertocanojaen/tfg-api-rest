import { PrismaClient } from '@prisma/client';

class PrismaHandler {
    private static instance: PrismaHandler;
    private _client: PrismaClient;

    /**
     * Class constructor to instantiate the prisma client
     */
    constructor() {
        this._client = new PrismaClient({
            log: ['query', 'info'],
        });
    }

    /**
     * Singleton getInstance method
     * @returns instance
     */
    static getInstance(): PrismaHandler {
        if (!PrismaHandler.instance) {
            PrismaHandler.instance = new PrismaHandler();
        }

        return PrismaHandler.instance;
    }

    /**
     * Get the prisma client
     */
    public get client(): PrismaClient {
        return this._client;
    }
}

export default PrismaHandler.getInstance();
