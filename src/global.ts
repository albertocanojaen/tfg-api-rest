import Environment from './environment/env';

declare global {
    // eslint-disable-next-line no-var
    var environment: Environment;
}

export const setGlobalEnvironment = (environment: Environment): void => {
    global.environment = environment;
};
