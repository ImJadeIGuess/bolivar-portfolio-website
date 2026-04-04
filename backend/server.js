/**
 * Portfolio Backend Server
 * Main entry point for the Express API server
 * 
 * @author Jade
 * @description REST API for portfolio contact form and projects
 */

// ===========================================
// IMPORTS
// ===========================================
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// Import routes
const contactRoutes = require('./routes/contactRoutes');
const projectRoutes = require('./routes/projectRoutes');

// Import error handler
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// ===========================================
// APP INITIALIZATION
// ===========================================
const app = express();

// ===========================================
// MIDDLEWARE
// ===========================================

// Security headers
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// HTTP logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: process.env.RATE_LIMIT_MAX || 100,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api/', limiter);

// ===========================================
// DATABASE CONNECTION WITH RETRY
// ===========================================
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Warning: ${error.message}`);
    console.warn('⚠️ Server is running, but database operations will fail until connection is restored.');
    
    // Retry connection after 10 seconds
    console.log('🔁 Retrying MongoDB connection in 10 seconds...');
    setTimeout(connectDB, 10000); // 10000ms = 10 seconds
  }
};

// Start the first connection attempt
connectDB();

// ===========================================
// ROUTES
// ===========================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running successfully! 🚀',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// API routes
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);

// ===========================================
// ERROR HANDLING
// ===========================================

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

// ===========================================
// START SERVER
// ===========================================
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`
  ===========================================
   🚀 Server running in ${process.env.NODE_ENV} mode
   🌐 Listening on port ${PORT}
   📅 Started at: ${new Date().toLocaleString()}
  ===========================================
  `);
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