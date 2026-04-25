/**
 * File: backend/src/routes/authRoutes.js
 * Purpose: Defines admin authentication routes.
 * Features: POST login and protected GET current admin.
 * Used by: Admin dashboard authentication flow.
 * Future edits: Add password reset or multi-admin routes here.
 */

import express from 'express';
import { getAdminMe, loginAdmin } from '../controllers/authController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/me', protectAdmin, getAdminMe);

export default router;
