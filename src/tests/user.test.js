const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Create mock user data
const mockTestUser = {
  id: 2,
  first_name: 'Test',
  last_name: 'User',
  email: 'test@example.com',
  telephone: '0987654321',
  age: 25,
  address: '456 User St',
  town: 'User Town',
  postcode: '67890',
  role: 'user',
  toJSON: function() {
    return { ...this };
  }
};

const mockAdminUser = {
  id: 1,
  first_name: 'Admin',
  last_name: 'User',
  email: 'admin@example.com',
  role: 'admin',
  toJSON: function() {
    return { ...this };
  }
};

// Mock the User model
jest.mock('../models/user.model', () => ({
  findOne: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn()
}));

describe('User Endpoints', () => {
  let adminToken;
  let userToken;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Generate tokens with proper payload
    adminToken = jwt.sign(
      { id: mockAdminUser.id, role: mockAdminUser.role }, 
      process.env.JWT_SECRET
    );
    userToken = jwt.sign(
      { id: mockTestUser.id, role: mockTestUser.role }, 
      process.env.JWT_SECRET
    );

    // Setup default mock responses
    User.findByPk
      .mockImplementation((id) => {
        if (id === mockAdminUser.id) return Promise.resolve(mockAdminUser);
        if (id === mockTestUser.id) return Promise.resolve(mockTestUser);
        return Promise.resolve(null);
      });

    User.findOne
      .mockImplementation(({ where }) => {
        if (where.id === mockAdminUser.id) return Promise.resolve(mockAdminUser);
        if (where.id === mockTestUser.id) return Promise.resolve(mockTestUser);
        return Promise.resolve(null);
      });
  });

  describe('GET /api/v1/users', () => {
    it('should allow admin to get all users', async () => {
      // Mock findByPk for auth middleware
      User.findByPk.mockResolvedValueOnce(mockAdminUser);
      
      // Mock findAll response
      User.findAll.mockResolvedValueOnce([mockAdminUser, mockTestUser]);

      const res = await request(app)
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });
}); 