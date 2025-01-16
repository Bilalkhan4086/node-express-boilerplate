const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const register = async (req, res) => {
  try {
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = await User.create(req.body);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const { password, ...userData } = user.toJSON();

    res.status(201).json({
      success: true,
      data: userData,
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const { password: _, ...userData } = user.toJSON();

    res.json({
      success: true,
      data: userData,
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
}; 