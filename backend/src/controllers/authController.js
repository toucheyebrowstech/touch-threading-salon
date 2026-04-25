/**
 * File: backend/src/controllers/authController.js
 * Purpose: Handles owner/admin login and admin profile verification.
 * Features: Environment-variable admin login, bcrypt/plain password support, JWT issuing, and /me response.
 * Used by: routes/authRoutes.js and admin dashboard login flow.
 * Future edits: Move admin users into MongoDB here if multiple admin accounts are needed.
 */

import bcrypt from 'bcryptjs';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateToken } from '../utils/generateToken.js';

export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return res.status(500).json({ message: 'Admin credentials are not configured on the server.' });
  }

  const emailMatches = String(email).toLowerCase() === String(adminEmail).toLowerCase();
  const passwordMatches = adminPassword.startsWith('$2')
    ? await bcrypt.compare(password, adminPassword)
    : password === adminPassword;

  if (!emailMatches || !passwordMatches) {
    return res.status(401).json({ message: 'Invalid admin email or password.' });
  }

  const token = generateToken({ email: adminEmail, role: 'admin' });
  res.json({ token, admin: { email: adminEmail, role: 'admin' } });
});

export const getAdminMe = asyncHandler(async (req, res) => {
  res.json({ admin: { email: req.admin.email, role: req.admin.role } });
});
