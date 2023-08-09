const mongoose = require('mongoose');

const Students = new mongoose.Schema({
  student_no: {
    type: Number,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  birth_date: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  midterm: {
    type: String,
  },
  final: {
    type: String,
  },
  homework: {
    type: String,
  },
});

module.exports = mongoose.model('Students', Students);
