# Backend Deployment Guide

## Deploy to Railway
1. Go to railway.app
2. Deploy from GitHub repo
3. Add environment variables (DATABASE_URL, JWT_SECRET, FRONTEND_URL)
4. Deploy!

## Deploy to Render
1. Go to render.com
2. Create Web Service
3. Build: npm install && npm run prisma:generate && npm run build
4. Start: npm start
5. Add environment variables
