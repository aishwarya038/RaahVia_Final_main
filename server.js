/**
 * ====================================================
 * RaahVia Backend Server
 * ====================================================
 * 
 * Production-ready Express.js server for indoor navigation API
 * - Static navigation data only (no databases)
 * - RESTful API endpoints
 * - CORS enabled for Expo mobile clients
 * - Comprehensive error handling
 * 
 * Node.js 18+ required
 * Latest stable versions: Express 4.18, cors 2.8, helmet 7.1
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Import utilities
const { errorHandler, notFoundHandler } = require('./utils/errorHandler');

// Import routes
const apiRoutes = require('./routes/qr-api');

// ====================================================
// EXPRESS APP SETUP
// ====================================================

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ====================================================
// MIDDLEWARE
// ====================================================

// Security headers (helmet)
app.use(helmet());

// Logging
app.use(morgan('combined'));

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

/**
 * CORS Configuration
 * Allows Expo mobile apps and any HTTP origin
 * 
 * IMPORTANT: For production, specify exact origins:
 * origin: ['https://myapp.com', 'https://staging.myapp.com']
 */
app.use(cors({
  origin: '*', // Allow all origins for mobile development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
  maxAge: 86400, // 24 hours
}));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`\n[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ====================================================
// ROUTES
// ====================================================

/**
 * Root endpoint
 */
app.get('/', (req, res) => {
  res.json({
    success: true,
    service: 'RaahVia Backend API',
    version: '1.1.0',
    status: 'ONLINE',
    documentation: 'See /api/health for available endpoints',
  });
});

/**
 * API routes (all /api/* endpoints)
 */
app.use('/api', apiRoutes);

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'ONLINE',
    service: 'RaahVia Backend API',
    version: '1.1.0',
    environment: NODE_ENV,
    uptime: process.uptime(),
    memory: {
      rss: Math.round(process.memoryUsage().rss / 1024 / 1024) + 'MB',
      heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + 'MB',
    },
    timestamp: new Date().toISOString(),
  });
});

// ====================================================
// ERROR HANDLING
// ====================================================

// 404 handler (must be after all routes)
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

// ====================================================
// SERVER STARTUP
// ====================================================

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 RaahVia Backend Server Running');
  console.log('='.repeat(60));
  console.log(`\n📍 Environment: ${NODE_ENV}`);
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log(`💚 Health Check: http://localhost:${PORT}/health`);
  console.log('\n📱 Expo Mobile Client:');
  console.log(`   1. Find your PC IP: ipconfig (Windows) | ifconfig (Mac/Linux)`);
  console.log(`   2. Update api.js: http://YOUR_IP:${PORT}/api`);
  console.log(`   3. QR endpoint: http://YOUR_IP:${PORT}/api/qr/aud_entrance`);
  console.log('\n🔗 Available Endpoints:');
  console.log(`   GET  /api/qr/:qrCode              - Scan QR code`);
  console.log(`   GET  /api/destinations/:building  - Get destinations`);
  console.log(`   GET  /api/path/:destinationId     - Get navigation path`);
  console.log(`   GET  /health                      - Health check`);
  console.log('\n' + '='.repeat(60) + '\n');
});

// ====================================================
// GRACEFUL SHUTDOWN
// ====================================================

process.on('SIGTERM', () => {
  console.log('⚠️  SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n⚠️  SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

// Uncaught exception handler
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Unhandled rejection handler
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

module.exports = app;
