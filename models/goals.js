const mongoose = require('mongoose');

const GoalsSchema = new mongoose.Schema({
  intGoal: {type: String, required: true},
  chordGoal: {type: String, required: true},
  noteGoal: {type: String, required: true},
  date: {type: String, required: true},
  userId: {type: mongoose.Schema.Types.ObjectId, required: true}
});

module.exports = mongoose.model('Goals', GoalsSchema);
