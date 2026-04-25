/**
 * File name: src/api/adminApi.js
 * Purpose: Central API client for admin dashboard requests.
 * Contains: Axios instance, token helpers, and admin CRUD API methods.
 * Used by: All admin manager components and auth screens.
 * Future edits: Change endpoint paths here if backend routes change.
 */
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const TOKEN_KEY = 'touch_admin_token';
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);
export const api = axios.create({ baseURL: API_URL, headers: { 'Content-Type': 'application/json' } });
api.interceptors.request.use((config) => { const token = getToken(); if (token) config.headers.Authorization = `Bearer ${token}`; return config; });
api.interceptors.response.use((r)=>r, (err)=>{ if(err?.response?.status===401){ clearToken(); } return Promise.reject(err); });
export const adminApi = {
  login: (payload) => api.post('/admin/login', payload), me: () => api.get('/admin/me'),
  appointments: () => api.get('/appointments'), appointment: (id) => api.get(`/appointments/${id}`), updateAppointmentStatus: (id, status) => api.patch(`/appointments/${id}/status`, { status }), deleteAppointment: (id) => api.delete(`/appointments/${id}`),
  services: () => api.get('/services'), createService: (payload) => api.post('/services', payload), updateService: (id, payload) => api.patch(`/services/${id}`, payload), deleteService: (id) => api.delete(`/services/${id}`),
  offers: () => api.get('/offers'), createOffer: (payload) => api.post('/offers', payload), updateOffer: (id, payload) => api.patch(`/offers/${id}`, payload), deleteOffer: (id) => api.delete(`/offers/${id}`),
  staff: () => api.get('/staff'), createStaff: (payload) => api.post('/staff', payload), updateStaff: (id, payload) => api.patch(`/staff/${id}`, payload), deleteStaff: (id) => api.delete(`/staff/${id}`),
  adminReviews: () => api.get('/reviews/admin'), approveReview: (id, isApproved) => api.patch(`/reviews/${id}/approve`, { isApproved }), deleteReview: (id) => api.delete(`/reviews/${id}`),
  messages: () => api.get('/contact'), settings: () => api.get('/settings'), updateSettings: (payload) => api.patch('/settings', payload),
};
export const unwrap = (res) => res.data?.data ?? res.data;
