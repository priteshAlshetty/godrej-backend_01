const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Basic Swagger options
const options = {
    definition: {
        openapi: '3.0.0', // OpenAPI version
        info: {
            title: 'My Express API', // API title
            version: '1.0.0', // API version
            description: 'API documentation for my Express app',
        },
    },
    // Path to the API docs (where you write JSDoc comments)
    apis: ['./routes/swagger-def.js'], // adjust path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec,
};
