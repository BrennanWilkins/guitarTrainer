const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Goals = require('../models/goals');
const { body, validationResult } = require('express-validator');

router.get('/', auth, (req, res) => {
  Goals.findOne({ 'userId': req.userId }).exec((err, goals) => {
    if (err || goals.length === 0) { return res.sendStatus(500); }
    res.status(200).json({ goals });
  });
});

router.put('/', auth,
  [body('*').not().isEmpty().isNumeric()],
  (req, res) => {
    if (!validationResult(req).isEmpty()) { return res.sendStatus(500); }
    const goal = {
      intGoal: req.body.intGoal,
      noteGoal: req.body.noteGoal,
      chordGoal: req.body.chordGoal,
      userId: req.userId
    };
    Goals.findOneAndUpdate({ 'userId': req.userId }, { ...goal }, {}, (err, result) => {
      if (err) { return res.sendStatus(500); }
      res.sendStatus(200);
    });
});

module.exports = router;
