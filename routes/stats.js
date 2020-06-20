const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Stats = require('../models/stats');

router.get('/:userId', auth, (req, res, next) => {
  Stats.find({ 'userId': req.params.userId }).exec((err, stats) => {
    if (err) { return res.status(500).json({ msg: 'Error retrieving stats.' }); }
    if (stats.length === 0) { return res.status(404).json({ msg: 'No stats found for user.' }); }
    res.status(200).json({ msg: 'Success.', stats });
  });
});

router.post('/', auth, (req, res, next) => {
  const stats = new Stats({
    intervalsCorrect: req.body.intervalsCorrect,
    intervalsWrong: req.body.intervalsWrong,
    notesCorrect: req.body.noteCorrect,
    notesWrong: req.body.noteWrong,
    chordCorrect: req.body.chordCorrect,
    chordWrong: req.body.chordWrong,
    totIntCorrectToday: req.body.totIntCorrectToday,
    totNoteCorrectToday: req.body.totNoteCorrectToday,
    totChordCorrectToday: req.body.totChordCorrectToday,
    userId: req.body.userId
  });
  stats.save((err, result) => {
    if (err) { return res.status(500).json({ msg: 'Failed to create stats.' }); }
    return res.status(200).json({ msg: 'Success.', statsId: result._id });
  });
});

router.put('/', auth, (req, res, next) => {
  const stats = new Stats({
    intervalsCorrect: req.body.intervalsCorrect,
    intervalsWrong: req.body.intervalsWrong,
    notesCorrect: req.body.notesCorrect,
    notesWrong: req.body.notesWrong,
    chordCorrect: req.body.chordCorrect,
    chordWrong: req.body.chordWrong,
    totIntCorrectToday: req.body.totIntCorrectToday,
    totNoteCorrectToday: req.body.totNoteCorrectToday,
    totChordCorrectToday: req.body.totChordCorrectToday,
    userId: req.body.userId,
    _id: req.body.statsId
  });
  Stats.findByIdAndUpdate(req.body.statsId, stats, {}, (err, result) => {
    if (err) { return res.status(500).json({ msg: 'Failed to update stats.' }); }
    return res.status(200).json({ msg: 'Success.' });
  });
});

router.delete('/:id', auth, (req, res, next) => {
  Stats.findByIdAndRemove(req.params.id, err => {
    if (err) { return res.status(500).json({ msg: 'Failed to delete stats.' }); }
    return res.status(200).json({ msg: 'Success.' });
  });
});

module.exports = router;
