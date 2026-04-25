/**
 * File: backend/src/routes/appointmentsRoutes.js
 * Purpose: Defines appointment booking and admin appointment routes.
 * Features: Public booking, public slot lookup, protected admin list/detail/status/delete.
 * Used by: Appointment page and admin appointments table.
 * Future edits: Add customer cancellation or reschedule endpoints here.
 */

import express from 'express';
import { createAppointment, deleteAppointment, getAppointmentById, getAppointments, getAvailableSlots, updateAppointmentStatus } from '../controllers/appointmentsController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/slots', getAvailableSlots);
router.post('/', createAppointment);
router.get('/', protectAdmin, getAppointments);
router.get('/:id', protectAdmin, getAppointmentById);
router.patch('/:id/status', protectAdmin, updateAppointmentStatus);
router.delete('/:id', protectAdmin, deleteAppointment);

export default router;
