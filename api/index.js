// Vercel serverless function entry point
// This file handles all API requests for the marketplace

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Import routes
const marketplaceRouter = require('../backend/routes/marketplace');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// API routes
app.use('/marketplace', marketplaceRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Marketplace API is running' });
});

// Root
app.get('/', (req, res) => {
  res.json({ message: 'UniSync Marketplace API' });
});

// MongoDB connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.log('MONGODB_URI not found, running without database');
      return;
    }

    await mongoose.connect(uri, {
      connectTimeoutMS: 10000,
      maxPoolSize: 10
    });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Connect to database before handling requests
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('API Error:', error);
  res.status(error.status || 500).json({
    success: false,
    error: error.message || 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Export for Vercel
module.exports = app;