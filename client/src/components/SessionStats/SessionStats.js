import React from 'react';
import classes from './SessionStats.module.css';
import { checkMark, xIcon } from '../UI/UIIcons';

const SessionStats = props => (
  <div className={classes.SessionStats}>
    <div>
      <span className={classes.CheckMark}>{checkMark}</span>
      <span className={props.animCorrect ? [classes.NumAnim, classes.SessionNum].join(' ') : classes.SessionNum}>
        {props.correct}
      </span>
    </div>
    <div>
      <span className={classes.XIcon}>{xIcon}</span>
      <span className={props.animWrong ? [classes.NumAnim, classes.SessionNum].join(' ') : classes.SessionNum}>
        {props.wrong}
      </span>
    </div>
  </div>
);

export default SessionStats;
