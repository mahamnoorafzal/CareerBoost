// User Routes
// Routes for user profile management

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getProfile,
  updateProfile,
  changePassword
} = require('../controllers/userController');

/**
 * GET /api/user/profile
 * Get user profile
 */
router.get('/profile', authMiddleware, getProfile);

/**
 * PUT /api/user/profile
 * Update user profile
 */
router.put('/profile', authMiddleware, updateProfile);

/**
 * POST /api/user/change-password
 * Change user password
 */
router.post('/change-password', authMiddleware, changePassword);

module.exports = router;
