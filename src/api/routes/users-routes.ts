import { Routing } from '../../lib/routing';
import { Request, Response, Router, NextFunction } from 'express';
import { CreateUserController } from '../controllers/users/create-user-controller';
import { GetUsersByCriteriaController } from '../controllers/users/get-users-by-criteria-controller';
import { DeleteUserController } from '../controllers/users/delete-user-controller';
import { GetUserByIdController } from '../controllers/users/get-user-by-id-controller';
import { UpdateUserController } from '../controllers/users/update-user-controller';

export class UsersRoutes extends Routing {
    constructor(router: Router) {
        super(router, 'Users');
    }

    /**
     * All the available routes for the Users
     */
    configureRoutes(): Router {
        /**
         * 1. Create a new user (POST /user)
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
         * 2. Get the user with the param id (GET /user/:id)
         *
         */
        this.router.get('/user/:id', async (req: Request, res: Response, next: NextFunction) => {
            try {
                await new GetUserByIdController().run(req, res);
            } catch (error) {
                return next(error);
            }
        });

        /**
         * 3. Update user with the param id (POST /user/:id)
         *
         */
        this.router.post('/user/:id', async (req: Request, res: Response, next: NextFunction) => {
            try {
                await new UpdateUserController().run(req, res);
            } catch (error) {
                return next(error);
            }
        });

        /**
         * 4. Delete user with the param id (DELETE /user/:id)
         *
         */
        this.router.delete('/user/:id', async (req: Request, res: Response, next: NextFunction) => {
            try {
                await new DeleteUserController().run(req, res);
            } catch (error) {
                return next(error);
            }
        });

        /**
         * 5. Gets one ore more users by criteria (POST /users)
         *
         */
        this.router.post('/users', async (req: Request, res: Response, next: NextFunction) => {
            /**
             * 5. Get all the users by criteria
             */
            try {
                await new GetUsersByCriteriaController().run(req, res);
            } catch (error) {
                return next(error);
            }
        });

        return this.router;
    }
}
