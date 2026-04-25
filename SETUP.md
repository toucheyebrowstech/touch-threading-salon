# Setup Guide

## Requirements

- Node.js 18+
- npm
- MongoDB Atlas or local MongoDB
- VS Code or another code editor

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://your-user:your-password@your-cluster.mongodb.net/touch-threading-salon
JWT_SECRET=make-this-long-random-and-private
ADMIN_EMAIL=owner@touchthreading.com
ADMIN_PASSWORD=replace-with-real-password
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Seed database:

```bash
npm run seed
```

Start backend:

```bash
npm run dev
```

Check:

```txt
http://localhost:5000/api/health
```

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

Open:

```txt
http://localhost:5173
```

Admin:

```txt
http://localhost:5173/admin/login
```

## Seed Data Included

The seed script creates services, offers, staff, business settings, and starter approved reviews.

Do not run seed on production after real customer data exists unless you intentionally want to reset seeded collections.
