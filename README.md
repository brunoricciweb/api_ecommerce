# API e-commerce
### NOTA:
Para probar la API, descargar los archivos, abrirlo desde VSC (con Node instalado) y colocar "npm install" o "npm i" en la terminal. Esto instalará todas las dependencias/paquetes necesarios para correr el programa.
Luego, poner "node index.js" o "npx nodemon index.js" para correr el programa.
#
### Documentación SwaggerUI:
Para generar la documentación automáticamente, es necesario instalar las siguientes librerías: 

> **npm install swagger-ui-express**

> **npm install ./swagger-output.json**

Crear el archivo **swagger.js** con el siguiente código:
> <code>const swaggerAutogen = require('swagger-autogen')();
    const doc = {
      info: {
        title: 'My API',
        description: 'Description'
      },
      host: 'localhost:3000'
    };
    const outputFile = './swagger-output.json';
    const routes = ['./index.js'];
    swaggerAutogen(outputFile, routes, doc);</code>


Agregar las líneas al comienzo de nuestro archivo index.js:




Luego, ingresar el comando:
> **node ./swagger.js**


