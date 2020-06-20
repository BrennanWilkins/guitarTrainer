const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Goals = require('../models/goals');

router.get('/:userId', auth, (req, res, next) => {
  Goals.find({ 'userId': req.params.userId }).exec((err, goals) => {
    if (err) {
      return res.status(500).json({ msg: 'Error getting goals from server.' });
    }
    return res.status(200).json({ msg: 'Success.', goals });
  });
});

router.post('/', auth, (req, res, next) => {
  const goal = new Goals({ intGoal: req.body.intGoal, noteGoal: req.body.noteGoal,
    chordGoal: req.body.chordGoal, date: req.body.date, userId: req.body.userId });
  goal.save((err, result) => {
    if (err) { return res.status(500).json({ msg: 'Failed to create goal.' }); }
    return res.status(200).json({ msg: 'Success.', goalId: result._id });
  });
});

router.put('/', auth, (req, res, next) => {
  const goal = new Goals({ _id: req.body.goalId, intGoal: req.body.intGoal, noteGoal: req.body.noteGoal,
    chordGoal: req.body.chordGoal, date: req.body.date, userId: req.body.userId });
  Goals.findByIdAndUpdate(req.params.id, goal, {}, (err, result) => {
    if (err) { return res.status(500).json({ msg: 'Failed to update goal.' }); }
    return res.status(200).json({ msg: 'Success.' });
  });
});

router.delete('/:id', auth, (req, res, next) => {
  Goals.findByIdAndRemove(req.params.id, err => {
    if (err) { return res.status(500).json({ msg: 'Failed to delete goal.' }); }
    return res.status(200).json({ msg: 'Success.' });
  });
});

module.exports = router;
