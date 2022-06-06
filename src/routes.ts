import { Router } from 'express';
import { UsersRoutes } from './routes/users-routes';

/**
 * Register all the selected roots into the application
 *
 * @param router
 */
export default function registerRoutes(router: Router): void {
    new UsersRoutes(router);
}
