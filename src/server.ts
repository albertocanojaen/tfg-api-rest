import * as http from 'http';
import App from './app';
import { AddressInfo } from 'net';
import Environment from './environment/env';
import { setGlobalEnvironment } from './global';
import Logger from './lib/logger';

const env: Environment = new Environment();
setGlobalEnvironment(env);
const app: App = new App();
let server: http.Server;

function serverError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
        throw error;
    }
    // handle specific error codes here.
    throw error;
}

function serverListening(): void {
    Logger.info(`✨ Server listening on port ${env.port} successfully!`);
}

app.init()
    .then(() => {
        app.express.set('port', env.port);
        server = app.httpServer; // http.createServer(App);
        server.on('error', serverError);
        server.on('listening', serverListening);
        server.listen(env.port);
    })
    .catch((err: Error) => {
        Logger.info('app.init error');
        Logger.error(err.name);
        Logger.error(err.message);
        Logger.error(err.stack);
    });

process.on('unhandledRejection', (reason: Error) => {
    Logger.error('Unhandled Promise Rejection: reason:', reason.message);
    Logger.error(reason.stack);
    // application specific logging, throwing an error, or other logic here
});
