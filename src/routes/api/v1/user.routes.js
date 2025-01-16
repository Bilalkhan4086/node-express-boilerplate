const express = require('express');
const router = express.Router();
const { 
  authMiddleware, 
  isAdmin, 
  isUser, 
  isOwnerOrAdmin 
} = require('../../../middleware/auth.middleware');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../../../controllers/user.controller');

router.use(authMiddleware);

router.get('/', isAdmin, getAllUsers);
router.delete('/:id', isAdmin, deleteUser);

router.get('/:id', isOwnerOrAdmin, getUserById);
router.put('/:id', isOwnerOrAdmin, updateUser);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *         telephone:
 *           type: string
 *         age:
 *           type: integer
 *         address:
 *           type: string
 *         town:
 *           type: string
 *         postcode:
 *           type: string
 *         role:
 *           type: string
 *         package_id:
 *           type: integer
 *         is_started:
 *           type: boolean
 *         start_date:
 *           type: string
 *           format: date
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 */

module.exports = router; 