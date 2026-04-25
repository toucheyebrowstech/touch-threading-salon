/**
 * File: backend/src/models/Review.js
 * Purpose: Stores customer testimonials submitted from the public reviews page.
 * Features: Name, rating, message, service label, approval status, and timestamps.
 * Used by: Public reviews page and admin review approval manager.
 * Future edits: Add photo uploads, Google review imports, or reply-from-owner fields here.
 */

import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    message: { type: String, required: true, trim: true },
    serviceName: { type: String, default: '', trim: true },
    isApproved: { type: Boolean, default: false }
  },
  { timestamps: true }
);

reviewSchema.index({ isApproved: 1, createdAt: -1 });

export default mongoose.model('Review', reviewSchema);
