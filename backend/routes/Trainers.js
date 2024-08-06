const express = require('express');
const router = express.Router();
const Trainer = require('../models/AddTrainer');

router.use(express.json());

// Get all trainers
router.get('/', async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a trainer
router.delete('/:id', async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if (trainer) {
      res.json({ message: 'Trainer deleted successfully' });
    } else {
      res.status(404).json({ message: 'Trainer not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new trainer
router.post('/add', async (req, res) => {
  const trainer = new Trainer(req.body);
  try {
    const newTrainer = await trainer.save();
    res.status(201).json(newTrainer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Get the trainer by an ID and delete the value based on it 

// Get trainer by ID
router.get('/:id', async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (trainer) {
      res.json(trainer);
    } else {
      res.status(404).json({ message: 'Trainer not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Edit a trainer's details
router.patch('/:id/edit', async (req, res) => {
  try {
    const updatedTrainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTrainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    res.json(updatedTrainer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Assign a trainer to a project
router.patch('/:id/assign', async (req, res) => {
  const { projectName, timeSlot, startDate, endDate } = req.body;
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (trainer) {
      // Check if the project is already assigned
      if (!trainer.projects.includes(projectName)) {
        trainer.projects.push(projectName);
      }
      trainer.lastProjectEndDate = new Date(endDate);
      trainer.projectStartDate = new Date(startDate);
      trainer.available = new Date(startDate) > new Date();

      // Set break period after the end date
      const breakEndDate = new Date(endDate);
      const breakPeriod = parseInt(req.body.breakPeriod || 2); // Accept break period as days, default to 2
      breakEndDate.setDate(breakEndDate.getDate() + breakPeriod);
      trainer.onBreakUntil = breakEndDate;

      await trainer.save();
      res.json({ message: 'Trainer assigned successfully' });
    } else {
      res.status(404).json({ message: 'Trainer not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Check and update trainer availability
router.patch('/checkavailability', async (req, res) => {
  try {
    const trainers = await Trainer.find();
    const today = new Date();

    trainers.forEach(async (trainer) => {
      const projectEndDate = new Date(trainer.lastProjectEndDate);
      const projectStartDate = new Date(trainer.projectStartDate);
      const onBreakUntilDate = new Date(trainer.onBreakUntil);

      if (trainer.lastProjectEndDate && today >= projectStartDate && today <= projectEndDate) {
        trainer.available = false; // Trainer is on duty during the project period
      } else if (trainer.lastProjectEndDate && today >= onBreakUntilDate) {
        trainer.available = true; // Mark trainer as available after break period
        trainer.onBreakUntil = null; // Reset break period
      } else if (trainer.lastProjectEndDate && today < projectStartDate) {
        trainer.available = true; // Mark trainer as available before the project starts
      }
      await trainer.save();
    });

    res.json({ message: 'Trainer availability updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;