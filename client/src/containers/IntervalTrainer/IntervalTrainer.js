import React, { useState, useRef, useEffect } from 'react';
import classes from './IntervalTrainer.module.css';
import Guitar from '../../components/Guitar/Guitar';
import { generateInterval, generateIntervalPracMode } from '../../utils/intervalFuncs';
import TopBtns from '../../components/TrainerTopBtns/TrainerTopBtns';
import SessionStats from '../../components/SessionStats/SessionStats';
import StartPanel from '../../components/StartPanel/StartPanel';
import SettingsPanel from '../../components/SettingsPanel/SettingsPanel';
import NoteContainer from '../../components/NoteContainer/NoteContainer';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import GoalPanel from '../../components/GoalPanel/GoalPanel';
import GoalReachedPanel from '../../components/GoalReachedPanel/GoalReachedPanel';

const IntervalTrainer = props => {
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [animCorrect, setAnimCorrect] = useState(false);
  const [sessionWrong, setSessionWrong] = useState(0);
  const [animWrong, setAnimWrong] = useState(false);
  const [gameFirstStart, setGameFirstStart] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [rootNote, setRootNote] = useState('');
  const [otherNote, setOtherNote] = useState('');
  const [interval, setInterval] = useState('');
  const [rootSound, setRootSound] = useState();
  const [otherSound, setOtherSound] = useState();
  const [showSettings, setShowSettings] = useState(false);
  const [disabledIntervals, setDisabledIntervals] = useState([]);
  const [settingsErrMsg, setSettingsErrMsg] = useState('');
  const [showSettingsErr, setShowSettingsErr] = useState(false);
  const [intervalType, setIntervalType] = useState('Ascending');
  const [prevIntervalType, setPrevIntervalType] = useState('Ascending');
  const [volumeOn, setVolumeOn] = useState(true);
  const [noCorrAnim, setNoCorrAnim] = useState(false);
  const [showGoalPanel, setShowGoalPanel] = useState(false);
  const [showGoalReached, setShowGoalReached] = useState(false);

  const settingsBackdrop = useRef();

  useEffect(() => {
    // update current session on login/logout
    setSessionWrong(0);
    setSessionCorrect(0);
  }, [props.isAuth]);

  useEffect(() => {
    // turn off practice mode when visited
    return () => props.setPracMode(false);
  }, []);

  useEffect(() => {
    // if goal changed then update whether goal panel can show
    if (props.totIntCorrect < props.intGoal) {
      setShowGoalReached(false);
    }
  }, [props.intGoal]);

  const startGameHandler = () => {
    if (!gameFirstStart) {
      setGameFirstStart(true);
      gameLoop();
      setTimeout(() => setShowGoalPanel(true), 2000);
    }
    setStartGame(true);
  };

  const gameLoop = () => {
    let root, other, interval;
    if (props.pracMode) {
      // if in practice mode then generate practice intervals
      [root, other, interval] = generateIntervalPracMode(disabledIntervals, intervalType, props.intsCorrect, props.intsWrong);
    } else {
      // else generate any intervals
      [root, other, interval] = generateInterval(disabledIntervals, intervalType);
    }
    const newRootSound = new Audio(`/assets/notes/${root}.mp3`);
    const newOtherSound = new Audio(`/assets/notes/${other}.mp3`);
    setRootNote(root);
    setOtherNote(other);
    setInterval(interval);
    setRootSound(newRootSound);
    setOtherSound(newOtherSound);
    if (!volumeOn) { return; }
    newRootSound.play();
    // pause before second note played
    setTimeout(() => newOtherSound.play(), 1700);
  };

  const checkAnswer = (e) => {
    if (e.target.value === interval) {
      // answer correct, pause notes & play new interval
      rootSound.pause();
      otherSound.pause();
      rootSound.muted = true;
      otherSound.muted = true;
      if (props.intGoal > 0 && props.totIntCorrect + 1 === props.intGoal) {
        setShowGoalReached(true);
      }
      props.onCorrectInterval(interval);
      setSessionCorrect(prevCorrect => prevCorrect + 1);
      setAnimCorrect(true);
      setTimeout(() => {
        setNoCorrAnim(false);
        setAnimCorrect(false);
        gameLoop();
      }, 300);
    } else {
      // answer wrong
      props.onWrongInterval(interval);
      setAnimWrong(true);
      setTimeout(() => {
        setAnimWrong(false);
      }, 300);
      setSessionWrong(prevWrong => prevWrong + 1);
    }
  };

  const repeatNotes = () => {
    // pause notes & replay them
    rootSound.pause();
    otherSound.pause();
    rootSound.currentTime = 0;
    otherSound.currentTime = 0;
    if (!volumeOn) { return; }
    setTimeout(() => rootSound.play(), 100);
    setTimeout(() => otherSound.play(), 1700);
  };

  const toggleInterval = (e) => {
    const val = e.target.value;
    if (disabledIntervals.includes(val)) {
      // activate an interval
      setDisabledIntervals(prevInts => prevInts.filter(int => int !== val));
      if (disabledIntervals.length < 12) {
        setShowSettingsErr(false);
        setSettingsErrMsg('');
      }
    } else {
      // disable an interval
      setDisabledIntervals(prevInts => prevInts.concat([val]));
      if (disabledIntervals.length > 9) {
        setShowSettingsErr(true);
        setSettingsErrMsg('You need to have at least two intervals enabled.');
      }
    }
  };

  const closeSettingsHandler = (always, e) => {
    // always closes if close btn clicked
    if ((showSettingsErr || e.target !== settingsBackdrop.current) && !always) { return; }
    setShowSettings(false);
    if (disabledIntervals.includes(interval) || intervalType !== prevIntervalType) {
      setNoCorrAnim(true);
      setPrevIntervalType(intervalType);
      gameLoop();
    }
  };

  const toggleAudio = () => {
    rootSound.muted = volumeOn;
    otherSound.muted = volumeOn;
    rootSound.pause();
    otherSound.pause();
    setVolumeOn(prev => !prev);
  };

  return (
    <div className={!startGame || showSettings ? [classes.Content, classes.NoScroll].join(' ') : classes.Content}>
      <GoalPanel show={showGoalPanel} />
      <GoalReachedPanel
        show={showGoalReached}
        mode="Interval"
        close={() => setShowGoalReached(false)} />
      <h1 className={classes.Title}>Interval Trainer</h1>
      <div className={classes.TopBar}>
        <TopBtns
          showSettings={() => { setShowSettings(true); setShowGoalReached(false); }}
          pause={() => { setStartGame(false); setShowGoalReached(false); }}
          repeat={repeatNotes}
          started={startGame}
          mode="Interval"
          clicked={toggleAudio}
          volumeOn={volumeOn} />
        <h1 className={classes.InnerTitle}>Interval Trainer</h1>
        <SessionStats
          animCorrect={animCorrect}
          animWrong={animWrong}
          correct={sessionCorrect}
          wrong={sessionWrong} />
      </div>
      <Guitar
        rootNote={rootNote}
        otherNotes={[otherNote]}
        noAnim={noCorrAnim} />
      <NoteContainer
        disabledBtns={disabledIntervals}
        checkAnswer={checkAnswer}
        mode="Interval" />
      <StartPanel
        mode="Interval"
        started={startGameHandler}
        startGame={startGame} />
      <SettingsPanel
        showSettings={showSettings}
        ref={settingsBackdrop}
        close={closeSettingsHandler}
        mode="Interval"
        toggle={toggleInterval}
        disabledBtns={disabledIntervals}
        showErr={showSettingsErr}
        errMsg={settingsErrMsg}
        setType={(type) => setIntervalType(type)}
        pracMode={props.pracMode}
        setMode={() => props.setPracMode(!props.pracMode)}
        intType={intervalType} />
    </div>
  );
};

const mapStateToProps = state => ({
  pracMode: state.stats.pracModeInt,
  intsCorrect: state.stats.intervalsCorrect,
  intsWrong: state.stats.intervalsWrong,
  totIntCorrect: state.stats.totIntCorrectToday,
  intGoal: state.goals.intGoal,
  isAuth: state.auth.isAuth
});

const mapDispatchToProps = dispatch => ({
  onCorrectInterval: (int) => dispatch(actions.incCorrectInterval(int)),
  onWrongInterval: (int) => dispatch(actions.incWrongInterval(int)),
  setPracMode: (bool) => dispatch(actions.setPracModeInt(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(IntervalTrainer);
