/**
 * File: backend/src/server.js
 * Purpose: Main Express server entry point for Touch Threading and Brows Salon backend.
 * Features: Environment setup, MongoDB connection, security middleware, CORS, API routes, health check, and error handling.
 * Used by: npm run dev, npm start, Render deployment, and local backend development.
 * Future edits: Add new API route mounts here when the website grows.
 */

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { connectDB } from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import appointmentsRoutes from './routes/appointmentsRoutes.js';
import servicesRoutes from './routes/servicesRoutes.js';
import offersRoutes from './routes/offersRoutes.js';
import staffRoutes from './routes/staffRoutes.js';
import reviewsRoutes from './routes/reviewsRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(helmet());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: true, legacyHeaders: false }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Touch Threading and Brows Salon API' });
});

app.use('/api/admin', authRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/offers', offersRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/settings', settingsRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
