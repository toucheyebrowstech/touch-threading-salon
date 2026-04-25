/**
 * File: backend/src/controllers/reviewsController.js
 * Purpose: Handles customer review submissions and admin approval workflow.
 * Features: Save pending reviews, list approved public reviews, list all admin reviews, approve/hide, and delete.
 * Used by: Reviews page and admin reviews manager.
 * Future edits: Add review replies, moderation notes, or spam filtering here.
 */

import Review from '../models/Review.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { requireFields } from '../utils/validators.js';

export const createReview = asyncHandler(async (req, res) => {
  const missing = requireFields(req.body, ['customerName', 'rating', 'message']);
  if (missing.length) return res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}` });

  const rating = Number(req.body.rating);
  if (rating < 1 || rating > 5) return res.status(400).json({ message: 'Rating must be between 1 and 5.' });

  const review = await Review.create({ ...req.body, rating, isApproved: false });
  res.status(201).json({ message: 'Thank you! Your review will appear after approval.', review });
});

export const getPublicReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ isApproved: true }).sort({ createdAt: -1 });
  res.json(reviews);
});

export const getAdminReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({}).sort({ createdAt: -1 });
  res.json(reviews);
});

export const approveReview = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, { isApproved: Boolean(req.body.isApproved) }, { new: true });
  if (!review) return res.status(404).json({ message: 'Review not found.' });
  res.json(review);
});

export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) return res.status(404).json({ message: 'Review not found.' });
  res.json({ message: 'Review deleted successfully.' });
});
