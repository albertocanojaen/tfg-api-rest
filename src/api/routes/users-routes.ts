import { Routing } from '../../lib/routing';
import { Request, Response, Router } from 'express';
import { CreateUserController } from '../controllers/users/create-user-controller';

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
         * Calls for /users endpoint
         * 1) List all the users in the database
         *
         */
        this.router.route('/users').post((req: Request, res: Response) => {
            // GetUsersController.run(req, res);
        });

        /**
         * Insert a new user in the database
         */
        this.router.post('/user', (req: Request, res: Response) => {
            const controller = new CreateUserController();

            console.log(controller);

            controller.run(req, res);
        });

        return this.router;
    }
}
