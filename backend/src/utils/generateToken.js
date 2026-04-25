/**
 * File: backend/src/utils/generateToken.js
 * Purpose: Creates JWT tokens for authenticated salon admin sessions.
 * Features: Signs admin email and role into a 7-day token.
 * Used by: controllers/authController.js.
 * Future edits: Change token expiration or payload fields here.
 */

import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is missing from environment variables.');
  }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};
