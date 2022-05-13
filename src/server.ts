import * as http from 'http';
import App from './app';
import { AddressInfo } from 'net';
import Environment from './environment/env';
import { setGlobalEnvironment } from './global';
import Logger from './lib/logger';
import { exit } from 'process';

const env: Environment = new Environment();
setGlobalEnvironment(env);
const app: App = new App();
let server: http.Server;

function serverListening(): void {
    Logger.info(`✨ Server listening on port ${env.port} successfully!`);
}

app.init().then(() => {
    app.express.set('port', env.port);
    server = app.httpServer; // http.createServer(App);
    server.on('listening', serverListening);
    server.listen(env.port);
});

// Add a listener to the uncaught exceptions
process.on('uncaughtException', (uncaughtException) => {
    // Log the uncaught exception
    console.error('uncaughtException', uncaughtException);

    // Finish the process
    exit(1);
});
