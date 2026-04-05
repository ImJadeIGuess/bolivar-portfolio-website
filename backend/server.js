/**
 * Portfolio Backend Server (Render-Optimized)
 * Main entry point for the Express API server
 */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const contactRoutes = require('./routes/contactRoutes');
const projectRoutes = require('./routes/projectRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();

// ==================== MIDDLEWARE ====================

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Rate limiting
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX || 100,
  message: { success: false, message: 'Too many requests, try again later.' }
}));

// ==================== ROUTES ====================

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running! 🚀',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);

app.use(notFound);
app.use(errorHandler);

// ==================== DATABASE ====================

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.warn(`⚠️ MongoDB Connection Failed: ${err.message}`);
    // Retry after 10s without blocking server start
    setTimeout(connectDB, 10000);
  }
};

// ==================== START SERVER ====================

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server is live on port ${PORT} in ${process.env.NODE_ENV} mode`);
  // Start DB connection in parallel (non-blocking)
  connectDB();
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(`❌ Uncaught Exception: ${err.message}`);
  process.exit(1);
});

module.exports = app;
