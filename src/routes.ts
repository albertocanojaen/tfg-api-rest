import { Router } from 'express';
import { authenticationTokenValidator } from './middlewares/authentication-token-validator';
import { AuthenticationRoutes } from './routes/authentication-routes';
import { UsersRoutes } from './routes/users-routes';

/**
 * Register all the selected routes into the application
 *
 * @param router
 */
export default function registerRoutes(router: Router): void {
    // Register the public routes
    registerPublicRoutes(router);

    // Use the authentication middleware
    router.use(authenticationTokenValidator);

    // Register the private routes
    registerPrivateRoutes(router);
}

/**
 * Function to register the public routes
 * @param router
 */
function registerPublicRoutes(router: Router): void {
    new AuthenticationRoutes(router);
}

/**
 * Function to register the private routes
 * @param router
 */
function registerPrivateRoutes(router: Router): void {
    new UsersRoutes(router);
}
