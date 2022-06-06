import winston from 'winston';

/**
 * Levels for Winston Logger
 */
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

/**
 * Check if is in development mode for setting the level
 */
const level = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};

/**
 * Available colors
 */
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};

// Set the colors in the Winston Logger
winston.addColors(colors);

/**
 * Format the Winston Log in the file
 */
const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

/**
 * Create the transport to save the log file
 */
const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: '../logs/error.log',
        level: 'error',
    }),
    new winston.transports.File({ filename: 'logs/all.log' }),
];

/**
 * Create the logger
 */
const Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
});

export default Logger;
