require('dotenv').config();
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'YouAppName API Documentation',
      version: '1.0.0',
      description: 'API documentation for YouAppName application',
    },
    servers: [
      {
        url: process.env.BASE_URL,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/api/v1/*.js', './src/routes/api/v1/*/*.js'], // Path to the API routes
};

module.exports = swaggerJsdoc(options);
