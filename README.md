# YouAppName

A fitness tracking application built with Express.js and PostgreSQL.

## Features

- Secure authentication system
- Rate limiting
- API versioning
- Error handling
- Database integration with Sequelize
- Implementation of security best practices
- Comprehensive test suite with Jest
- Interactive API documentation with Swagger

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/muhumar/tracking-sheet-backend.git
   cd tracking-sheet-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file:**

   ```bash
   cp .env.example .env
   ```

4. **Update the `.env` file with your configuration**

5. **Start the development server:**

   ```bash
   npm run dev
   ```

## Testing

The project uses Jest for testing. To run tests:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

### Test Structure

```plaintext
src/
└── tests/
    ├── auth.test.js     # Authentication tests
    ├── user.test.js     # User operations tests
    └── setup.js         # Test configuration
```

### Testing Features

- Unit tests for all endpoints
- Integration tests for API routes
- Authentication testing
- Database operations testing
- Test coverage reporting
- Isolated test environment

## Project Structure

```plaintext
src/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/         # Database models
├── routes/         # Route definitions
├── services/       # Business logic
├── tests/          # Test files
├── utils/          # Utility functions
└── app.js          # Application entry point
```

## API Documentation

API documentation is available through Swagger UI at `/api/v1/docs`. This provides:

- Interactive API exploration
- Request/response examples
- Authentication details
- Schema definitions
- API endpoint testing interface

## Security Features

- **Helmet.js:** Secures HTTP headers
- **CORS Protection:** Controls Cross-Origin Resource Sharing
- **Rate Limiting:** Prevents abuse by limiting requests
- **HTTP Parameter Pollution Protection:** Safeguards against parameter pollution attacks
- **JWT Authentication:** Secure token-based authentication
- **Request Validation:** Ensures incoming data meets required criteria
- **Error Handling:** Centralized error management

## Development

### Running in Development Mode

```bash
npm run dev
```

### Running Tests

```bash
npm test
```

### Accessing Swagger Documentation

1. Start the server
2. Visit `http://localhost:3000/api/v1/docs`
3. Explore and test API endpoints

## Contributing

1. **Fork the repository**
2. **Create your feature branch**
3. **Commit your changes**
4. **Push to the branch**
5. **Create a new Pull Request**

## Testing Guidelines

1. **Write tests for new features:**

   - Unit tests for utilities and services
   - Integration tests for API endpoints
   - Authentication/Authorization tests

2. **Run existing tests:**

   ```bash
   npm test
   ```

3. **Ensure good test coverage:**

   ```bash
   npm run test:coverage
   ```

4. **Test environment setup:**
   - Uses separate test database
   - Cleans up after each test
   - Isolated test environment
