const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


// Storage configuration - files saved to /uploads with unique names
const storage = multer.diskStorage({
destination: function (req, file, cb) {
cb(null, path.join(__dirname, '..', 'uploads'));
},
filename: function (req, file, cb) {
const ext = path.extname(file.originalname);
const filename = uuidv4() + ext;
cb(null, filename);
}
});


// File filter - allow images and pdfs and docs
function fileFilter(req, file, cb) {
const allowed = /jpeg|jpg|png|gif|pdf|doc|docx/;
const ext = path.extname(file.originalname).toLowerCase();
if (allowed.test(ext)) {
cb(null, true);
} else {
cb(new Error('Only images, pdf and doc files are allowed'), false);
}
}


const upload = multer({
storage,
limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
fileFilter
});


module.exports = upload;