// User Controller
// Handles user profile operations

const User = require('../models/User');

/**
 * Get user profile
 * @route GET /api/user/profile
 */
const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: user.toJSON()
    });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ message: 'Error fetching profile', error: err.message });
  }
};

/**
 * Update user profile
 * @route PUT /api/user/profile
 */
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    if (name) user.name = name;
    if (email) {
      // Check if email is already taken
      const existingUser = await User.findOne({ 
        email: email.toLowerCase(),
        _id: { $ne: userId }
      });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      user.email = email.toLowerCase();
    }

    user.updatedAt = Date.now();
    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: user.toJSON()
    });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
};

/**
 * Change password
 * @route POST /api/user/change-password
 */
const changePassword = async (req, res) => {
  try {
    const userId = req.userId;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New passwords do not match' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    user.updatedAt = Date.now();
    await user.save();

    res.json({
      message: 'Password changed successfully'
    });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ message: 'Error changing password', error: err.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword
};
