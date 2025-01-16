const request = require('supertest');
const app = require('../app');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

// Mock bcrypt
jest.mock('bcryptjs', () => ({
  compare: jest.fn(() => Promise.resolve(true)), // Mock successful password comparison
  hash: jest.fn(() => Promise.resolve('hashedPassword'))
}));

// Create mock user data
const mockUser = {
  id: 1,
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com',
  telephone: '1234567890',
  age: 25,
  address: '123 Street',
  town: 'Test Town',
  postcode: '12345',
  password: 'hashedPassword', // This should match what bcrypt.hash returns
  role: 'user',
  toJSON: function() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
};

// Mock the User model
jest.mock('../models/user.model', () => ({
  findOne: jest.fn(),
  create: jest.fn()
}));

describe('Auth Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const testUser = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    telephone: '1234567890',
    age: 25,
    address: '123 Street',
    town: 'Test Town',
    postcode: '12345',
    password: 'password123'
  };

  describe('POST /api/v1/auth/register', () => {
    it('should register a new user', async () => {
      User.findOne.mockResolvedValueOnce(null);
      User.create.mockResolvedValueOnce({
        ...mockUser,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      const res = await request(app)
        .post('/api/v1/auth/register')
        .send(testUser);

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.email).toBe(testUser.email);
      expect(res.body.token).toBeDefined();
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should login existing user', async () => {
      // Mock findOne to return user with hashed password
      User.findOne.mockResolvedValueOnce({
        ...mockUser,
        comparePassword: () => Promise.resolve(true) // Mock the password comparison method
      });

      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: testUser.email }
      });
    });
  });
}); 