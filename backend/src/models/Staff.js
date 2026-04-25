/**
 * File: backend/src/models/Staff.js
 * Purpose: Stores salon worker profiles for public staff cards and appointment booking.
 * Features: Name, role, specialties, working days, bio, image placeholder, active status, and display order.
 * Used by: Staff page, appointment form, seed script, and admin staff manager.
 * Future edits: Replace imageUrl placeholder with real staff photos or add individual working hours.
 */

import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    specialties: [{ type: String, trim: true }],
    workingDays: [{ type: String, trim: true }],
    bio: { type: String, default: '', trim: true },
    imageUrl: { type: String, default: '', trim: true },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Staff', staffSchema);
