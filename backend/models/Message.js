const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MarketplaceItem',
    required: true
  },
  senderName: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true
  },
  senderContact: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    maxlength: 1000,
    trim: true
  },
  isFromSeller: {
    type: Boolean,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  isRead: {
    type: Boolean,
    default: false
  }
});

// Index for performance
MessageSchema.index({ itemId: 1, timestamp: -1 });
MessageSchema.index({ timestamp: -1 });

module.exports = mongoose.model('Message', MessageSchema);