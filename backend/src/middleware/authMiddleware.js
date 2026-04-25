/**
 * File: backend/src/middleware/authMiddleware.js
 * Purpose: Protects admin-only API routes with JWT authentication.
 * Features: Reads Bearer token, verifies JWT, attaches admin user data to req.admin.
 * Used by: Admin routes for appointments, services, offers, staff, reviews, contact messages, and settings updates.
 * Future edits: Replace environment-based admin auth with database users here if needed later.
 */

import jwt from 'jsonwebtoken';

export const protectAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ message: 'Not authorized. Admin token missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden. Admin access required.' });
    }
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized. Invalid or expired token.' });
  }
};
