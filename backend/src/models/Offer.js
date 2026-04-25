/**
 * File: backend/src/models/Offer.js
 * Purpose: Stores editable salon offers, promos, combos, loyalty rewards, and referral discounts.
 * Features: Title, description, badge, discount text, active dates, status, and display order.
 * Used by: Offers public page, home promo section, seed script, and admin offers manager.
 * Future edits: Add coupon codes, redemption limits, or image fields here.
 */

import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    badge: { type: String, default: 'Special Offer', trim: true },
    discountText: { type: String, default: '', trim: true },
    startsAt: { type: Date, default: null },
    endsAt: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Offer', offerSchema);
