/**
 * File: backend/src/controllers/appointmentsController.js
 * Purpose: Handles appointment creation, availability checks, admin appointment listing, status updates, and deletion.
 * Features: Required field validation, phone/email validation, business-hours enforcement, time-slot lookup, and duplicate worker/date/time prevention.
 * Used by: Public appointment booking page and admin appointments table.
 * Future edits: Add email/SMS confirmations, deposits, staff-specific schedules, or holiday closures here.
 */

import Appointment from '../models/Appointment.js';
import Service from '../models/Service.js';
import Staff from '../models/Staff.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { isValidEmail, isValidPhone, normalizeDateOnly, requireFields } from '../utils/validators.js';
import { buildTimeSlots, ensureNoDuplicateAppointment, findAvailableStaffForSlot, isWithinBusinessHours } from '../utils/availability.js';
import { getOrCreateSettings } from './settingsController.js';

export const getAvailableSlots = asyncHandler(async (req, res) => {
  const { date, staffId, serviceId } = req.query;
  if (!date) return res.status(400).json({ message: 'date is required.' });

  const settings = await getOrCreateSettings();
  const service = serviceId ? await Service.findById(serviceId) : null;
  const durationMinutes = service?.durationMinutes || settings.defaultServiceDurationMinutes || 15;
  const slots = await buildTimeSlots({ settings, date, staffId: staffId || '', durationMinutes });

  res.json(slots);
});

export const createAppointment = asyncHandler(async (req, res) => {
  const missing = requireFields(req.body, ['customerName', 'phone', 'email', 'service', 'date', 'time']);
  if (missing.length) return res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}` });
  if (!isValidEmail(req.body.email)) return res.status(400).json({ message: 'Please enter a valid email address.' });
  if (!isValidPhone(req.body.phone)) return res.status(400).json({ message: 'Please enter a valid phone number.' });

  const date = normalizeDateOnly(req.body.date);
  if (!date) return res.status(400).json({ message: 'Please enter a valid appointment date.' });

  const [service, settings] = await Promise.all([
    Service.findById(req.body.service),
    getOrCreateSettings()
  ]);

  if (!service || !service.isActive) return res.status(404).json({ message: 'Selected service was not found.' });

  const durationMinutes = service.durationMinutes || settings.defaultServiceDurationMinutes || 15;
  if (!isWithinBusinessHours(settings, date, req.body.time, durationMinutes)) {
    return res.status(400).json({ message: 'This appointment time is unavailable. Please choose a future time during business hours.' });
  }

  let staff = null;

  if (req.body.staff) {
    staff = await Staff.findById(req.body.staff);

    if (!staff || !staff.isActive) {
      return res.status(404).json({ message: 'Selected staff member was not found.' });
    }

    const isAvailable = await ensureNoDuplicateAppointment({
      staffId: staff._id,
      date,
      time: req.body.time,
      durationMinutes
    });

    if (!isAvailable) {
      return res.status(409).json({
        message: 'That time is already booked for this worker. Please choose another slot or call us to check same-day availability.'
      });
    }
  } else {
    staff = await findAvailableStaffForSlot({
      date,
      time: req.body.time,
      durationMinutes
    });

    if (!staff) {
      return res.status(409).json({
        message: 'That time is already booked. Please choose another slot or call us to check if another worker or cancellation is available.'
      });
    }
  }

  const appointment = await Appointment.create({
    customerName: req.body.customerName,
    phone: req.body.phone,
    email: req.body.email,
    service: service._id,
    serviceName: service.name,
    staff: staff._id,
    staffName: staff.name,
    date,
    time: req.body.time,
    durationMinutes,
    notes: req.body.notes || '',
    status: 'Pending'
  });

  res.status(201).json({ message: 'Appointment request received. We will confirm it soon.', appointment });
});

export const getAppointments = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.date) filter.date = req.query.date;
  const appointments = await Appointment.find(filter).populate('service staff').sort({ date: 1, time: 1, createdAt: -1 });
  res.json(appointments);
});

export const getAppointmentById = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id).populate('service staff');
  if (!appointment) return res.status(404).json({ message: 'Appointment not found.' });
  res.json(appointment);
});

export const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const allowed = ['Pending', 'Confirmed', 'Cancelled', 'Completed'];
  if (!allowed.includes(req.body.status)) return res.status(400).json({ message: 'Invalid appointment status.' });
  const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (!appointment) return res.status(404).json({ message: 'Appointment not found.' });
  res.json(appointment);
});

export const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findByIdAndDelete(req.params.id);
  if (!appointment) return res.status(404).json({ message: 'Appointment not found.' });
  res.json({ message: 'Appointment deleted successfully.' });
});
