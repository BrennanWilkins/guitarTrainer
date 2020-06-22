const mongoose = require('mongoose');

const GoalsSchema = new mongoose.Schema({
  intGoal: {type: Number, required: true},
  chordGoal: {type: Number, required: true},
  noteGoal: {type: Number, required: true},
  userId: {type: mongoose.Schema.Types.ObjectId, required: true}
});

module.exports = mongoose.model('Goals', GoalsSchema);
