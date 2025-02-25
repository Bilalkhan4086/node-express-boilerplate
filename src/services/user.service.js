const BaseService = require('./base.service');
const User = require('../models/user.model');
const { removeProperties } = require('../utils/common');

class UserService extends BaseService {
  constructor() {
    super(User);
  }

  async getAllUsers() {
    return this.getAll({
      attributes: { exclude: ['password'] },
    });
  }

  async updateUser(id, userData) {
    const { password, role, ...updateData } = userData;
    try {
      const result = await this.update(id, updateData);
      if (result.success && result.data) {
        const { password, ...userData } = result.data.toJSON();
        return { success: true, data: userData };
      }
      return result;
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async partialUpdateUser(id, userData) {
    const updateData = removeProperties(userData, ['password', 'email']);

    try {
      const result = await this.update(id, updateData);
      if (result.success && result.data) {
        const userData = removeProperties(result.data.toJSON(), ['password']);
        return { success: true, data: userData };
      }
      return result;
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getUserById(id) {
    return this.getById(id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Survey,
          as: 'survey',
        },
      ],
    });
  }
}

module.exports = new UserService();
