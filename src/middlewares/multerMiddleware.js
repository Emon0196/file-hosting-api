const multer = require('multer');

// Create multer memory storage to store the file in memory temporarily
const storage = multer.memoryStorage();  // Files will be in memory

// Create multer upload configuration with file size limit
const upload = multer({
  storage,  // Use memory storage
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB limit (can adjust as needed)
});

module.exports = upload.single('file'); // Accept a single file with the field name 'file'
