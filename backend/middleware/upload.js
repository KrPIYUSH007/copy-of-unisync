const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');


// Storage configuration - files saved to /uploads with unique names
const storage = multer.diskStorage({
destination: function (req, file, cb) {
const uploadDir = path.join(__dirname, '..', 'uploads');
// Create directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
fs.mkdirSync(uploadDir, { recursive: true });
}
cb(null, uploadDir);
},
filename: function (req, file, cb) {
const ext = path.extname(file.originalname);
const filename = uuidv4() + ext;
cb(null, filename);
}
});


// File filter - allow images and pdfs and docs
function fileFilter(req, file, cb) {
const allowed = /jpeg|jpg|png|gif|webp|pdf|doc|docx/;
const ext = path.extname(file.originalname).toLowerCase();
if (allowed.test(ext)) {
cb(null, true);
} else {
cb(new Error('Only images (jpg, png, gif, webp), pdf and doc files are allowed'), false);
}
}


const upload = multer({
storage,
limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
fileFilter
});


// Specialized upload middleware for marketplace images (multiple files)
const marketplaceUpload = multer({
storage: multer.diskStorage({
destination: function (req, file, cb) {
const uploadDir = path.join(__dirname, '..', 'uploads', 'marketplace');
// Create marketplace directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
fs.mkdirSync(uploadDir, { recursive: true });
}
cb(null, uploadDir);
},
filename: function (req, file, cb) {
const ext = path.extname(file.originalname);
const filename = uuidv4() + ext;
cb(null, filename);
}
}),
fileFilter: function (req, file, cb) {
// For marketplace, only allow images
const allowed = /jpeg|jpg|png|gif|webp/;
const ext = path.extname(file.originalname).toLowerCase();
if (allowed.test(ext)) {
cb(null, true);
} else {
cb(new Error('Only image files (jpg, png, gif, webp) are allowed for marketplace items'), false);
}
},
limits: {
fileSize: 5 * 1024 * 1024, // 5MB per image
files: 4 // Maximum 4 images
}
});


module.exports = { upload, marketplaceUpload };