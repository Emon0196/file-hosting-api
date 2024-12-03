const express = require('express');
const { uploadFile } = require('../controllers/fileController');
const upload = require('../middlewares/multerMiddleware');
const authenticate = require('../middlewares/authMiddleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

// Protected file upload route
router.post('/upload', authenticate, upload, asyncHandler(uploadFile));

module.exports = router;
