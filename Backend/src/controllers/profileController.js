import User from '../models/User.js';
import { asyncHandler, AppError } from '../middlewares/errorHandler.js';

// @desc    Get user profile
// @route   GET /api/v1/profile
// @access  Private
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    data: {
      user
    }
  });
});

// @desc    Update user profile
// @route   PUT /api/v1/profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;

  const fieldsToUpdate = {};
  if (name) fieldsToUpdate.name = name;
  if (email) fieldsToUpdate.email = email;

  // Check if email is being changed and already exists
  if (email) {
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== req.user._id.toString()) {
      return next(new AppError('Email already in use', 400));
    }
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    fieldsToUpdate,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      user
    }
  });
});
