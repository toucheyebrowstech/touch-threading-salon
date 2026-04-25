# Deployment Guide

Recommended deployment:

- Backend: Render
- Frontend: Vercel
- Database: MongoDB Atlas

## Backend on Render

1. Push project to GitHub.
2. Create a new Render Web Service.
3. Root directory: `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_long_random_secret
ADMIN_EMAIL=owner@touchthreading.com
ADMIN_PASSWORD=your_secure_admin_password
CLIENT_URL=https://your-vercel-domain.vercel.app
NODE_ENV=production
```

Health check:

```txt
https://your-render-service.onrender.com/api/health
```

## Production Seed

For the first setup only, run `npm run seed` from Render Shell if available. Do not keep seed running automatically in production.

## Frontend on Vercel

1. Import the GitHub repo in Vercel.
2. Root directory: `frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Environment variable:

```env
VITE_API_URL=https://your-render-service.onrender.com/api
```

## CORS

After Vercel deployment, update Render backend:

```env
CLIENT_URL=https://your-vercel-domain.vercel.app
```

Redeploy backend after changing this.
