const express = require('express');
const router = express.Router();
const AddTrainer = require('../models/AddTrainer');

router.use(express.json());

router.post('/addtrainer', async (req, res) => {
  try {
    const { name, verticals, projects, skills, dateofjoining } = req.body;

    const newTrainer = new AddTrainer({
      name,
      verticals,
      projects,
      skills,
      dateofjoining
    });

    await newTrainer.save();

    res.status(201).json({ message: 'Trainer added successfully!', trainer: newTrainer });
  } catch (error) {
    console.error('Error adding trainer:', error);
    res.status(500).json({ message: 'Error adding trainer', error });
  }
});

//Route to get all trainers
router.get('/all', async (req, res) => {
  try {
    const trainers = await AddTrainer.find();
    res.status(200).json(trainers);
  } catch (error) {
    console.error('Error fetching trainers:', error);
    res.status(500).json({ message: 'Error fetching trainers', error });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const trainer = await AddTrainer.findOne({ email, password });
    if (!trainer) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.status(200).json({ message: 'Login successful', name: trainer.name });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging', error });
  }
});

module.exports = router;