/**
 * File: backend/src/routes/offersRoutes.js
 * Purpose: Defines offer listing and admin offer management routes.
 * Features: Public GET offers and protected create/update/delete.
 * Used by: Home page, offers page, and admin offers manager.
 * Future edits: Add coupon validation or redemption tracking routes here.
 */

import express from 'express';
import { createOffer, deleteOffer, getOffers, updateOffer } from '../controllers/offersController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getOffers);
router.post('/', protectAdmin, createOffer);
router.patch('/:id', protectAdmin, updateOffer);
router.delete('/:id', protectAdmin, deleteOffer);

export default router;
