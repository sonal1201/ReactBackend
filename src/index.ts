import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';

const app = express();
const PORT = process.env.PORT || 5000;

const frontendUrl = process.env.FRONTEND_URL?.replace(/\/$/, '');

const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? [
        frontendUrl,
        'https://cipher-studio-xi.vercel.app'
      ].filter(Boolean)
    : [
        'http://localhost:5173',
        'http://localhost:3000'
      ];

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(allowed => origin?.startsWith(allowed))) {
      return callback(null, true);
    }
    console.error('⛔ Blocked by CORS:', origin);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'CipherStudio API is running'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'CipherStudio Backend API',
    version: '1.0.0'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
  console.log(`🌍 NODE_ENV: ${process.env.NODE_ENV}`);
  console.log('✅ Allowed Origins:', allowedOrigins);
});

export default app;
