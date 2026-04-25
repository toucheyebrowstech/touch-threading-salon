/**
 * File: backend/src/models/Service.js
 * Purpose: Defines salon services and prices stored in MongoDB.
 * Features: Service name, category, price, duration, description, active status, and display order.
 * Used by: Services API, appointment booking, seed script, and admin services manager.
 * Future edits: Add fields here if services need images, staff-specific pricing, or add-ons.
 */

import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    durationMinutes: { type: Number, default: 15, min: 5 },
    description: { type: String, default: '', trim: true },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

serviceSchema.index({ category: 1, displayOrder: 1 });

export default mongoose.model('Service', serviceSchema);
