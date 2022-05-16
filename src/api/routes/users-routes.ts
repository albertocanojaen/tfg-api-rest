import { Routing } from '../../lib/routing';
import { Request, Response, Router, NextFunction } from 'express';
import { CreateUserController } from '../controllers/users/create-user-controller';
import { GetUsersController } from '../controllers/users/get-users-controller';
import { DeleteUserController } from '../controllers/users/delete-user-controller';

export class UsersRoutes extends Routing {
    constructor(router: Router) {
        super(router, 'Users');
    }

    /**
     * All the available routes for the Users
     */
    configureRoutes(): Router {
        /**
         * Endpoint /user
         * 1) Creates a new user
         *
         */
        this.router.post('/user', async (req: Request, res: Response, next: NextFunction) => {
            try {
                await new CreateUserController().run(req, res);
            } catch (error) {
                return next(error);
            }
        });

        /**
         * Endpoint /user/:id
         * 1) Gets user by id
         * 2) Deletes user by id
         *
         */
        this.router.get('/user/:id', async (req: Request, res: Response, next: NextFunction) => {
            try {
            } catch (error) {
                return next(error);
            }
        });

        this.router.delete('/user/:id', async (req: Request, res: Response, next: NextFunction) => {
            try {
                await new DeleteUserController().run(req, res);
            } catch (error) {
                return next(error);
            }
        });

        /**
         * Endpoint /users
         * 1) Gets one ore more users by criteria
         *
         */
        this.router.post('/users', async (req: Request, res: Response, next: NextFunction) => {
            /**
             * Get all the users by criteria
             */
            try {
                await new GetUsersController().run(req, res);
            } catch (error) {
                return next(error);
            }
        });

        return this.router;
    }
}
