// routes/authRoutes.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';  // We will use this to create JWT tokens
import User from '../models/users.js';  // Assuming User model is already created

const router = express.Router();


router.post('/signup', async (req, res) => {
  const { username, password, secretCode } = req.body;

  try {
    // Verify the secret admin code
    if (secretCode !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ message: 'Invalid admin code' });
    }

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new admin user
    const newUser = new User({
      username,
      password,
      role: 'admin', // Assign the 'admin' role
    });

    await newUser.save();

    res.status(201).json({ message: 'Admin account created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/auth', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    console.log("User found:", user);

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    console.log("Entered password:", password);
    console.log("Stored hashed password:", user.password);

    const isValidPassword = await user.comparePassword(password);
    console.log("Password match:", isValidPassword);

    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, username: user.username, role:'admin' } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
