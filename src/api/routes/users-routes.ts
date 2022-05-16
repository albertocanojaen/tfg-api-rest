import { Routing } from '../../lib/routing';
import { Request, Response, Router, NextFunction } from 'express';
import { CreateUserController } from '../controllers/users/create-user-controller';
import { GetUsersController } from '../controllers/users/get-users-controller';

export class UsersRoutes extends Routing {
    constructor(router: Router) {
        super(router, 'Users');
    }

    /**
     * All the available routes for the Users
     */
    configureRoutes(): Router {
        /**
         * GET calls
         */
        this.router.get('/user/:id');

        /**
         * Endpoint /users
         * 1) GetUsersController
         *
         */
        this.router.route('/users').post(async (req: Request, res: Response, next: NextFunction) => {
            try {
                await new GetUsersController().run(req, res);
            } catch (error) {
                return next(error);
            }
        });

        /**
         * Endpoint /user
         */
        this.router.post('/user', async (req: Request, res: Response, next: NextFunction) => {
            try {
                await new CreateUserController().run(req, res);
            } catch (error) {
                return next(error);
            }
        });

        return this.router;
    }
}
