import { Routing } from '../lib/routing/routing';
import { Request, Response, Router, NextFunction } from 'express';
import { getUserByIdController } from '../modules/users/controllers/get-user-by-id-controller';
import { deleteUserController } from '../modules/users/controllers/delete-user-controller';
import { updateUserController } from '../modules/users/controllers/update-user-controller';
import { getUsersByCriteriaController } from '../modules/users/controllers/get-users-by-criteria-controller';
import { createUserController } from '../modules/users/controllers/create-user-controller';
import { authenticationTokenValidator } from '../middlewares/authentication-token-validator';

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
                await createUserController.run(req, res);
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
                await getUserByIdController.run(req, res);
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
                await updateUserController.run(req, res);
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
                await deleteUserController.run(req, res);
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
                await getUsersByCriteriaController.run(req, res);
            } catch (error) {
                return next(error);
            }
        });

        return this.router;
    }
}
