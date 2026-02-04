import { verifyToken } from '../utils/jwt.js';
import User from '../models/User.js';
import { AppError } from './errorHandler.js';

export const protect = async (req, res, next) => {
  let token;

  // Get token from header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Not authorized, no token provided', 401));
  }

  try {
    // Verify token
    const decoded = verifyToken(token);

    // Get user
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new AppError('User not found', 401));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new AppError('Not authorized, token invalid', 401));
  }
};
