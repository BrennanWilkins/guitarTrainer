const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Stats = require('../models/stats');
const { body, validationResult } = require('express-validator');

router.get('/', auth, (req, res) => {
  Stats.findOne({ 'userId': req.userId }).exec((err, stats) => {
    if (err || stats.length === 0) { return res.sendStatus(500); }
    res.status(200).json({ stats });
  });
});

router.put('/', auth,
  [body('totCorrect').isNumeric(),
  body('totWrong').isNumeric(),
  body('totChordCorrectToday').isNumeric(),
  body('totIntCorrectToday').isNumeric(),
  body('totNoteCorrectToday').isNumeric(),
  body('chordCorrect').isNumeric(),
  body('chordWrong').isNumeric(),
  body('intervalsCorrect.*').isNumeric(),
  body('intervalsWrong.*').isNumeric(),
  body('notesCorrect.*').isNumeric(),
  body('notesWrong.*').isNumeric(),
  body('lastPlayed').not().isEmpty().escape()],
  (req, res) => {
    if (!validationResult(req).isEmpty()) { return res.sendStatus(500); }
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
      if (err) { return res.sendStatus(500); }
      res.sendStatus(200);
    });
});

module.exports = router;
