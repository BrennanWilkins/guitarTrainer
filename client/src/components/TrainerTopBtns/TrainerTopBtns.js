import React, { useState } from 'react';
import classes from './TrainerTopBtns.module.css';
import { settingsIcon, questionCircle, repeatIcon, arrowUp, volumeOnIcon, volumeOffIcon } from '../UI/UIIcons';

const TopBtns = props => {
  const [spin, setSpin] = useState();

  const repeat = () => {
    props.repeat();
    setSpin(true);
    setTimeout(() => setSpin(false), 500);
  };

  return (
    <div className={classes.TopBtns}>
      <button onClick={props.showSettings}>{settingsIcon}</button>
      <button onClick={props.pause}>{questionCircle}</button>
      <button className={classes.RepeatNotes} onClick={repeat}>
        <span className={spin ? classes.Spin: classes.NoSpin}>{repeatIcon}</span>
        <span className={props.started ? classes.Hidden : classes.ArrowUp}>{arrowUp}</span>
        <span className={props.started ? classes.Hidden : classes.RepeatText}>
          {props.mode === 'Interval' || props.mode === 'Chord' ? 'Repeat the notes' : 'Repeat the note'}
        </span>
      </button>
      <button onClick={props.clicked}>{props.volumeOn ? volumeOnIcon : volumeOffIcon}</button>
    </div>
  );
};

export default TopBtns;
