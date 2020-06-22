const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Stats = require('../models/stats');
const Goals = require('../models/goals');
const { check, body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const config = require('config');
const moment = require('moment');

// POST request for login
router.post('/login', [
  check('email').isEmail(),
  check('password').trim().isLength({ min: 8 }),
  body('*').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: 'Error in input fields.' });
    }
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        return res.status(500).json({ msg: 'Error connecting to the server.' });
      }
      // couldn't find username in DB
      if (!user) {
        return res.status(400).json({ msg: 'Incorrect email or password.' });
      }
      // compared encrypted password w received password
      bcryptjs.compare(req.body.password, user.password, (err, resp) => {
        if (resp) {
          // success, returns jwt token and user id
          const options = req.body.remember === 'false' ? { expiresIn: '24h' } : { expiresIn: '30d' };
          jwt.sign({ user }, config.get('AUTH_KEY'), options, (error, token) => {
            if (error) { return res.status(500).json({ msg: 'Server error.' }); }
            // auto get users stats
            Stats.findOne({ 'userId': user._id }).exec((statErr, stats) => {
              if (statErr) { return res.status(500).json({ msg: 'Error logging in.' }); }
              if (stats.length === 0) { return res.status(404).json({ msg: 'No stats found for user.' }); }
              // auto get users goals
              Goals.findOne({ 'userId': user._id }).exec((goalErr, goals) => {
                if (goalErr) { return res.status(500).json({ msg: 'Error logging in.' }); }
                if (goals.length === 0) { return res.status(404).json({ msg: 'No goals found for user.' }); }
                res.status(200).json({ msg: 'Success.', stats, token, goals });
              });
            });
          });
        } else {
          // login failed
          return res.status(400).json({ msg: 'Incorrect email or password.'});
        }
      });
    });
  }
]);

// POST request for signup
router.post('/signup', [
  // validate fields
  check('email').isEmail(),
  check('password').trim().isLength({ min: 8 }),
  body('*').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: 'Error in input fields.' });
    }
    User.find({ 'email': req.body.email }).exec((err, user) => {
      if (err) {
        return res.status(500).json({ msg: 'Error connecting to server.' });
      }
      // username is already taken
      if (user.length != 0) {
        return res.status(400).json({ msg: 'Email is already taken.' });
      }
      // compare encrypted password w received password
      bcryptjs.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ msg: 'Server error.' });
        }
        const user = new User({ email: req.body.email, password: hashedPassword });
        user.save(error => {
          if (error) {
            return res.status(500).json({ msg: 'Failed signing up user.' });
          }
          // user successful signed up, auto login
          const options = req.body.remember === 'false' ? { expiresIn: '24h' } : { expiresIn: '30d' };
          jwt.sign({ user }, config.get('AUTH_KEY'), options, (error, token) => {
            if (error) { return res.status(500).json({ msg: 'Server error.' }); }
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
              lastPlayed: moment().format('L'),
              userId: user._id
            });
            stats.save((err, result) => {
              if (err) { return res.status(500).json({ msg: 'Failed signing up user.' }); }
              // auto create goals for user
              const goals = new Goals({
                intGoal: 0,
                noteGoal: 0,
                chordGoal: 0,
                userId: user._id
              });
              goals.save((err, result) => {
                if (err) { return res.status(500).json({ msg: 'Failed signing up user.' }); }
                return res.status(200).json({ msg: 'Success.', token, stats, goals });
              });
            });
          });
        });
      });
    });
  }
]);

module.exports = router;
