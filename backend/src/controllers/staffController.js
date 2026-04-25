/**
 * File: backend/src/controllers/staffController.js
 * Purpose: Manages public and admin staff/worker records.
 * Features: List active staff, create staff, update staff, and delete staff.
 * Used by: Staff page, appointment worker picker, seed script, and admin staff manager.
 * Future edits: Add individual staff schedules or blocked-off days here.
 */

import Staff from '../models/Staff.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getStaff = asyncHandler(async (req, res) => {
  const includeInactive = req.query.includeInactive === 'true';
  const filter = includeInactive ? {} : { isActive: true };
  const staff = await Staff.find(filter).sort({ displayOrder: 1, name: 1 });
  res.json(staff);
});

export const createStaff = asyncHandler(async (req, res) => {
  const staff = await Staff.create(req.body);
  res.status(201).json(staff);
});

export const updateStaff = asyncHandler(async (req, res) => {
  const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!staff) return res.status(404).json({ message: 'Staff member not found.' });
  res.json(staff);
});

export const deleteStaff = asyncHandler(async (req, res) => {
  const staff = await Staff.findByIdAndDelete(req.params.id);
  if (!staff) return res.status(404).json({ message: 'Staff member not found.' });
  res.json({ message: 'Staff member deleted successfully.' });
});
