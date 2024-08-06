const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const firebaseAdmin = require('../firebaseAdmin');

// Sign up route
router.post('/addadmin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin already exists in MongoDB
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).send({ message: 'Admin already exists' });
    }

    // Check if admin already exists in Firebase
    let userRecord;
    try {
      userRecord = await firebaseAdmin.auth().getUserByEmail(email);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        // User does not exist in Firebase, proceed to create
        userRecord = await firebaseAdmin.auth().createUser({
          email,
          password,
        });
      } else {
        throw error;
      }
    }

    if (userRecord) {
      // Save admin to MongoDB
      const user = new Admin({ email, password });
      await user.save();
      res.status(201).send({ message: 'Admin created successfully' });
    } else {
      res.status(500).send({ error: 'Failed to create admin in Firebase' });
    }
  } catch (err) {
    console.error('Add admin error:', err.message);
    res.status(400).send({ error: 'There was an error adding the admin' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await firebaseAdmin.auth().getUserByEmail(email);

    // Send email verification link
    await firebaseAdmin.auth().generateEmailVerificationLink(email);

    // Generate a JWT token for the session
    const token = jwt.sign({ email, password }, 'trainerapp');

    res.send({ message: 'Login successful. Verification email sent.', token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send({ error: 'Login failed. Please check your credentials and try again.' });
  }
});

module.exports = router;
