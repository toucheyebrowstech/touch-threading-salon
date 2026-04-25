/**
 * File: backend/src/routes/reviewsRoutes.js
 * Purpose: Defines customer review submission and admin review moderation routes.
 * Features: Public review submission, public approved reviews, admin all reviews, approve/hide, and delete.
 * Used by: Reviews page and admin reviews manager.
 * Future edits: Add review replies or spam filtering endpoints here.
 */

import express from 'express';
import { approveReview, createReview, deleteReview, getAdminReviews, getPublicReviews } from '../controllers/reviewsController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createReview);
router.get('/public', getPublicReviews);
router.get('/admin', protectAdmin, getAdminReviews);
router.patch('/:id/approve', protectAdmin, approveReview);
router.delete('/:id', protectAdmin, deleteReview);

export default router;
