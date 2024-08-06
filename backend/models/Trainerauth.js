const mongoose = require('mongoose');

// Define the TrainerAuth schema
const trainerAuthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true],
  },
  email: {
    type: String,
    required: [true],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8],
  },
});

// Create the TrainerAuth model
const TrainerAuth = mongoose.model('TrainerAuth', trainerAuthSchema);

module.exports = TrainerAuth;

