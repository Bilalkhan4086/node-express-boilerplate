const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const { errorHandler } = require('./middleware/error.middleware');
const routes = require('./routes/api/v1');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

// Security Middleware
app.use(helmet()); 
app.use(cors()); 
app.use(hpp());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Middleware
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', routes);

// Swagger documentation route
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling
app.use(errorHandler);

module.exports = app; 