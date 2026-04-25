/**
 * File: frontend/src/api/salonApi.js
 * Purpose: Central Axios client and public API helpers for the salon website.
 * Features: API base URL, services/offers/staff/settings/reviews/contact/appointments requests, and availability lookup.
 * Used by: Public pages, forms, and data-loading hooks.
 * Future edits: Change endpoints, add interceptors, or add new public API functions here.
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const salonApi = {
  getServices: () => api.get('/services').then((res) => res.data),
  getOffers: () => api.get('/offers').then((res) => res.data),
  getStaff: () => api.get('/staff').then((res) => res.data),
  getSettings: () => api.get('/settings').then((res) => res.data),
  getPublicReviews: () => api.get('/reviews/public').then((res) => res.data),
  submitReview: (payload) => api.post('/reviews', payload).then((res) => res.data),
  submitContact: (payload) => api.post('/contact', payload).then((res) => res.data),
  createAppointment: (payload) => api.post('/appointments', payload).then((res) => res.data),
  getAvailableSlots: ({ date, staffId, serviceId }) =>
    api
      .get('/appointments/slots', { params: { date, staffId, serviceId } })
      .then((res) => res.data)
};
