/**
 * File: backend/src/controllers/contactController.js
 * Purpose: Handles public contact form submissions and admin message viewing.
 * Features: Save contact messages, validate email/required fields, list messages, and mark read.
 * Used by: Public contact page and admin messages manager.
 * Future edits: Add email notifications to salon owner or CAPTCHA validation here.
 */

import ContactMessage from '../models/ContactMessage.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { isValidEmail, requireFields } from '../utils/validators.js';

export const createContactMessage = asyncHandler(async (req, res) => {
  const missing = requireFields(req.body, ['name', 'email', 'message']);
  if (missing.length) return res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}` });
  if (!isValidEmail(req.body.email)) return res.status(400).json({ message: 'Please enter a valid email address.' });

  const message = await ContactMessage.create(req.body);
  res.status(201).json({ message: 'Your message was sent successfully.', contact: message });
});

export const getContactMessages = asyncHandler(async (req, res) => {
  const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
  res.json(messages);
});

export const markContactMessageRead = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
  if (!message) return res.status(404).json({ message: 'Contact message not found.' });
  res.json(message);
});
