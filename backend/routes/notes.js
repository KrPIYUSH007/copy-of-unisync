const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Note = require('../models/Note');
const { upload } = require('../middleware/upload');

// Create a new note
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const newNote = new Note({
      title: req.body.title,
      content: req.body.content,
      filePath: req.file ? req.file.path : null,
    });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete note by ID
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    if (note.filePath) fs.unlinkSync(note.filePath);
    await note.deleteOne();

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
