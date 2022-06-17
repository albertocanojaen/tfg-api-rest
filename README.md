
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
DATABASE_URL=postgre://prisma:prisma@localhost:6033/prisma
```


# :pencil: Instalación

1. Para la instalación del proyecto es necesario instalar tanto Node.js como NPM en el sistema. Si tenemos ambos instalados, desde el directorio raiz del proyecto deberemos ejecutar lo siguiente:

```
npm install
```

2. En el package.json del proyecto he includo distintos scripts para facilitar la inicialización del proyecto. Para ello he preparado un contenedor de Docker donde incluyo una instalación limpia de MySQL y phpymadmin como DBMS (Database Management System). Para la creación del contenedor, es necesario tener instalado y en ejecución Docker, y ejecutar el siguiente comando en el directorio raiz del proyecto: 
```
npm run db:init
```

3. Debemos también modificar el archivo de entorno mencionado anteriormente con los datos necesarios e incluirlo en el directorio raiz del proyecto. 

4. Es necesario generar el schema de Prisma, para poder crear las correspondientes tablas en la base de datos (esto es necesario realizarlo una única vez al instalar el proyecto). Para ello debemos ejecutar los siguientes comandos en el orden indicado:
```
1 -> npx prisma generate
2 -> npx prisma migrate dev
```

5. Una vez realizados los pasos anteriores, estamos listos para iniciar la API en modo de desarrollo. Para ello deberíamos ejecutar lo siguiente:
```
npm run dev
```

# :triangular_ruler: Criteria
Para la elaboración de la API, estoy utilizando Prisma como ORM, siendo un ORM un modelo de programación que permite mapear las estructuras de una base de datos relacional (SQL Server, Oracle, MySQL, etc.), en adelante RDBMS (Relational Database Management System), sobre una estructura lógica de entidades con el objeto de simplificar y acelerar el desarrollo de nuestras aplicaciones.

Para poder abstraernos de Prisma fácilmente un controlador de la API (para por ejemplo listar los usuarios con id mayor que 2 y ordenarlos por nombre ascendente) parseará los Criterios estructurados bajo mi criterio a la implementación concreta de Prisma. 

El cuerpo de la llamada HTTP en cuestión sería el siguiente: 
```
{
    "filters": [
        {
            "connector": "OR",
            "field": "id",
            "operator": "gt",
            "value": 2
        },
        {
            "connector": "AND",
            "field": "email",
            "operator": "equals",
            "value": "tf13g@tfg.com"
        }
    ],
    "orderBy": {
        "name": "asc"
    }
}
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
