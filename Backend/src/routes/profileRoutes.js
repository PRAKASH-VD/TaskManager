import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import { updateProfileValidation } from '../middlewares/validation.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/')
  .get(getProfile)
  .put(updateProfileValidation, updateProfile);

export default router;
