/**
 * File: backend/src/controllers/offersController.js
 * Purpose: Manages salon offers, discounts, packages, loyalty rewards, and referral promos.
 * Features: Public active offers plus admin create/update/delete operations.
 * Used by: Home offers section, offers page, seed script, and admin offers manager.
 * Future edits: Add coupon validation or expiration display rules here.
 */

import Offer from '../models/Offer.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getOffers = asyncHandler(async (req, res) => {
  const includeInactive = req.query.includeInactive === 'true';
  const now = new Date();
  const filter = includeInactive
    ? {}
    : { isActive: true, $and: [{ $or: [{ startsAt: null }, { startsAt: { $lte: now } }] }, { $or: [{ endsAt: null }, { endsAt: { $gte: now } }] }] };
  const offers = await Offer.find(filter).sort({ displayOrder: 1, createdAt: -1 });
  res.json(offers);
});

export const createOffer = asyncHandler(async (req, res) => {
  const offer = await Offer.create(req.body);
  res.status(201).json(offer);
});

export const updateOffer = asyncHandler(async (req, res) => {
  const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!offer) return res.status(404).json({ message: 'Offer not found.' });
  res.json(offer);
});

export const deleteOffer = asyncHandler(async (req, res) => {
  const offer = await Offer.findByIdAndDelete(req.params.id);
  if (!offer) return res.status(404).json({ message: 'Offer not found.' });
  res.json({ message: 'Offer deleted successfully.' });
});
