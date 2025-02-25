const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access required' });
  }
};

const isUser = (req, res, next) => {
  if (req.user && (req.user.role === 'user' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(403).json({ message: 'User access required' });
  }
};

const isOwnerOrAdmin = (req, res, next) => {
  if (
    req.user && (
      req.user.role === 'admin' || 
      req.user.id === parseInt(req.params.id)
    )
  ) {
    next();
  } else {
    res.status(403).json({ 
      message: 'You do not have permission to perform this action' 
    });
  }
};

module.exports = {
  authMiddleware,
  isAdmin,
  isUser,
  isOwnerOrAdmin
}; 