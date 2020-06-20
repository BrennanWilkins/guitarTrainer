import React from 'react';
import classes from './GoalPanel.module.css';
import { calendarPlus } from '../UI/UIIcons';
import { connect } from 'react-redux';
import { setIgnoreGoal, setShowGoalPanel } from '../../store/actions/index';

const GoalPanel = props => (
  <div className={props.showPanel && props.show ? classes.Panel : classes.PanelHidden}>
    <p>
      <span className={classes.Calendar}>{calendarPlus}</span>
      Do you want to set a new goal for today?
    </p>
    <div className={classes.BtnDiv}>
      <button onClick={() => { props.setShowGoalPanel(); props.ignoreGoal(); }}>Set a goal</button>
      <button className={classes.IgnoreBtn} onClick={props.ignoreGoal}>Ignore</button>
    </div>
  </div>
);

const mapStateToProps = state => ({
  showPanel: !state.goals.ignoreGoal
});

const mapDispatchToProps = dispatch => ({
  ignoreGoal: () => dispatch(setIgnoreGoal(true)),
  setShowGoalPanel: () => dispatch(setShowGoalPanel(true))
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalPanel);
