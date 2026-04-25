/**
 * File: backend/src/controllers/servicesController.js
 * Purpose: Manages salon service records and public service listing.
 * Features: List services by category/order, create, update, and delete services.
 * Used by: Public services page, appointment form, and admin services manager.
 * Future edits: Add image uploads or service package grouping logic here.
 */

import Service from '../models/Service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getServices = asyncHandler(async (req, res) => {
  const includeInactive = req.query.includeInactive === 'true';
  const filter = includeInactive ? {} : { isActive: true };
  const services = await Service.find(filter).sort({ category: 1, displayOrder: 1, name: 1 });
  res.json(services);
});

export const createService = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json(service);
});

export const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!service) return res.status(404).json({ message: 'Service not found.' });
  res.json(service);
});

export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) return res.status(404).json({ message: 'Service not found.' });
  res.json({ message: 'Service deleted successfully.' });
});
