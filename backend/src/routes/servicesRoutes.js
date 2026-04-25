/**
 * File: backend/src/routes/servicesRoutes.js
 * Purpose: Defines service listing and admin service management routes.
 * Features: Public GET services and protected create/update/delete.
 * Used by: Services page, appointment form, and admin services manager.
 * Future edits: Add service image upload routes here.
 */

import express from 'express';
import { createService, deleteService, getServices, updateService } from '../controllers/servicesController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getServices);
router.post('/', protectAdmin, createService);
router.patch('/:id', protectAdmin, updateService);
router.delete('/:id', protectAdmin, deleteService);

export default router;
