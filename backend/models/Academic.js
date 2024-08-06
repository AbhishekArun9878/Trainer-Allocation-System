const mongoose = require('mongoose');

const academicSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true 
});

// Create the model
const Academic = mongoose.model('Academiclogins', academicSchema);

module.exports = Academic;