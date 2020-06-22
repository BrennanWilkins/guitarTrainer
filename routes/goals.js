const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Goals = require('../models/goals');

router.get('/', auth, (req, res, next) => {
  Goals.findOne({ 'userId': req.userId }).exec((err, goals) => {
    if (err) { return res.status(500).json({ msg: 'Error retrieving goals.' }); }
    if (goals.length === 0) { return res.status(404).json({ msg: 'No goals found for user.' }); }
    res.status(200).json({ msg: 'Success.', goals });
  });
});

router.put('/', auth, (req, res, next) => {
  const goal = {
    intGoal: req.body.intGoal,
    noteGoal: req.body.noteGoal,
    chordGoal: req.body.chordGoal,
    userId: req.userId
  };
  Goals.findOneAndUpdate({ 'userId': req.userId }, { ...goal }, {}, (err, result) => {
    if (err) { return res.status(500).json({ msg: 'Failed to update goal.' }); }
    return res.status(200).json({ msg: 'Success.' });
  });
});

module.exports = router;
