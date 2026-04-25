/**
 * File: backend/src/models/Appointment.js
 * Purpose: Stores customer appointment bookings for the salon.
 * Features: Customer info, selected service, preferred staff, date, time, notes, duration, status, timestamps, and duplicate prevention index.
 * Used by: Appointment booking page and admin appointment dashboard.
 * Future edits: Add payment/deposit status, reminder flags, or cancellation reason here.
 */

import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    serviceName: { type: String, required: true, trim: true },
    staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
    staffName: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, default: 15 },
    notes: { type: String, default: '', trim: true },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
      default: 'Pending'
    }
  },
  { timestamps: true }
);

appointmentSchema.index({ staff: 1, date: 1, time: 1 }, { unique: true });
appointmentSchema.index({ date: 1, status: 1 });

export default mongoose.model('Appointment', appointmentSchema);
