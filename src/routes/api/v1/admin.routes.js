const express = require('express');
const router = express.Router();
const { 
  authMiddleware, 
  isAdmin 
} = require('../../../middleware/auth.middleware');

router.use(authMiddleware);
router.use(isAdmin);


module.exports = router; 