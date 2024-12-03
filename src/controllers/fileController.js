const cloudinary = require('../utils/cloudinary');
const File = require('../models/fileModel');
const { AppError } = require('../middlewares/errorMiddleware');
const streamifier = require('streamifier');  // Required to convert the buffer into a readable stream

exports.uploadFile = async (req, res, next) => {
  // Check if the file is available in the request
  if (!req.file) {
    return next(new AppError('No file uploaded', 400));
  }

  try {
    // Convert the buffer into a readable stream
    const stream = streamifier.createReadStream(req.file.buffer);

    // Upload file to Cloudinary using the upload_stream method
    const uploadResult = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },  // auto-detect file type (image, video, etc.)
      async (error, result) => {
        if (error) {
          return next(new AppError('Error uploading file to Cloudinary', 500));
        }

        // Log the result from Cloudinary
        console.log('Cloudinary Upload Result:', result);

        // Save the file metadata in the database
        const file = new File({
          filename: req.file.originalname,
          url: result.secure_url,  // Cloudinary URL
          size: req.file.size,
          type: req.file.mimetype,
        });

        // Save file metadata asynchronously
        await file.save();

        // Respond to the client
        res.status(201).json({
          success: true,
          message: 'File uploaded successfully',
          data: file,
        });
      }
    );

    // Pipe the stream to Cloudinary
    stream.pipe(uploadResult);
  } catch (error) {
    // Log the error to see more details
    console.error('Error in uploadFile:', error);

    // Handle errors
    return next(new AppError('Error uploading file to Cloudinary or saving metadata', 500));
  }
};


