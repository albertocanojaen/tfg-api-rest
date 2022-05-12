import express from 'express';
import Logger from './logger';

export abstract class Routing {
    app: express.Application;
    name: string;

    constructor(app: express.Application, name: string) {
        this.app = app;
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

    abstract configureRoutes(): express.Application;
}
