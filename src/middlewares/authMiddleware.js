const jwt = require('jsonwebtoken');
const { AppError } = require('./errorMiddleware');

module.exports = (req, res, next) => {
  // Get the Authorization header
  const authHeader = req.headers.authorization;

  // Check if the Authorization header exists and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Authorization header is missing or invalid', 401));
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(' ')[1];

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return next(new AppError('Invalid or expired token', 401));
  }
};

