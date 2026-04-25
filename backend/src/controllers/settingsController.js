/**
 * File: backend/src/controllers/settingsController.js
 * Purpose: Reads and updates salon business settings and hours.
 * Features: Public settings fetch, admin update, and default settings creation.
 * Used by: Contact page, footer, appointment availability, admin settings manager, and seed script.
 * Future edits: Add holiday closures or multi-location settings here.
 */

import BusinessSettings from '../models/BusinessSettings.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const defaultHours = [
  { day: 'Monday', isOpen: true, open: '09:00', close: '19:00' },
  { day: 'Tuesday', isOpen: true, open: '09:00', close: '19:00' },
  { day: 'Wednesday', isOpen: true, open: '09:00', close: '19:00' },
  { day: 'Thursday', isOpen: true, open: '09:00', close: '19:00' },
  { day: 'Friday', isOpen: true, open: '09:00', close: '19:00' },
  { day: 'Saturday', isOpen: true, open: '09:00', close: '19:00' },
  { day: 'Sunday', isOpen: true, open: '11:00', close: '18:00' }
];

export const getOrCreateSettings = async () => {
  let settings = await BusinessSettings.findOne({ singletonKey: 'main' });
  if (!settings) {
    settings = await BusinessSettings.create({ singletonKey: 'main', hours: defaultHours });
  }
  return settings;
};

export const getSettings = asyncHandler(async (req, res) => {
  const settings = await getOrCreateSettings();
  res.json(settings);
});

export const updateSettings = asyncHandler(async (req, res) => {
  const settings = await BusinessSettings.findOneAndUpdate(
    { singletonKey: 'main' },
    { ...req.body, singletonKey: 'main' },
    { new: true, upsert: true, runValidators: true }
  );
  res.json(settings);
});
