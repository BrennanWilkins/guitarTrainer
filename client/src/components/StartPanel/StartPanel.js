import React from 'react';
import classes from './StartPanel.module.css';

const StartPanel = props => (
  <div className={props.startGame ? classes.Hide : classes.ShowStart}>
    <div className={classes.StartPanel}>
      <span className={classes.ExampleTitle}>
        {props.mode === 'Interval' ? 'Select the interval between the two notes' :
        props.mode === 'Chord' ? 'Select the chord matching the notes' : 'Name the note'}
      </span>
      <button className={classes.StartBtn} onClick={props.started}>Play</button>
      {props.mode === 'Interval' || props.mode === 'Chord' ? (
        <div className={classes.RootExample}>
          <button>R</button>
          <span>Root Note</span>
        </div>
      ) : null }
      <div className={classes.TargetExample}>
        <button></button>
        <span>{props.mode === 'Chord' ? 'Chord Note' : 'Target Note'}</span>
      </div>
    </div>
  </div>
);

export default StartPanel;
