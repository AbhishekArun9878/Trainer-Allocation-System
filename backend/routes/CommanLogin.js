const express = require('express');
const TrainerAuth = require('../models/Trainerauth');
const router = express.Router();

router.use(express.json());

// router.post('/signup', async (req, res) => {
//     try {
//       const { name, email, password } = req.body;
  
//       // Check if the trainer already exists
//       const existingTrainer = await TrainerAuth.findOne({ email });
//       if (existingTrainer) {
//         return res.status(400).send({ message: 'Trainer already exists' }); 
//       }
//       // Create a new trainer
//       const newTrainer = new TrainerAuth({ name, email, password });
//       await newTrainer.save();
//       res.status(201).send({ message: 'Trainer created successfully' });
//     } catch (error) {
//       res.status(400).send({ message: 'Error creating trainer', error });
//     }
//   });

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const trainer = await TrainerAuth.findOne({ email, password });
      if (!trainer) {
        return res.status(400).send({ message: 'Invalid email or password' });
      }
      res.send({ message: 'Login successful' });
    } catch (error) {
      res.status(400).send(error);
    }
  });
  module.exports = router;