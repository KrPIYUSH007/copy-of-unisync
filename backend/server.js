
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');


const notesRouter = require('./routes/notes');
const marketplaceRouter = require('./routes/marketplace');


const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(helmet());
app.use(cors({ origin: true })); // adjust origin in production
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// API routes
app.use('/api/notes', notesRouter);
app.use('/api/marketplace', marketplaceRouter);


// Root
app.get('/', (req, res) => {
res.json({ message: 'UniSync Backend running' });
});


// Connect to MongoDB and start server
async function start() {
try {
const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('MONGODB_URI not set in .env');
await mongoose.connect(uri, { connectTimeoutMS: 10000 });
console.log('Connected to MongoDB');


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
} catch (err) {
console.error('Failed to start server:', err);
process.exit(1);
}
}


start();