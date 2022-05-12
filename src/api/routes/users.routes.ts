import { Application } from 'express';
import { Routing } from '../../lib/routing';
import express from 'express';
import { Router } from 'express';
import { UsersPostController } from '../controllers/users/users-post-controller';
import Logger from '../../lib/logger';
import { UserPutController } from '../controllers/users/user-put.controller';

export class UsersRoutes extends Routing {
    constructor(app: express.Application) {
        super(app, 'Users');
    }

    /**
     * All the available routes for the Users
     */
    configureRoutes(): express.Application {
        /**
         * Find all the users in the database
         */
        this.app.post('/users', UsersPostController.run);

        /**
         * Insert a new user in the database
         */
        this.app.post('/user', UserPutController.run);

        return this.app;
    }
}
