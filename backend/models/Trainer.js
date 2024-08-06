const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  vertical: { type: String, required: true },
  projects: { type: [String], required: true },
  lastProjectEndDate: { type: Date },
  projectStartDate: { type: Date },
  available: { type: Boolean, default: true },
  onBreakUntil: { type: Date }
});

module.exports = mongoose.model('Trainer', trainerSchema);
