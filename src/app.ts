import cors from 'cors';
import express, { Router } from 'express';
import http from 'http';
import helmet from 'helmet';
import morgan from 'morgan';
import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import Logger from './lib/logger';
import registerRoutes from './routes';
import { InvalidArgumentError } from './lib/exceptions/invalid-argument-error';

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
     * Router
     */
    public router!: Router;

    /**
     * Initialize the application asynchronously
     */
    public async init(): Promise<void> {
        this.express = express();
        this.httpServer = http.createServer(this.express);
        this.router = Router();

        // Load all the middlewares
        this.middleware();

        // Load all the routes
        this.routes();

        // Load the error middleware
        this.errorMiddleware();
    }

    /**
     * Register the routes
     */
    private routes(): void {
        // Register all the public routes defined
        registerRoutes(this.router);

        // Use the router
        this.express.use(this.router);

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

    private errorMiddleware(): void {
        // Middleware for errors
        this.router.use((error: Error | InvalidArgumentError, request: Request, response: Response, next: NextFunction) => {
            // Log the error
            Logger.error(error.stack || error.message);

            // Generate the error in JSON
            const jsonError = {
                code: error.constructor.name,
                message: error.message,
            };

            // Set the default status code
            let statusCode = httpStatus.INTERNAL_SERVER_ERROR;

            // Check if is an invalid argument error
            if (error instanceof InvalidArgumentError) {
                // Set the status code
                statusCode = error.statusCode;
            }

            response.status(statusCode).json(jsonError);
        });

        this.router.use((request: Request, response: Response, next: NextFunction) => {
            response.status(httpStatus.NOT_FOUND).json('Resource not found');
        });

        // Notify middleware finished loading
        Logger.info(`✨ Middleware for errors established correctly!`);
    }
}
