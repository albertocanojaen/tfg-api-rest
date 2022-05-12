import { Routing } from '../../lib/routing';
import express from 'express';
import Logger from '../../lib/logger';

export class NotFoundRoutes extends Routing {
    constructor(app: express.Application) {
        super(app, 'NotFound');
    }

    /**
     * All the available routes for the Users
     */
    configureRoutes(): express.Application {
        // The default message
        const message = 'Resource not found';

        /**
         * Get resource not found
         */
        this.app.get('*', function (req, res) {
            res.status(404);
            res.json(message);
        });

        /**
         * Get resource not found
         */
        this.app.post('*', function (req, res) {
            res.status(404);
            res.json(message);
        });

        /**
         * Get resource not found
         */
        this.app.put('*', function (req, res) {
            res.status(404);
            res.json(message);
        });

        /**
         * Get resource not found
         */
        this.app.patch('*', function (req, res) {
            res.status(404);
            res.json(message);
        });

        /**
         * Get resource not found
         */
        this.app.delete('*', function (req, res) {
            res.status(404);
            res.json(message);
        });

        return this.app;
    }
}
