import React from 'react';
import classes from './SetGoalPanel.module.css';
import CloseBtn from '../UI/CloseBtn/CloseBtn';
import { connect } from 'react-redux';

const SetGoalPanel = () => {
  return (
    <div className={classes.Panel}>
      <h1>Today's Goal</h1>
      <CloseBtn close={() => {}}/>
      <p>Set a goal to reach for each game mode</p>
      <div>
        <p>Interval Trainer : get 0 correct</p>
        <input type="number" />
        <button>10</button>
        <button>20</button>
      </div>
      <div>
        <p>Note Trainer: get 0 correct</p>
        <input type="number" />
        <button>10</button>
        <button>20</button>
      </div>
      <div>
        <p>Chord Trainer: get 0 correct</p>
        <input type="number" />
        <button>10</button>
        <button>20</button>
      </div>
      <button>Set Goal</button>
    </div>
  );
};

const mapStateToProps = state => ({
  show: state.goals.showGoalPanel
});

export default SetGoalPanel;
