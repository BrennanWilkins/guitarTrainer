import React, { useState, useEffect } from 'react';
import classes from './SetGoalPanel.module.css';
import CloseBtn from '../UI/CloseBtn/CloseBtn';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { CSSTransition } from 'react-transition-group';
import '../UI/compAnims.css';
import { checkMark } from '../UI/UIIcons';

const SetGoalPanel = props => {
  const [intVal, setIntVal] = useState(0);
  const [noteVal, setNoteVal] = useState(0);
  const [chordVal, setChordVal] = useState(0);
  const [intVal2, setIntVal2] = useState(0);
  const [noteVal2, setNoteVal2] = useState(0);
  const [chordVal2, setChordVal2] = useState(0);

  const intHandler = (e) => {
    let val = e.target.value;
    if (isNaN(val)) { return; }
    if (val.length === 2 && val.charAt(0) === '0') {
      val = val.slice(1);
    }
    setIntVal(val);
    if (val === '') { val = 0; }
    val = parseInt(val, 10);
    setIntVal2(val);
  };

  const noteHandler = (e) => {
    let val = e.target.value;
    if (isNaN(val)) { return; }
    if (val.length === 2 && val.charAt(0) === '0') {
      val = val.slice(1);
    }
    setNoteVal(val);
    if (val === '') { val = 0; }
    val = parseInt(val, 10);
    setNoteVal2(val);
  };

  const chordHandler = (e) => {
    let val = e.target.value;
    if (isNaN(val)) { return; }
    if (val.length === 2 && val.charAt(0) === '0') {
      val = val.slice(1);
    }
    setChordVal(val);
    if (val === '') { val = 0; }
    val = parseInt(val, 10);
    setChordVal2(val);
  };

  const setGoalHandler = () => {
    props.changeIntGoal(intVal2);
    props.changeNoteGoal(noteVal2);
    props.changeChordGoal(chordVal2);
    props.setShowPanel(false);
  };

  const changeHandler = (field, val) => {
    switch(field) {
      case 'chord': setChordVal(val); return setChordVal2(val);
      case 'note': setNoteVal(val); return setNoteVal2(val);
      default: setIntVal(val); return setIntVal2(val);
    }
  };

  useEffect(() => {
    // update goals when logged in/logout
    setIntVal(props.intGoal);
    setNoteVal(props.noteGoal);
    setChordVal(props.chordGoal);
    setIntVal2(props.intGoal);
    setNoteVal2(props.noteGoal);
    setChordVal2(props.chordGoal);
  }, [props.isAuth]);

  return (
    <CSSTransition in={props.show} timeout={450} classNames="PanelOpacity" unmountOnExit mountOnEnter>
      <div className={classes.Panel}>
        <CloseBtn close={() => props.setShowPanel(false)} />
        <div className={classes.Content}>
          <h1>Today's Goal</h1>
          <p className={classes.SubTitle}>Set a goal to reach for each game mode</p>
          <div>
            <p>Interval Trainer: get {intVal2} correct{intVal2 > 0 && props.intCorrect >= intVal2 && <span>{checkMark}</span>}</p>
            <p className={classes.CorrectToday}>Correct today: {props.intCorrect}</p>
            <div className={classes.Inputs}>
              <input value={intVal} onChange={intHandler} />
              <button onClick={() => changeHandler('int', 10)}>10</button>
              <button onClick={() => changeHandler('int', 20)}>20</button>
            </div>
          </div>
          <div>
            <p>Note Trainer: get {noteVal2} correct{props.noteCorrect >= noteVal2 && noteVal2 > 0 && <span>{checkMark}</span>}</p>
            <p className={classes.CorrectToday}>Correct today: {props.noteCorrect}</p>
            <div className={classes.Inputs}>
              <input value={noteVal} onChange={noteHandler} />
              <button onClick={() => changeHandler('note', 10)}>10</button>
              <button onClick={() => changeHandler('note', 20)}>20</button>
            </div>
          </div>
          <div>
            <p>Chord Trainer: get {chordVal2} correct{props.chordCorrect >= chordVal2 && chordVal2 > 0 && <span>{checkMark}</span>}</p>
            <p className={classes.CorrectToday}>Correct today: {props.chordCorrect}</p>
            <div className={classes.Inputs}>
              <input value={chordVal} onChange={chordHandler} />
              <button onClick={() => changeHandler('chord', 10)}>10</button>
              <button onClick={() => changeHandler('chord', 20)}>20</button>
            </div>
          </div>
          <button onClick={setGoalHandler} className={classes.SetBtn}>Set Goal</button>
        </div>
      </div>
    </CSSTransition>
  );
};

const mapStateToProps = state => ({
  show: state.goals.showGoalPanel,
  intGoal: state.goals.intGoal,
  noteGoal: state.goals.noteGoal,
  chordGoal: state.goals.chordGoal,
  intCorrect: state.stats.totIntCorrectToday,
  noteCorrect: state.stats.totNoteCorrectToday,
  chordCorrect: state.stats.totChordCorrectToday,
  isAuth: state.auth.isAuth
});

const mapDispatchToProps = dispatch => ({
  setShowPanel: (bool) => dispatch(actions.setShowGoalPanel(bool)),
  changeIntGoal: (num) => dispatch(actions.changeIntGoal(num)),
  changeNoteGoal: (num) => dispatch(actions.changeNoteGoal(num)),
  changeChordGoal: (num) => dispatch(actions.changeChordGoal(num))
});

export default connect(mapStateToProps, mapDispatchToProps)(SetGoalPanel);
