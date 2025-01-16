const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const adminRoutes = require('./admin.routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/admin', adminRoutes);

module.exports = router; 