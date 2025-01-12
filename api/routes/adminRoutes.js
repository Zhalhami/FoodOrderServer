import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/admin', verifyToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access forbidden. Admins only.' });
  }

  res.json({ message: 'Welcome to the Admin section!' });
});

export default router;
