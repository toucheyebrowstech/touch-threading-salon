/**
 * File: backend/src/models/ContactMessage.js
 * Purpose: Stores messages submitted from the public contact form.
 * Features: Name, email, phone, subject, message, read status, and timestamps.
 * Used by: Contact page and admin messages manager.
 * Future edits: Add reply status, message categories, or spam protection fields here.
 */

import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: '', trim: true },
    subject: { type: String, default: 'Website Contact Message', trim: true },
    message: { type: String, required: true, trim: true },
    isRead: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('ContactMessage', contactMessageSchema);
