
# :red_circle: API Rest con Typescript + Express + Prisma :red_circle:

Se realiza la creación de una API Rest como backend para una aplicación móvil acerca de la conciliación familia-trabajo como Trabajo de Fin de Grado de Ingeniería Informática en la Universidad de Granada. 
La estructura de esta API se ha definido en base a la experiencia adquirida en el grado.

# :seedling: Archivos de entorno 
Para el correcto funcionamiento de esta API, es muy importante disponer de un archivo de entorno en el directorio raiz del proyecto (.env) con el siguiente contenido: 
```
NODE_ENV=dev
SERVER=127.0.0.1
PORT=3300
APPLY_ENCRYPTION=true
SECRET_KEY=0304141412
DATABASE_URL=mysql://root:pass@127.0.0.1:6033/db
```


# :pencil: Pasos de creación de la API 

1. Inicializamos el proyecto de Node e introducimos la configuración deseada (dos archivos package.json y package-lock.json):

```
npm init
```

2. También es necesario inicializar nuestro proyecto (generando el archivo tsconfig.json):
```
tsc --init
```

3. Incluimos el script que permitirá compilar nuestra API en modo de desarrollo:
```
ts-node-dev --respawn ./src/index.ts
```

4. Es importante utilizar alguna librería para testear nuestra API (utilizaremos jest) y para ello inicializamos el archivo de configuración básico:
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

# :closed_book: Dependencias

 - [typescript]
 - [tslint]
 - [express]
 - [prisma]
 - [winston]
 - [morgan]
 - [faker]
 - [dotenv]
 - [cors]
 - [bcryptjs]
 - [helmet]
 - [http-status]
 - [jest]
