/**
 * File: backend/src/routes/contactRoutes.js
 * Purpose: Defines contact form and admin contact message routes.
 * Features: Public message submission, protected message list, and protected mark-read route.
 * Used by: Contact page and admin messages manager.
 * Future edits: Add delete/archive message endpoint here if needed.
 */

import express from 'express';
import { createContactMessage, getContactMessages, markContactMessageRead } from '../controllers/contactController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createContactMessage);
router.get('/', protectAdmin, getContactMessages);
router.patch('/:id/read', protectAdmin, markContactMessageRead);

export default router;
