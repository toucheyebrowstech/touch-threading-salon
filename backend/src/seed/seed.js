/**
 * File: backend/src/seed/seed.js
 * Purpose: Seeds MongoDB with default services, offers, staff, approved reviews, and business settings.
 * Features: Clears old seedable records, inserts salon menu/pricing, creates example workers, and stores default hours.
 * Used by: npm run seed inside backend/ after MongoDB .env is configured.
 * Future edits: Update prices, offers, staff names, phone, email, socials, and business hours here for launch.
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Service from '../models/Service.js';
import Offer from '../models/Offer.js';
import Staff from '../models/Staff.js';
import Review from '../models/Review.js';
import BusinessSettings from '../models/BusinessSettings.js';
import { defaultHours } from '../controllers/settingsController.js';

dotenv.config();

const services = [
  { category: 'Threading', name: 'Eyebrow Threading', price: 12, durationMinutes: 15, description: 'Clean, precise eyebrow shaping with gentle threading.', displayOrder: 1 },
  { category: 'Threading', name: 'Upper Lip', price: 7, durationMinutes: 10, description: 'Quick threading for smooth upper lip grooming.', displayOrder: 2 },
  { category: 'Threading', name: 'Chin', price: 8, durationMinutes: 10, description: 'Detailed chin threading for a smooth finish.', displayOrder: 3 },
  { category: 'Threading', name: 'Forehead', price: 8, durationMinutes: 10, description: 'Forehead cleanup for a polished look.', displayOrder: 4 },
  { category: 'Threading', name: 'Sideburns', price: 10, durationMinutes: 10, description: 'Sideburn threading for clean facial framing.', displayOrder: 5 },
  { category: 'Threading', name: 'Neck', price: 10, durationMinutes: 10, description: 'Neck threading for a tidy hairline and finish.', displayOrder: 6 },
  { category: 'Threading', name: 'Full Face Threading', price: 35, durationMinutes: 35, description: 'Complete face threading for smooth, fresh skin.', displayOrder: 7 },
  { category: 'Brow Services', name: 'Brow Tinting', price: 20, durationMinutes: 20, description: 'Soft brow tint to enhance natural shape and color.', displayOrder: 8 },
  { category: 'Brow Services', name: 'Brow Lamination', price: 55, durationMinutes: 45, description: 'Fuller, lifted brows with a sleek laminated finish.', displayOrder: 9 },
  { category: 'Brow Services', name: 'Brow Shaping + Tint', price: 30, durationMinutes: 30, description: 'Precise shaping paired with natural-looking brow tint.', displayOrder: 10 },
  { category: 'Brow Services', name: 'Brow Lamination + Tint', price: 70, durationMinutes: 60, description: 'Lifted brows with tint for a complete brow refresh.', displayOrder: 11 },
  { category: 'Lash Services', name: 'Lash Tint', price: 20, durationMinutes: 20, description: 'Darkens natural lashes for a mascara-like look.', displayOrder: 12 },
  { category: 'Lash Services', name: 'Lash Lift', price: 60, durationMinutes: 50, description: 'Natural lash curl and lift with no extensions needed.', displayOrder: 13 },
  { category: 'Lash Services', name: 'Lash Lift + Tint', price: 75, durationMinutes: 60, description: 'Lifted and tinted lashes for a bright, open-eye look.', displayOrder: 14 },
  { category: 'Lash Services', name: 'Cluster/Temporary Eyelash Extensions', price: 35, durationMinutes: 35, description: 'Temporary lash fullness for events and everyday glam.', displayOrder: 15 },
  { category: 'Waxing', name: 'Upper Lip Wax', price: 8, durationMinutes: 10, description: 'Fast waxing option for upper lip smoothness.', displayOrder: 16 },
  { category: 'Waxing', name: 'Chin Wax', price: 10, durationMinutes: 10, description: 'Gentle chin waxing for a clean finish.', displayOrder: 17 },
  { category: 'Waxing', name: 'Underarms Wax', price: 20, durationMinutes: 20, description: 'Smooth underarm waxing with clean salon care.', displayOrder: 18 },
  { category: 'Waxing', name: 'Arms Wax', price: 35, durationMinutes: 35, description: 'Arm waxing for soft, smooth skin.', displayOrder: 19 },
  { category: 'Waxing', name: 'Legs Wax', price: 55, durationMinutes: 50, description: 'Leg waxing for longer-lasting smoothness.', displayOrder: 20 },
  { category: 'Waxing', name: 'Face Waxing', price: 35, durationMinutes: 35, description: 'Full facial waxing for a smooth, fresh look.', displayOrder: 21 },
  { category: 'Facials and Skincare', name: 'Mini Facial', price: 45, durationMinutes: 30, description: 'Quick glow facial for refreshed skin.', displayOrder: 22 },
  { category: 'Facials and Skincare', name: 'Hydrating Facial', price: 65, durationMinutes: 45, description: 'Moisture-focused facial for soft, hydrated skin.', displayOrder: 23 },
  { category: 'Facials and Skincare', name: 'Deep Cleansing Facial', price: 75, durationMinutes: 60, description: 'Deep cleanse facial for pores, texture, and clarity.', displayOrder: 24 },
  { category: 'Facials and Skincare', name: 'Brightening Facial', price: 80, durationMinutes: 60, description: 'Glow-focused facial to refresh dull-looking skin.', displayOrder: 25 },
  { category: 'Facials and Skincare', name: 'Light Chemical Peel', price: 90, durationMinutes: 60, description: 'Gentle peel option for smoother, brighter skin.', displayOrder: 26 }
];

const offers = [
  { title: 'First Visit Brow Welcome', badge: 'First-Time Customer', discountText: 'Special discount', description: 'New customers receive a special discount on eyebrow threading.', displayOrder: 1 },
  { title: 'Brow + Upper Lip Combo', badge: 'Combo Package', discountText: 'Bundle savings', description: 'Save when you book eyebrow threading and upper lip together.', displayOrder: 2 },
  { title: 'Full Face Threading Package', badge: 'Popular Package', discountText: 'Fresh face deal', description: 'A clean, smooth full-face threading package for regular grooming.', displayOrder: 3 },
  { title: 'Lash Lift + Brow Tint Package', badge: 'Beauty Bundle', discountText: 'Premium combo', description: 'Lift your lashes and define your brows in one appointment.', displayOrder: 4 },
  { title: 'Buy 5 Brow Visits, Get 1 Free', badge: 'Loyalty Reward', discountText: '6th visit free', description: 'Perfect for customers who return every 2-3 weeks for brow maintenance.', displayOrder: 5 },
  { title: 'Refer a Friend', badge: 'Referral Discount', discountText: 'Both save', description: 'Refer a friend and both of you receive a discount on your next visit.', displayOrder: 6 }
];

const staff = [
  { name: 'Owner / Brow Specialist', role: 'Owner & Brow Specialist', specialties: ['Eyebrow Threading', 'Brow Shaping', 'Brow Tinting'], workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], bio: 'Experienced brow artist focused on clean shaping, comfort, and repeat-customer care.', imageUrl: '', displayOrder: 1 },
  { name: 'Threading Specialist', role: 'Threading Specialist', specialties: ['Full Face Threading', 'Upper Lip', 'Chin', 'Sideburns'], workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], bio: 'Friendly threading specialist for fast, detailed facial grooming.', imageUrl: '', displayOrder: 2 },
  { name: 'Lash & Skincare Specialist', role: 'Lash & Skincare Specialist', specialties: ['Lash Lift', 'Lash Tint', 'Facials', 'Skincare'], workingDays: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], bio: 'Beauty specialist for lashes, facials, and soft skincare treatments.', imageUrl: '', displayOrder: 3 }
];

const reviews = [
  { customerName: 'Ariana M.', rating: 5, message: 'My brows looked clean and natural. Fast service and very friendly staff.', serviceName: 'Eyebrow Threading', isApproved: true },
  { customerName: 'Nisha P.', rating: 5, message: 'The salon is clean, warm, and easy to visit. I will definitely come back.', serviceName: 'Full Face Threading', isApproved: true },
  { customerName: 'Melissa R.', rating: 5, message: 'Loved my lash lift and brow tint combo. The results looked beautiful.', serviceName: 'Lash Lift + Tint', isApproved: true }
];

const settings = {
  singletonKey: 'main',
  businessName: 'Touch Threading and Brows Salon',
  tagline: 'Perfect Brows. Smooth Skin. Effortless Beauty.',
  address: '2150 N Josey Ln, Carrollton, Texas #109',
  phone: '(000) 000-0000',
  email: 'hello@touchthreading.com',
  mapEmbedUrl: '',
  socialLinks: { instagram: '#', facebook: '#', tiktok: '#', yelp: '#' },
  hours: defaultHours,
  slotIntervalMinutes: 15,
  defaultServiceDurationMinutes: 15,
  walkInsMessage: 'Walk-ins are welcome, but booking online helps you get served faster.',
  cancellationNote: 'Please call ahead if you need to cancel or reschedule your appointment.'
};

const runSeed = async () => {
  try {
    await connectDB();
    await Promise.all([
      Service.deleteMany({}),
      Offer.deleteMany({}),
      Staff.deleteMany({}),
      Review.deleteMany({}),
      BusinessSettings.deleteMany({})
    ]);

    await Service.insertMany(services);
    await Offer.insertMany(offers);
    await Staff.insertMany(staff);
    await Review.insertMany(reviews);
    await BusinessSettings.create(settings);

    console.log('✅ Seed data inserted successfully.');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

runSeed();
