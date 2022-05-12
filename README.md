# tfg-api-rest

API Rest for my Final Degree Project made with Typescript, Express and Prisma.

# Environment files

Insert .env file into the main directory with the following content:

```
NODE_ENV=dev
SERVER=127.0.0.1
PORT=3300
APPLY_ENCRYPTION=true
SECRET_KEY=0304141412
DATABASE_URL=mysql://root:pass@127.0.0.1:6033/db
```


# Steps to create the project

1. Inicializamos el proyecto de Node e introducimos la configuración deseada (dos archivos package.json y package-lock.json):

```
npm init
```

2. Instalamos todas las dependencias necesarias de momento:

[typescript]
[tslint]
[express]
[prisma]
[jest]

3. También es necesario inicializar nuestro proyecto (generando el archivo tsconfig.json):

```
tsc --init
```

4. Incluimos el script que permitirá compilar nuestra API en modo de desarrollo:

```
ts-node-dev --respawn ./src/index.ts
```

5. Es importante utilizar alguna librería para testear nuestra API (utilizaremos jest) y para ello inicializamos el archivo de configuración básico:

```
export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
};
```

5. Utilizaré un ORM que nos permite mapear la estructura de una base de datos relacional y trabajar sobre una estructura lógica de entidades para acelerar el desarrollo de la aplicación. Inicializamos prisma:

```
npx prisma init
```
