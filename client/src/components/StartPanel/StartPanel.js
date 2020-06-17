import React from 'react';
import classes from './StartPanel.module.css';
import { CSSTransition } from 'react-transition-group';
import '../UI/compAnims.css';

const StartPanel = props => (
  <CSSTransition in={!props.startGame} timeout={450} classNames="PanelOpacity" mountOnEnter unmountOnExit>
    <div className={classes.ShowStart}>
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
  </CSSTransition>
);

export default StartPanel;
