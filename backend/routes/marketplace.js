const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const MarketplaceItem = require('../models/MarketplaceItem');
const Message = require('../models/Message');
const { marketplaceUpload } = require('../middleware/upload');

// POST /items - Create new marketplace item
router.post('/items', marketplaceUpload.array('images', 4), async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      condition,
      sellerName,
      sellerContact,
      sellerInfo,
      location,
      category
    } = req.body;

    // Validation
    if (!title || !price || !sellerName || !sellerContact || !condition) {
      return res.status(400).json({
        success: false,
        error: 'Title, price, seller name, seller contact, and condition are required'
      });
    }

    const itemData = {
      title: title.trim(),
      description: description?.trim() || '',
      price: parseFloat(price),
      condition,
      sellerName: sellerName.trim(),
      sellerContact: sellerContact.trim(),
      sellerInfo: sellerInfo?.trim() || '',
      location: location?.trim() || '',
      category: category?.trim() || 'general'
    };

    // Add image paths if uploaded
    if (req.files && req.files.length > 0) {
      itemData.images = req.files.map(file => file.path);
    }

    const newItem = new MarketplaceItem(itemData);
    const savedItem = await newItem.save();

    res.status(201).json({
      success: true,
      data: savedItem
    });
  } catch (error) {
    console.error('Error creating marketplace item:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /items - Get all marketplace items with filtering and pagination
router.get('/items', async (req, res) => {
  try {
    const {
      category,
      condition,
      minPrice,
      maxPrice,
      search,
      limit = 20,
      page = 1
    } = req.query;

    // Build query
    const query = { isAvailable: true };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (condition && condition !== 'all') {
      query.condition = condition;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    if (search) {
      query.$text = { $search: search };
    }

    // Pagination
    const limitNum = parseInt(limit);
    const pageNum = parseInt(page);
    const skip = (pageNum - 1) * limitNum;

    // Execute query with sorting
    const items = await MarketplaceItem.find(query)
      .sort({ postedDate: -1 })
      .limit(limitNum)
      .skip(skip)
      .lean();

    // Get total count for pagination info
    const total = await MarketplaceItem.countDocuments(query);

    res.json({
      success: true,
      data: items,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Error fetching marketplace items:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /items/:id - Get single item details
router.get('/items/:id', async (req, res) => {
  try {
    const item = await MarketplaceItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      });
    }

    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    console.error('Error fetching marketplace item:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// PUT /items/:id - Update marketplace item
router.put('/items/:id', async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      condition,
      sellerName,
      sellerContact,
      sellerInfo,
      location,
      category
    } = req.body;

    // Find existing item
    const existingItem = await MarketplaceItem.findById(req.params.id);
    if (!existingItem) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      });
    }

    // Security check: verify seller contact matches
    if (existingItem.sellerContact !== sellerContact) {
      return res.status(403).json({
        success: false,
        error: 'Only the original seller can update this item'
      });
    }

    // Build update object with only provided fields
    const updateData = { lastUpdated: new Date() };

    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description?.trim() || '';
    if (price !== undefined) updateData.price = parseFloat(price);
    if (condition !== undefined) updateData.condition = condition;
    if (sellerName !== undefined) updateData.sellerName = sellerName.trim();
    if (sellerInfo !== undefined) updateData.sellerInfo = sellerInfo?.trim() || '';
    if (location !== undefined) updateData.location = location?.trim() || '';
    if (category !== undefined) updateData.category = category?.trim() || 'general';

    const updatedItem = await MarketplaceItem.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      data: updatedItem
    });
  } catch (error) {
    console.error('Error updating marketplace item:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// DELETE /items/:id - Delete marketplace item
router.delete('/items/:id', async (req, res) => {
  try {
    const { sellerContact } = req.body;

    if (!sellerContact) {
      return res.status(400).json({
        success: false,
        error: 'Seller contact is required for deletion'
      });
    }

    // Find existing item
    const existingItem = await MarketplaceItem.findById(req.params.id);
    if (!existingItem) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      });
    }

    // Security check: verify seller contact matches
    if (existingItem.sellerContact !== sellerContact) {
      return res.status(403).json({
        success: false,
        error: 'Only the original seller can delete this item'
      });
    }

    // Delete associated image files
    if (existingItem.images && existingItem.images.length > 0) {
      existingItem.images.forEach(imagePath => {
        try {
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        } catch (fileError) {
          console.warn('Failed to delete image file:', imagePath, fileError.message);
        }
      });
    }

    // Delete the item
    await MarketplaceItem.findByIdAndDelete(req.params.id);

    // Also delete associated messages
    await Message.deleteMany({ itemId: req.params.id });

    res.json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting marketplace item:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// PATCH /items/:id/status - Mark item as sold/unavailable
router.patch('/items/:id/status', async (req, res) => {
  try {
    const { isAvailable, sellerContact } = req.body;

    if (typeof isAvailable !== 'boolean' || !sellerContact) {
      return res.status(400).json({
        success: false,
        error: 'isAvailable (boolean) and sellerContact are required'
      });
    }

    // Find existing item
    const existingItem = await MarketplaceItem.findById(req.params.id);
    if (!existingItem) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      });
    }

    // Security check: verify seller contact matches
    if (existingItem.sellerContact !== sellerContact) {
      return res.status(403).json({
        success: false,
        error: 'Only the original seller can update this item status'
      });
    }

    const updatedItem = await MarketplaceItem.findByIdAndUpdate(
      req.params.id,
      { isAvailable, lastUpdated: new Date() },
      { new: true }
    );

    res.json({
      success: true,
      data: updatedItem
    });
  } catch (error) {
    console.error('Error updating item status:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST /items/:id/messages - Send message about item
router.post('/items/:id/messages', async (req, res) => {
  try {
    const { senderName, senderContact, message, isFromSeller = false } = req.body;

    // Validation
    if (!senderName || !senderContact || !message) {
      return res.status(400).json({
        success: false,
        error: 'Sender name, sender contact, and message are required'
      });
    }

    if (message.length > 1000) {
      return res.status(400).json({
        success: false,
        error: 'Message must be 1000 characters or less'
      });
    }

    // Verify item exists
    const item = await MarketplaceItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      });
    }

    // Create new message
    const newMessage = new Message({
      itemId: req.params.id,
      senderName: senderName.trim(),
      senderContact: senderContact.trim(),
      message: message.trim(),
      isFromSeller
    });

    const savedMessage = await newMessage.save();

    res.status(201).json({
      success: true,
      data: savedMessage
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /items/:id/messages - Get messages for item
router.get('/items/:id/messages', async (req, res) => {
  try {
    const { contact } = req.query;

    if (!contact) {
      return res.status(400).json({
        success: false,
        error: 'Seller contact is required to view messages'
      });
    }

    // Verify item exists and get seller contact
    const item = await MarketplaceItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      });
    }

    // Security check: only seller can view messages
    if (item.sellerContact !== contact) {
      return res.status(403).json({
        success: false,
        error: 'Only the seller can view messages for this item'
      });
    }

    // Get messages for the item
    const messages = await Message.find({ itemId: req.params.id })
      .sort({ timestamp: -1 })
      .lean();

    // Mark messages as read
    await Message.updateMany(
      { itemId: req.params.id, isRead: false },
      { isRead: true }
    );

    res.json({
      success: true,
      data: messages
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;