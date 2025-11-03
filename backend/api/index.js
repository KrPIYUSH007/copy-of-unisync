// Vercel serverless function entry point
// This file adapts the Express server for Vercel's serverless environment

const app = require('../server');

// Export the Express app as a serverless function
module.exports = (req, res) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  // Forward the request to the Express app
  return app(req, res);
};