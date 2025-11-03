const mongoose = require('mongoose');

const MarketplaceItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true
  },
  description: {
    type: String,
    maxlength: 500,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 99999
  },
  category: {
    type: String,
    default: 'general',
    enum: ['general', 'electronics', 'books', 'furniture', 'clothing', 'sports', 'calculators', 'other'],
    trim: true
  },
  condition: {
    type: String,
    required: true,
    enum: ['new', 'like-new', 'good', 'fair', 'poor']
  },
  images: [{
    type: String,
    trim: true
  }],
  sellerName: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true
  },
  sellerContact: {
    type: String,
    required: true,
    trim: true
  },
  sellerInfo: {
    type: String,
    maxlength: 200,
    trim: true
  },
  location: {
    type: String,
    maxlength: 100,
    trim: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  postedDate: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Index for performance
MarketplaceItemSchema.index({ postedDate: -1 });
MarketplaceItemSchema.index({ isAvailable: 1 });
MarketplaceItemSchema.index({ category: 1 });
MarketplaceItemSchema.index({ price: 1 });
MarketplaceItemSchema.index({ title: 'text', description: 'text' });

// Update lastUpdated on save
MarketplaceItemSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

module.exports = mongoose.model('MarketplaceItem', MarketplaceItemSchema);