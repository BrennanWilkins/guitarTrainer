import React from 'react';
import classes from './GoalReachedPanel.module.css';
import { CSSTransition } from 'react-transition-group';
import '../UI/compAnims.css';

const GoalReachedPanel = props => (
  <CSSTransition in={props.show} timeout={450} classNames="PanelOpacity" mountOnEnter unmountOnExit>
    <div className={classes.Panel}>
      <p>You've reached your {props.mode} Trainer goal for today!</p>
      <button onClick={props.close}>Keep practicing</button>
    </div>
  </CSSTransition>
);

export default GoalReachedPanel;
