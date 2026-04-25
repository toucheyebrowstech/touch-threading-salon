/**
 * File: backend/src/utils/availability.js
 * Purpose: Calculates business hours, appointment slot availability, and duplicate booking prevention helpers.
 * Features: Time conversion, open/closed checks, 15-minute slot generation, and appointment conflict checks.
 * Used by: Appointment controller and settings-aware booking flow.
 * Future edits: Add staff-specific breaks, holidays, buffers, or multi-service bookings here.
 */

import Appointment from '../models/Appointment.js';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const timeToMinutes = (time) => {
  const [hours, minutes] = String(time).split(':').map(Number);
  return hours * 60 + minutes;
};

export const minutesToTime = (minutes) => {
  const h = Math.floor(minutes / 60).toString().padStart(2, '0');
  const m = (minutes % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
};

export const getDayHours = (settings, dateString) => {
  const date = new Date(`${dateString}T12:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  const dayName = DAY_NAMES[date.getDay()];
  return settings.hours.find((item) => item.day === dayName) || null;
};

export const isWithinBusinessHours = (settings, dateString, time, durationMinutes = 15) => {
  const dayHours = getDayHours(settings, dateString);
  if (!dayHours || !dayHours.isOpen) return false;

  const start = timeToMinutes(time);
  const end = start + Number(durationMinutes || settings.defaultServiceDurationMinutes || 15);
  const open = timeToMinutes(dayHours.open);
  const close = timeToMinutes(dayHours.close);

  return start >= open && end <= close;
};

export const buildTimeSlots = async ({ settings, date, staffId, durationMinutes = 15 }) => {
  const dayHours = getDayHours(settings, date);
  if (!dayHours || !dayHours.isOpen) {
    return { isOpen: false, message: 'The salon is closed on this date.', slots: [] };
  }

  const open = timeToMinutes(dayHours.open);
  const close = timeToMinutes(dayHours.close);
  const interval = settings.slotIntervalMinutes || 15;
  const existing = await Appointment.find({
    staff: staffId,
    date,
    status: { $in: ['Pending', 'Confirmed'] }
  }).select('time durationMinutes');

  const busy = new Set(existing.map((appt) => appt.time));
  const slots = [];

  for (let cursor = open; cursor + durationMinutes <= close; cursor += interval) {
    const time = minutesToTime(cursor);
    slots.push({ time, available: !busy.has(time) });
  }

  return { isOpen: true, message: '', slots };
};

export const ensureNoDuplicateAppointment = async ({ staffId, date, time }) => {
  const existing = await Appointment.findOne({
    staff: staffId,
    date,
    time,
    status: { $in: ['Pending', 'Confirmed'] }
  });

  return !existing;
};
