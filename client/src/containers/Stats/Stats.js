import React, { useState, useRef } from 'react';
import classes from './Stats.module.css';
import CloseBtn from '../../components/UI/CloseBtn/CloseBtn';
import { createIntOptions, createNoteOptions } from '../../utils/statFuncs';
import CanvasJSReact from '../../canvasjs/canvasjs.react';
import { connect } from 'react-redux';
import { reset, setPracModeInt, setPracModeNote } from '../../store/actions/index';
import { withRouter } from 'react-router-dom';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Stats = props => {
  const [showReset, setShowReset] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(false);

  const resetBackdrop = useRef();

  const closeResetPanelHandler = (e) => {
    if (e.target !== resetBackdrop.current) { return; }
    setShowReset(false);
  }

  const total = props.totCorrect + props.totWrong;
  const accuracy = total === 0 ? 100 : +(props.totCorrect / total * 100).toFixed(2);

  const goToNotePrac = () => {
    props.setPracModeNote();
    props.history.push('/note-trainer');
  };

  const goToIntervalPrac = () => {
    props.setPracModeInt();
    props.history.push('/interval-trainer');
  };

  return (
    <div className={classes.Content}>
      <h1 className={classes.Title}>Stats</h1>
      <div className={classes.TopStats}>
        <div className={classes.TopStatNums}>
          <div>Total correct: {props.totCorrect}</div>
          <div>Total wrong: {props.totWrong}</div>
        </div>
        <div>Total percent accuracy: {accuracy}%</div>
      </div>
      <div className={classes.NoteStats}>
        <CanvasJSChart options={createNoteOptions(props.notesCorrect, props.notesWrong)} />
        <div className={classes.Block}></div>
      </div>
      <div className={classes.PracBtn}>
        <button onClick={goToNotePrac}>Practice my weakest notes</button>
      </div>
      <div className={classes.IntervalStats}>
        <CanvasJSChart options={createIntOptions(props.intervalsCorrect, props.intervalsWrong)} />
        <div className={classes.Block}></div>
      </div>
      <div className={classes.PracBtn}>
        <button onClick={goToIntervalPrac}>Practice my weakest intervals</button>
      </div>
      <div className={classes.PracInfo}>
        <button onClick={() => setShowInfoPanel(true)}>How does custom practice work?</button>
      </div>
      <div className={showInfoPanel ? classes.InfoPanel : classes.HideInfoPanel}>
        <CloseBtn close={() => setShowInfoPanel(false)} />
        <p>
          The notes or intervals are generated based on your accuracy, so a note or interval
          with higher accuracy will appear less often than one with lower accuracy.
        </p>
      </div>
      <div className={classes.ResetDiv}>
        <button onClick={() => setShowReset(true)}>Reset stats</button>
      </div>
      <div className={showReset ? classes.ResetBackdrop : classes.Hide}
      onClick={closeResetPanelHandler} ref={resetBackdrop}>
        <div className={classes.ResetPanel}>
          <CloseBtn close={() => setShowReset(false)} />
          <div className={classes.Reset}>
            <p>Are you sure?</p>
            <button onClick={() => { props.onReset(); setShowReset(false); }}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  totCorrect: state.stats.totCorrect,
  totWrong: state.stats.totWrong,
  intervalsCorrect: state.stats.intervalsCorrect,
  intervalsWrong: state.stats.intervalsWrong,
  notesCorrect: state.stats.notesCorrect,
  notesWrong: state.stats.notesWrong,
  isAuth: state.auth.isAuth
});

const mapDispatchToProps = dispatch => ({
  onReset: () => dispatch(reset()),
  setPracModeNote: () => dispatch(setPracModeNote(true)),
  setPracModeInt: () => dispatch(setPracModeInt(true))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Stats));
