/**
 * File: backend/src/routes/settingsRoutes.js
 * Purpose: Defines business settings routes for public display and admin updates.
 * Features: Public GET settings and protected PATCH settings.
 * Used by: Footer, contact page, appointment logic, and admin settings manager.
 * Future edits: Add holiday closure routes or separate social-links endpoints here.
 */

import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getSettings);
router.patch('/', protectAdmin, updateSettings);

export default router;
