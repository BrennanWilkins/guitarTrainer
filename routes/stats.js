const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Stats = require('../models/stats');

router.get('/', auth, (req, res, next) => {
  Stats.findOne({ 'userId': req.userId }).exec((err, stats) => {
    if (err) { return res.status(500).json({ msg: 'Error retrieving stats.' }); }
    if (stats.length === 0) { return res.status(404).json({ msg: 'No stats found for user.' }); }
    res.status(200).json({ msg: 'Success.', stats });
  });
});

router.put('/', auth, (req, res, next) => {
  const stats = {
    intervalsCorrect: { ...req.body.intervalsCorrect },
    intervalsWrong: { ...req.body.intervalsWrong},
    notesCorrect: { ...req.body.notesCorrect},
    notesWrong: { ...req.body.notesWrong},
    chordCorrect: req.body.chordCorrect,
    chordWrong: req.body.chordWrong,
    totIntCorrectToday: req.body.totIntCorrectToday,
    totNoteCorrectToday: req.body.totNoteCorrectToday,
    totChordCorrectToday: req.body.totChordCorrectToday,
    lastPlayed: req.body.lastPlayed
  };
  Stats.findOneAndUpdate({ 'userId': req.userId }, { ...stats }, {}, (err, result) => {
    if (err) { return res.status(500).json({ msg: 'Failed to update stats.' }); }
    return res.status(200).json({ msg: 'Success.' });
  });
});

module.exports = router;
