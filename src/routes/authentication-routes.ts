import { Request, Response, Router, NextFunction } from 'express';
import httpStatus from 'http-status';
import { Routing } from '../lib/routing/routing';
import { authenticateByEmailAndPasswordController } from '../modules/authentication/controllers/authenticate-by-email-and-password-controller';

export class AuthenticationRoutes extends Routing {
    /**
     * Class constructor
     * @param router
     */
    constructor(router: Router) {
        super(router, 'Authentication');
    }

    /**
     * Configure all the available routes
     */
    configureRoutes(): Router {
        /**
         * 1. Log in (POST /login)
         */
        this.router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
            try {
                await authenticateByEmailAndPasswordController.run(req, res);
            } catch (error) {
                return next(error);
            }
        });

        /**
         * 2. Log out (GET /login)
         */
        this.router.get('/logout', async (req: Request, res: Response, next: NextFunction) => {
            try {
                // Return the response
                res.status(httpStatus.OK).send();
            } catch (error) {
                return next(error);
            }
        });

        return this.router;
    }
}
