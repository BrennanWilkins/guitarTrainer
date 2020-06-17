import React, { useState, useEffect } from 'react';
import classes from './Home.module.css';
import { Link } from 'react-router-dom';
import GoalPanel from '../GoalPanel/GoalPanel';

const Home = () => {
  const [showGoalPanel, setShowGoalPanel] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowGoalPanel(true), 2000);
  }, []);

  return (
    <div className={classes.Container}>
      <div className={classes.Content}>
        <GoalPanel show={showGoalPanel} />
        <div>
          <h1>Interval Trainer</h1>
          <p>Train your ear to hear the interval between two notes</p>
          <Link to="/interval-trainer">
            <button>Start</button>
          </Link>
        </div>
        <div>
          <h1>Note Trainer</h1>
          <p>Learn and practice the notes on the fretboard</p>
          <Link to="/note-trainer">
            <button>Start</button>
          </Link>
        </div>
        <div>
          <h1>Chord Trainer</h1>
          <p>Train your ear and learn chord shapes</p>
          <Link to="/chord-trainer">
            <button>Start</button>
          </Link>
        </div>
        <div>
          <h1>My Stats</h1>
          <p>See detailed charts and get customized practice</p>
          <Link to="/stats">
            <button>Go to stats</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
