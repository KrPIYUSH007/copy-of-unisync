const mongoose = require('mongoose');


const NoteSchema = new mongoose.Schema({
title: { type: String, required: true },
description: { type: String },
filePath: { type: String }, // path on server (publicly served)
originalName: { type: String },
mimeType: { type: String },
size: { type: Number },
ownerId: { type: String }, // optional: link to user id
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Note', NoteSchema);