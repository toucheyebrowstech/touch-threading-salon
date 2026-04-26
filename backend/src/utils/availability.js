/**
 * File: backend/src/utils/availability.js
 * Purpose: Calculates business hours, appointment slot availability, and duplicate booking prevention helpers.
 * Features: Time conversion, open/closed checks, 15-minute slot generation, past-time blocking, overlapping appointment checks, and any-worker availability.
 * Used by: Appointment controller and settings-aware booking flow.
 * Future edits: Add staff-specific breaks, holidays, buffers, or multi-service bookings here.
 */

import mongoose from 'mongoose';
import Appointment from '../models/Appointment.js';
import Staff from '../models/Staff.js';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const SALON_TIME_ZONE = process.env.SALON_TIME_ZONE || 'America/Chicago';

export const timeToMinutes = (time) => {
  const [hours, minutes] = String(time).split(':').map(Number);
  return hours * 60 + minutes;
};

export const minutesToTime = (minutes) => {
  const h = Math.floor(minutes / 60).toString().padStart(2, '0');
  const m = (minutes % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
};

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(String(value || ''));

export const getDayHours = (settings, dateString) => {
  const date = new Date(`${dateString}T12:00:00`);
  if (Number.isNaN(date.getTime())) return null;

  const dayName = DAY_NAMES[date.getDay()];
  return settings.hours.find((item) => item.day === dayName) || null;
};

export const getSalonToday = () => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: SALON_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(new Date());

  const year = parts.find((part) => part.type === 'year')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;
  const day = parts.find((part) => part.type === 'day')?.value;

  return `${year}-${month}-${day}`;
};

export const getSalonCurrentMinutes = () => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: SALON_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).formatToParts(new Date());

  const hour = Number(parts.find((part) => part.type === 'hour')?.value || 0);
  const minute = Number(parts.find((part) => part.type === 'minute')?.value || 0);

  return hour * 60 + minute;
};

export const rangesOverlap = (startA, endA, startB, endB) => startA < endB && startB < endA;

export const appointmentOverlapsSlot = (appointment, slotStart, slotEnd) => {
  const appointmentStart = timeToMinutes(appointment.time);
  const appointmentEnd = appointmentStart + Number(appointment.durationMinutes || 15);

  return rangesOverlap(slotStart, slotEnd, appointmentStart, appointmentEnd);
};

export const isPastSlot = (dateString, slotStart) => {
  if (dateString !== getSalonToday()) return false;
  return slotStart <= getSalonCurrentMinutes();
};

export const isWithinBusinessHours = (settings, dateString, time, durationMinutes = 15) => {
  const dayHours = getDayHours(settings, dateString);
  if (!dayHours || !dayHours.isOpen) return false;

  const start = timeToMinutes(time);
  const end = start + Number(durationMinutes || settings.defaultServiceDurationMinutes || 15);
  const open = timeToMinutes(dayHours.open);
  const close = timeToMinutes(dayHours.close);

  return start >= open && end <= close && !isPastSlot(dateString, start);
};

export const buildTimeSlots = async ({ settings, date, staffId, durationMinutes = 15 }) => {
  const dayHours = getDayHours(settings, date);
  if (!dayHours || !dayHours.isOpen) {
    return { isOpen: false, message: 'The salon is closed on this date.', slots: [] };
  }

  const open = timeToMinutes(dayHours.open);
  const close = timeToMinutes(dayHours.close);
  const interval = Number(settings.slotIntervalMinutes || 15);
  const slotDuration = Number(durationMinutes || settings.defaultServiceDurationMinutes || 15);
  const hasSpecificStaff = isValidObjectId(staffId);

  const activeStaff = hasSpecificStaff
    ? await Staff.find({ _id: staffId, isActive: true }).select('_id name')
    : await Staff.find({ isActive: true }).select('_id name');

  if (!activeStaff.length) {
    return { isOpen: true, message: 'No active workers are available for this selection.', slots: [] };
  }

  const staffIds = activeStaff.map((worker) => worker._id);
  const existing = await Appointment.find({
    staff: { $in: staffIds },
    date,
    status: { $in: ['Pending', 'Confirmed'] }
  }).select('staff time durationMinutes');

  const slots = [];

  for (let cursor = open; cursor + slotDuration <= close; cursor += interval) {
    const time = minutesToTime(cursor);
    const slotEnd = cursor + slotDuration;
    const past = isPastSlot(date, cursor);

    const availableWorkers = activeStaff.filter((worker) => {
      const workerAppointments = existing.filter((appt) => String(appt.staff) === String(worker._id));
      return !workerAppointments.some((appt) => appointmentOverlapsSlot(appt, cursor, slotEnd));
    });

    const hasAvailableWorker = availableWorkers.length > 0;

    slots.push({
      time,
      available: !past && hasAvailableWorker,
      reason: past ? 'Past time' : hasAvailableWorker ? '' : 'Booked',
      availableStaffIds: availableWorkers.map((worker) => String(worker._id))
    });
  }

  return { isOpen: true, message: '', slots };
};

export const ensureNoDuplicateAppointment = async ({ staffId, date, time, durationMinutes = 15 }) => {
  if (!isValidObjectId(staffId)) return false;
  if (isPastSlot(date, timeToMinutes(time))) return false;

  const start = timeToMinutes(time);
  const end = start + Number(durationMinutes || 15);

  const existing = await Appointment.find({
    staff: staffId,
    date,
    status: { $in: ['Pending', 'Confirmed'] }
  }).select('time durationMinutes');

  return !existing.some((appt) => appointmentOverlapsSlot(appt, start, end));
};

export const findAvailableStaffForSlot = async ({ date, time, durationMinutes = 15 }) => {
  if (isPastSlot(date, timeToMinutes(time))) return null;

  const activeStaff = await Staff.find({ isActive: true }).sort({ displayOrder: 1, name: 1 }).select('_id name');
  const start = timeToMinutes(time);
  const end = start + Number(durationMinutes || 15);

  for (const worker of activeStaff) {
    const existing = await Appointment.find({
      staff: worker._id,
      date,
      status: { $in: ['Pending', 'Confirmed'] }
    }).select('time durationMinutes');

    const hasConflict = existing.some((appt) => appointmentOverlapsSlot(appt, start, end));

    if (!hasConflict) return worker;
  }

  return null;
};
