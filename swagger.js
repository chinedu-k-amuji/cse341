const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
       title: 'employees and project Api',
},
host: 'localhost:3000',
schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);