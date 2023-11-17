# API e-commerce
### NOTA:
Para probar la API, descargar los archivos, abrirlo desde VSC (con Node instalado) y colocar "npm install" o "npm i" en la terminal. Esto instalará todas las dependencias/paquetes necesarios para correr el programa.
Luego, poner "node index.js" o "npx nodemon index.js" para correr el programa.
#
### Documentación SwaggerUI:
Para generar la documentación automáticamente, es necesario instalar las siguientes librerías: 

> **npm install swagger-ui-express swagger-jsdoc**

Crear el archivo **swagger.js** con el siguiente código:
```javascript
const swaggerAutogen = require('swagger-autogen')();
const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'localhost:3000'
};
const outputFile = './swagger-output.json';
const routes = ['./index.js'];
swaggerAutogen(outputFile, routes, doc);
```

Agregar las líneas al comienzo de nuestro archivo index.js:
```javascript
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
```

Luego, ingresar el comando:
> **node ./swagger.js**

Se va a generar automáticamente un archivo llamado **"swagger-output.json"** el cual contiene la documentación en formato JSON, la cual es utilizada por SwaggerUI para mostrarla en una interfaz amigable.
Para visualizarla, correr el servidor ingresando el siguiente comando:
> node index.js

Finalmente, en el navegador web, acceder a la siguiente dirección:
###**localhost:3000/doc**
Se abrirá la interfaz gráfica de SwaggerUI con toda la documentación generada automáticamente, la cual nos permite visualizar los diferentes endpoints con sus respectivos parámetros de entrada esperados y parámetros de salida. También nos permite realizar solicitudes (requests) hacia éstos directamente en la interfaz, facilitando la prueba de éstos.



