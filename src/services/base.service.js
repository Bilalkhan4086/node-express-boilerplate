class BaseService {
  constructor(model) {
    this.model = model;
  }

  async getAll(options = {}) {
    try {
      const items = await this.model.findAll(options);
      return { success: true, data: items };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getById(id, options = {}) {
    try {
      const item = await this.model.findByPk(id, options);
      if (!item) {
        return { success: false, error: 'Record not found', statusCode: 404 };
      }
      return { success: true, data: item };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async create(data) {
    try {
      const item = await this.model.create(data);
      return { success: true, data: item };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async update(id, data) {
    try {
      const item = await this.model.findByPk(id);
      if (!item) {
        return { success: false, error: 'Record not found', statusCode: 404 };
      }

      const updatedItem = await item.update(data);
      return { success: true, data: updatedItem };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async delete(id) {
    try {
      const item = await this.model.findByPk(id);
      if (!item) {
        return { success: false, error: 'Record not found', statusCode: 404 };
      }

      await item.destroy();
      return { success: true, message: 'Record deleted successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async findOne(options = {}) {
    try {
      const item = await this.model.findOne(options);
      if (!item) {
        return { success: false, error: 'Record not found', statusCode: 404 };
      }
      return { success: true, data: item };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = BaseService;
