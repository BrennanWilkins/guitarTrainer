import React, { useState, useRef } from 'react';
import classes from './IntervalFinder.module.css';
import Guitar from '../../components/Guitar/Guitar';
import { settingsIcon, questionCircle, checkMark, xIcon } from '../../components/UIIcons';
import { generateInterval } from '../../utils/intervalFuncs';

const IntervalFinder = props => {
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionWrong, setSessionWrong] = useState(0);
  const [startGame, setStartGame] = useState(false);

  return (
    <div className={classes.Content}>
      <h1>Interval Finder</h1>
      <div className={classes.TopBar}>
        <div className={classes.TopBtns}>
          <button className={classes.SettingsBtn}>{settingsIcon}</button>
          <button className={classes.HelpBtn}>{questionCircle}</button>
        </div>
        <div className={classes.SessionStats}>
          <div>
            <span className={classes.CheckMark}>{checkMark}</span>
            <span className={classes.SessionNum}>{sessionCorrect}</span>
          </div>
          <div>
            <span className={classes.XIcon}>{xIcon}</span>
            <span className={classes.SessionNum}>{sessionWrong}</span>
          </div>
        </div>
      </div>
      <Guitar />
      <div className={classes.Intervals}>
        <button>b2</button>
        <button>2</button>
        <button>b3</button>
        <button>3</button>
        <button>4</button>
        <button>b5</button>
        <button>5</button>
        <button>b6</button>
        <button>6</button>
        <button>b7</button>
        <button>7</button>
        <button>8</button>
      </div>
      <div className={startGame ? classes.HideStart : classes.ShowStart}>
        <button onClick={() => setStartGame(true)}>Start</button>
      </div>
    </div>
  );
};

export default IntervalFinder;
