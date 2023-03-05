const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Akkor website API',
    description: 'Description',
  },
  host: 'localhost:8000',
  schemes: ['http'],
};

const outputFile = './swagger/swagger-output.json';
const endpointsFiles = ['./app.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);