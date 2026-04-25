# Touch Threading and Brows Salon Website

A complete full-stack salon website for **Touch Threading and Brows Salon** at **2150 N Josey Ln, Carrollton, Texas #109**.

Includes a customer-facing React + Vite website, admin dashboard at `/admin`, Node/Express backend, MongoDB/Mongoose models, JWT admin auth, appointment booking, availability rules, reviews, contact messages, editable services/offers/staff/settings, and seed data.

## Project Structure

```txt
touch-threading-salon-final/
  backend/
    src/config
    src/controllers
    src/middleware
    src/models
    src/routes
    src/seed
    src/utils
    src/server.js
    package.json
    .env.example
  frontend/
    src/admin
    src/api
    src/components
    src/data
    src/hooks
    src/pages
    src/styles
    src/utils
    src/App.jsx
    src/main.jsx
    package.json
    .env.example
  README.md
  SETUP.md
  DEPLOYMENT.md
  FINAL_BUG_CHECK.md
```

## Run Locally

Backend:

```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

Frontend:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Open:

```txt
Public website: http://localhost:5173
Admin login:    http://localhost:5173/admin/login
Backend API:    http://localhost:5000/api/health
```

## Environment Variables

Backend `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=use-a-long-random-secret
ADMIN_EMAIL=owner@touchthreading.com
ADMIN_PASSWORD=change-this-password
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Frontend `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Public Pages

- `/` Home
- `/services` Services and prices
- `/offers` Specials
- `/book` Appointment booking
- `/staff` Workers
- `/about` Salon story
- `/gallery` Gallery placeholders
- `/reviews` Testimonials and review form
- `/contact` Contact, hours, map placeholder

## Admin Pages

- `/admin/login` Admin login
- `/admin` Overview
- `/admin/appointments` Manage appointments
- `/admin/services` Manage services/prices
- `/admin/offers` Manage offers
- `/admin/staff` Manage workers
- `/admin/reviews` Approve/hide/delete reviews
- `/admin/messages` View contact messages
- `/admin/settings` Edit hours/address/social/contact info

## What To Replace Before Launch

Replace placeholder phone, email, social links, Google Maps embed, staff photos, gallery images, production admin password, and final domain.
