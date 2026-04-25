/**
 * File: backend/src/utils/validators.js
 * Purpose: Shared validation helpers for public forms and appointment requests.
 * Features: Email validation, phone validation, required field checking, and date helpers.
 * Used by: Appointment, review, and contact controllers.
 * Future edits: Update validation rules here if the salon wants stricter phone/email rules.
 */

export const isValidEmail = (email = '') => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim().toLowerCase());

export const isValidPhone = (phone = '') => {
  const cleaned = String(phone).replace(/[\s().-]/g, '');
  return /^\+?\d{10,15}$/.test(cleaned);
};

export const requireFields = (body, fields) => fields.filter((field) => body[field] === undefined || body[field] === null || String(body[field]).trim() === '');

export const normalizeDateOnly = (dateValue) => {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
};
