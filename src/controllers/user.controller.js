const UserService = require('../services/user.service');

const getAllUsers = async (req, res) => {
  const result = await UserService.getAllUsers();
  res.json(result);
};

const getUserById = async (req, res) => {
  const result = await UserService.getUserById(req.params.id);
  res.json(result);
};

const updateUser = async (req, res) => {
  const result = await UserService.updateUser(req.params.id, req.body);
  res.json(result);
};

const partialUpdateUser = async (req, res) => {
  const result = await UserService.partialUpdateUser(req.params.id, req.body);
  res.json(result);
};

const deleteUser = async (req, res) => {
  const result = await UserService.delete(req.params.id);
  res.json(result);
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  partialUpdateUser,
};
