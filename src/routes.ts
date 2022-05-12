import * as express from 'express';
import { UsersRoutes } from './api/routes/users.routes';
import { NotFoundRoutes } from './api/routes/not-found.routes';

/**
 * Register all the selected roots into the application
 *
 * @param app
 */
export default function registerRoutes(app: express.Application): void {
    new UsersRoutes(app);
    new NotFoundRoutes(app);
}
