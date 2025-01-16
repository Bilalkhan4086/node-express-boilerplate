const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your App API Documentation",
      version: "1.0.0",
      description: "API documentation for Your App application",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/api/v1/*.js"], // Path to the API routes
};

module.exports = swaggerJsdoc(options);
