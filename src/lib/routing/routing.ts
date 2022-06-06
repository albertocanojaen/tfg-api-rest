import { Router } from 'express';
import Logger from '../logger';

export abstract class Routing {
    router: Router;
    name: string;

    constructor(router: Router, name: string) {
        this.router = router;
        this.name = name;
        this.configureRoutes();
        this.sendLog();
    }
    getName() {
        return this.name;
    }

    public sendLog() {
        Logger.info(`📍 The ${this.getName()} route is created successfully!`);
    }

    abstract configureRoutes(): Router;
}
