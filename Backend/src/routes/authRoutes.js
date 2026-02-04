import express from 'express';
import { signup, login, getMe } from '../controllers/authController.js';
import { signupValidation, loginValidation } from '../middlewares/validation.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
router.get('/me', protect, getMe);

export default router;
