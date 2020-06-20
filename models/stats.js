const mongoose = require('mongoose');

const StatsSchema = new mongoose.Schema({
  intervalsCorrect: {
    'b2': {type: Number, required: true},
    '2': {type: Number, required: true},
    'b3': {type: Number, required: true},
    '3': {type: Number, required: true},
    '4': {type: Number, required: true},
    'b5': {type: Number, required: true},
    '5': {type: Number, required: true},
    'b6': {type: Number, required: true},
    '6': {type: Number, required: true},
    'b7': {type: Number, required: true},
    '7': {type: Number, required: true},
    '8': {type: Number, required: true}
  },
  intervalsWrong: {
    'b2': {type: Number, required: true},
    '2': {type: Number, required: true},
    'b3': {type: Number, required: true},
    '3': {type: Number, required: true},
    '4': {type: Number, required: true},
    'b5': {type: Number, required: true},
    '5': {type: Number, required: true},
    'b6': {type: Number, required: true},
    '6': {type: Number, required: true},
    'b7': {type: Number, required: true},
    '7': {type: Number, required: true},
    '8': {type: Number, required: true}
  },
  notesCorrect: {
    'A': {type: Number, required: true},
    'Bb': {type: Number, required: true},
    'B': {type: Number, required: true},
    'C': {type: Number, required: true},
    'Db': {type: Number, required: true},
    'D': {type: Number, required: true},
    'Eb': {type: Number, required: true},
    'E': {type: Number, required: true},
    'F': {type: Number, required: true},
    'Gb': {type: Number, required: true},
    'G': {type: Number, required: true},
    'Ab': {type: Number, required: true}
  },
  notesWrong: {
    'A': {type: Number, required: true},
    'Bb': {type: Number, required: true},
    'B': {type: Number, required: true},
    'C': {type: Number, required: true},
    'Db': {type: Number, required: true},
    'D': {type: Number, required: true},
    'Eb': {type: Number, required: true},
    'E': {type: Number, required: true},
    'F': {type: Number, required: true},
    'Gb': {type: Number, required: true},
    'G': {type: Number, required: true},
    'Ab': {type: Number, required: true}
  },
  chordCorrect: {type: Number, required: true},
  chordWrong: {type: Number, required: true},
  totIntCorrectToday: {type: Number, required: true},
  totNoteCorrectToday: {type: Number, required: true},
  totChordCorrectToday: {type: Number, required: true},
  userId: {type: mongoose.Schema.Types.ObjectId, required: true}
});

module.exports = mongoose.model('Stats', StatsSchema);
