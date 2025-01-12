// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'yourSecretKey');
    req.user = decoded;  // Store the decoded token data (e.g., user id and role)
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

export default verifyToken;
