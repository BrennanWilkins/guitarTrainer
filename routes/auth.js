const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Stats = require('../models/stats');
const Goals = require('../models/goals');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const config = require('config');

router.post('/login',
  [body('email').isEmail().escape(),
  body('password').trim().isLength({ min: 8 }).escape()],
  async (req, res) => {
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json({ msg: 'Error in input fields.' });
    }
    try {
      const user = await User.findOne({ email: req.body.email });
      // couldn't find username in DB
      if (!user) { return res.status(400).json({ msg: 'Incorrect email or password.' }); }
      // compared encrypted password w received password
      const resp = await bcryptjs.compare(req.body.password, user.password);
      if (!resp) {
        // login failed
        return res.status(400).json({ msg: 'Incorrect email or password.' });
      }
      // success, returns jwt token and user id
      const options = req.body.remember === 'false' ? { expiresIn: '3h' } : { expiresIn: '7d' };
      const token = await jwt.sign({ user }, config.get('AUTH_KEY'), options);
      // retrieve user's stats
      const stats = await Stats.findOne({ 'userId': user._id });
      if (stats.length === 0) { throw 'err'; }
      // retrieve user's goals
      const goals = await Goals.findOne({ 'userId': user._id });
      if (goals.length === 0) { throw 'err'; }
      res.status(200).json({ stats, token, goals });
    } catch(e) {
      res.status(500).json({ msg: 'There was an error logging in.' });
    }
});

router.post('/signup',
  [body('email').isEmail().escape(),
  body('password').trim().isLength({ min: 8 }).escape()],
  async (req, res) => {
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json({ msg: 'Error in input fields.' });
    }
    try {
      const oldUser = await User.findOne({ email: req.body.email });
      // username is already taken
      if (oldUser) { return res.status(400).json({ msg: 'Email is already taken.' }); }
      // encrypt user's password
      const hashedPass = await bcryptjs.hash(req.body.password, 10);
      const user = new User({ email: req.body.email, password: hashedPass });
      await user.save();
      // user successful signed up, auto login
      const options = req.body.remember === 'false' ? { expiresIn: '3h' } : { expiresIn: '7d' };
      const token = await jwt.sign({ user }, config.get('AUTH_KEY'), options);
      // auto create stats for user
      const stats = new Stats({
        intervalsCorrect: {'b2': 0,'2': 0,'b3': 0,'3': 0,'4': 0,'b5': 0,'5': 0,'b6': 0,'6': 0,'b7': 0,'7': 0,'8': 0},
        intervalsWrong: {'b2': 0,'2': 0,'b3': 0,'3': 0,'4': 0,'b5': 0,'5': 0,'b6': 0,'6': 0,'b7': 0,'7': 0,'8': 0},
        notesCorrect: {'A': 0,'Bb': 0,'B': 0,'C': 0,'Db': 0,'D': 0,'Eb': 0,'E': 0,'F': 0,'Gb': 0,'G': 0,'Ab': 0},
        notesWrong: {'A': 0,'Bb': 0,'B': 0,'C': 0,'Db': 0,'D': 0,'Eb': 0,'E': 0,'F': 0,'Gb': 0,'G': 0,'Ab': 0},
        chordCorrect: 0,
        chordWrong: 0,
        totIntCorrectToday: 0,
        totNoteCorrectToday: 0,
        totChordCorrectToday: 0,
        lastPlayed: new Date(),
        userId: user._id
      });
      await stats.save();
      // auto create goals for user
      const goals = new Goals({
        intGoal: 0,
        noteGoal: 0,
        chordGoal: 0,
        userId: user._id
      });
      await goals.save();
      res.status(200).json({ token, stats, goals });
    } catch(e) {
      res.status(500).json({ msg: 'There was an error signing up.' });
    }
});

module.exports = router;
