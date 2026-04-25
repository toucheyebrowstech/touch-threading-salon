/**
 * File: backend/src/models/BusinessSettings.js
 * Purpose: Stores editable business information and appointment rules.
 * Features: Salon name, address, phone, email, socials, hours, slot interval, default duration, and map embed.
 * Used by: Public contact/footer sections, appointment availability logic, admin settings manager, and seed script.
 * Future edits: Update default business information fields here if the salon expands locations.
 */

import mongoose from 'mongoose';

const dayHoursSchema = new mongoose.Schema(
  {
    day: { type: String, required: true },
    isOpen: { type: Boolean, default: true },
    open: { type: String, default: '09:00' },
    close: { type: String, default: '19:00' }
  },
  { _id: false }
);

const businessSettingsSchema = new mongoose.Schema(
  {
    singletonKey: { type: String, default: 'main', unique: true },
    businessName: { type: String, default: 'Touch Threading and Brows Salon' },
    tagline: { type: String, default: 'Perfect Brows. Smooth Skin. Effortless Beauty.' },
    address: { type: String, default: '2150 N Josey Ln, Carrollton, Texas #109' },
    phone: { type: String, default: '(000) 000-0000' },
    email: { type: String, default: 'hello@touchthreading.com' },
    mapEmbedUrl: { type: String, default: '' },
    socialLinks: {
      instagram: { type: String, default: '#' },
      facebook: { type: String, default: '#' },
      tiktok: { type: String, default: '#' },
      yelp: { type: String, default: '#' }
    },
    hours: [dayHoursSchema],
    slotIntervalMinutes: { type: Number, default: 15 },
    defaultServiceDurationMinutes: { type: Number, default: 15 },
    walkInsMessage: { type: String, default: 'Walk-ins are welcome, but appointments help us serve you faster.' },
    cancellationNote: { type: String, default: 'Please call ahead if you need to cancel or reschedule.' }
  },
  { timestamps: true }
);

export default mongoose.model('BusinessSettings', businessSettingsSchema);
