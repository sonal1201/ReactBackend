# CipherStudio Backend API

Express.js + Prisma + MongoDB backend for CipherStudio IDE.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and add your:
- `DATABASE_URL` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `FRONTEND_URL` - Your frontend URL (for CORS)

### 3. Generate Prisma Client

```bash
npm run prisma:generate
```

### 4. Push Database Schema

```bash
npm run prisma:push
```

### 5. Run Development Server

```bash
npm run dev
```

Server will start on `http://localhost:5000`

---

## 📡 API Endpoints

### Authentication

- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - Login user  
- **GET** `/api/auth/me` - Get current user (requires auth)

### Projects

- **GET** `/api/projects` - Get all user projects (requires auth)
- **GET** `/api/projects/:id` - Get single project (requires auth)
- **POST** `/api/projects` - Create new project (requires auth)
- **PUT** `/api/projects/:id` - Update project (requires auth)
- **DELETE** `/api/projects/:id` - Delete project (requires auth)

### Health

- **GET** `/api/health` - Health check

---

## 🏗️ Production Build

```bash
npm run build
npm start
```

---

## 📦 Deploy to Railway/Render

### Railway

1. Connect your GitHub repo
2. Select `backend` folder as root directory
3. Add environment variables
4. Deploy!

### Render

1. Create new Web Service
2. Connect GitHub repo
3. Set root directory: `backend`
4. Build command: `npm install && npm run prisma:generate`
5. Start command: `npm start`
6. Add environment variables
7. Deploy!

---

## 🛠️ Tech Stack

- **Express.js** - Web framework
- **Prisma** - ORM
- **MongoDB** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **TypeScript** - Type safety

