/**
 * File: backend/src/routes/staffRoutes.js
 * Purpose: Defines staff listing and admin staff management routes.
 * Features: Public GET staff and protected create/update/delete.
 * Used by: Staff page, appointment form, and admin staff manager.
 * Future edits: Add staff availability or image upload routes here.
 */

import express from 'express';
import { createStaff, deleteStaff, getStaff, updateStaff } from '../controllers/staffController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getStaff);
router.post('/', protectAdmin, createStaff);
router.patch('/:id', protectAdmin, updateStaff);
router.delete('/:id', protectAdmin, deleteStaff);

export default router;
