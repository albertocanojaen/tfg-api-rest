import * as fs from 'fs';
import * as path from 'path';
import { config as configDotenv } from 'dotenv';

import { EnvironmentFile, Environments } from './env.enums';

export default class Environment {
    /**
     * The port of the Application
     */
    public port: number;

    /**
     * The server of the Application
     */
    public server: string;

    /**
     * The secret key
     */
    public secretKey: string;

    /**
     * Force encryption
     */
    public forceEncryption: boolean;

    /**
     * Class constructor
     * @param NODE_ENV Production or Development
     */
    constructor(NODE_ENV?: string) {
        const env: string = NODE_ENV || process.env.NODE_ENV || Environments.DEV;
        const server: string = process.env.SERVER || '0.0.0.0';
        const port: string | undefined | number = process.env.PORT || 3000;
        this.setEnvironment(env);
        this.server = server;
        this.port = Number(port);
        this.forceEncryption = JSON.parse(process.env.APPLY_ENCRYPTION!);
        this.secretKey = process.env.SECRET_KEY!;
    }

    /**
     * Gets the current environment
     * @returns the actual environment
     */
    public getCurrentEnvironment(): string {
        let environment: string = process.env.NODE_ENV || Environments.DEV;

        if (!environment) {
            environment = Environments.LOCAL;
        }
        switch (environment) {
            case Environments.PRODUCTION:
                return Environments.PRODUCTION;
            case Environments.DEV:
            case Environments.TEST:
                return Environments.TEST;
            case Environments.LOCAL:
            default:
                return Environments.LOCAL;
        }
    }

    /**
     * Set an environment
     * @param env
     */
    public setEnvironment(env: string): void {
        let envPath: string;
        const rootdir: string = path.resolve(__dirname, '../../');
        switch (env) {
            case Environments.PRODUCTION:
                envPath = path.resolve(rootdir, EnvironmentFile.PRODUCTION);
                break;
            case Environments.TEST:
                envPath = path.resolve(rootdir, EnvironmentFile.TEST);
                break;
            case Environments.LOCAL:
                envPath = path.resolve(rootdir, EnvironmentFile.LOCAL);
                break;
            default:
                envPath = path.resolve(rootdir, EnvironmentFile.LOCAL);
        }
        if (!fs.existsSync(envPath)) {
            throw new Error('.env file missing!');
        }
        configDotenv({ path: envPath });
    }

    /**
     * Check if is production environment
     * @returns true if is on production
     */
    public isProductionEnvironment(): boolean {
        return this.getCurrentEnvironment() === Environments.PRODUCTION;
    }

    /**
     * Check if is dev environment
     * @returns true if is on dev
     */
    public isDevEnvironment(): boolean {
        return this.getCurrentEnvironment() === Environments.DEV || this.getCurrentEnvironment() === Environments.LOCAL;
    }

    /**
     * Check if is testing environment
     * @returns true if is on testing
     */
    public isTestEnvironment(): boolean {
        return this.getCurrentEnvironment() === Environments.TEST;
    }
}
