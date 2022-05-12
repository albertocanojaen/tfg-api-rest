import cors from 'cors';
import express from 'express';
import http from 'http';
import helmet from 'helmet';
import morgan from 'morgan';

import registerRoutes from './routes';
import Logger from './lib/logger';
import errorHandler from './lib/error-handler';

export default class App {
    /**
     * Express application
     */
    public express!: express.Application;

    /**
     * Http Server
     */
    public httpServer!: http.Server;

    /**
     * Initialize the application asynchronously
     */
    public async init(): Promise<void> {
        this.express = express();
        this.httpServer = http.createServer(this.express);

        // Load all the middlewares
        this.middleware();

        // Load all the routes
        this.routes();

        // Set the error handler
        this.addErrorHandler();
    }

    /**
     * Register the routes
     */
    private routes(): void {
        // Register all the routes defined on routes.ts
        registerRoutes(this.express);

        // Notify the routes finished loading
        Logger.info(`✨ Routes registered successfully!`);
    }

    /**
     * here you can apply your middlewares
     */
    private middleware(): void {
        // Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
        this.express.use(helmet({ contentSecurityPolicy: false }));

        // Support application/json type post data
        this.express.use(express.json({ limit: '100mb' }));

        // Support application/x-www-form-urlencoded post data
        this.express.use(express.urlencoded({ limit: '100mb', extended: true }));

        // Allow application to access API hosted on a different domain
        this.express.use(cors());

        // Log through the HTTP calls
        this.express.use(morgan(':date[iso] :method :url :status - :response-time ms'));

        // Notify middleware finished loading
        Logger.info(`✨ Middlewares established correctly!`);
    }

    private addErrorHandler(): void {
        this.express.use(errorHandler);
    }
}
