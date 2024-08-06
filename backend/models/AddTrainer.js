const mongoose = require('mongoose');

const addTrainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  verticals: { type: String, required: true },
  projects: { type: [String], required: true },
  skills: { type: [String], required: true},
  dateofjoining:{type: Date}
});

const AddTrainer = mongoose.model('AddTrainer', addTrainerSchema);

module.exports = AddTrainer;