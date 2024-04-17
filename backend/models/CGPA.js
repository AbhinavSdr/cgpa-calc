// CGPA.js
const mongoose = require('mongoose');

const cgpaSchema = new mongoose.Schema({
  semesters: {
    type: [Number],
    required: true,
  },
  cgpa: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('CGPA', cgpaSchema);
