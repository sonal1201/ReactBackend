# Backend Deployment Guide

## Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account connected to Vercel
- MongoDB database (MongoDB Atlas recommended)
- Environment variables ready

### Step-by-Step Deployment

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin master
   ```

2. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your backend repository

3. **Configure Project**
   - Framework Preset: **Other**
   - Root Directory: `.` (leave as default)
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist` (leave as default)
   - Install Command: `npm install`

4. **Add Environment Variables**
   Go to Project Settings → Environment Variables and add:
   ```
   DATABASE_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_URL=your_frontend_url
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your API will be live at `https://your-project.vercel.app`

### Important Notes

- **MongoDB Atlas**: Make sure to whitelist Vercel's IP addresses (0.0.0.0/0 for all IPs)
- **Serverless Functions**: Vercel runs serverless functions with a max execution time (10s on free tier)
- **Cold Starts**: First request may be slower due to serverless cold starts
- **Logs**: View logs in Vercel dashboard under "Deployments" → Select deployment → "Logs"

### Testing Your Deployment

After deployment, test these endpoints:
- `https://your-project.vercel.app/` - Root endpoint
- `https://your-project.vercel.app/api/health` - Health check
- `https://your-project.vercel.app/api/auth/register` - Auth endpoint

### Updating Your Deployment

Vercel automatically deploys when you push to your main branch:
```bash
git add .
git commit -m "Update backend"
git push origin master
```

---

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
