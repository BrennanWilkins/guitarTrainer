import React, { useState, useRef, useEffect } from 'react';
import classes from './NoteTrainer.module.css';
import Guitar from '../../components/Guitar/Guitar';
import { getRandNote, getNoteShorthand, getRandNotePracMode } from '../../utils/intervalFuncs';
import TopBtns from '../../components/TrainerTopBtns/TrainerTopBtns';
import SessionStats from '../../components/SessionStats/SessionStats';
import StartPanel from '../../components/StartPanel/StartPanel';
import SettingsPanel from '../../components/SettingsPanel/SettingsPanel';
import NoteContainer from '../../components/NoteContainer/NoteContainer';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import GoalPanel from '../../components/GoalPanel/GoalPanel';
import GoalReachedPanel from '../../components/GoalReachedPanel/GoalReachedPanel';

const NoteTrainer = props => {
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [animCorrect, setAnimCorrect] = useState(false);
  const [sessionWrong, setSessionWrong] = useState(0);
  const [animWrong, setAnimWrong] = useState(false);
  const [gameFirstStart, setGameFirstStart] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [disabledNotes, setDisabledNotes] = useState([]);
  const [settingsErrMsg, setSettingsErrMsg] = useState('');
  const [showSettingsErr, setShowSettingsErr] = useState(false);
  const [note, setNote] = useState();
  const [shortNote, setShortNote] = useState();
  const [noteSound, setNoteSound] = useState();
  const [prevShortNote, setPrevShortNote] = useState();
  const [volumeOn, setVolumeOn] = useState(true);
  const [noCorrAnim, setNoCorrAnim] = useState(false);
  const [showGoalPanel, setShowGoalPanel] = useState(false);
  const [showGoalReached, setShowGoalReached] = useState(false);

  const settingsBackdrop = useRef();

  useEffect(() => {
    setSessionWrong(0);
    setSessionCorrect(0);
  }, [props.isAuth]);

  useEffect(() => {
    return () => props.setPracMode(false);
  }, []);

  const startGameHandler = () => {
    if (!gameFirstStart) {
      setGameFirstStart(true);
      gameLoop();
      setTimeout(() => setShowGoalPanel(true), 2000);
    }
    setStartGame(true);
  };

  const gameLoop = () => {
    const randNote = (
      props.pracMode ?
      getRandNotePracMode(disabledNotes, props.notesCorrect, props.notesWrong) :
      getRandNote(disabledNotes)
    );
    setNote(randNote);
    setShortNote(getNoteShorthand(randNote));
    setPrevShortNote(getNoteShorthand(randNote));
    const newNoteSound = new Audio(`/assets/notes/${randNote}.mp3`);
    setNoteSound(newNoteSound);
    if (volumeOn) { newNoteSound.play(); }
  };

  useEffect(() => {
    if (props.totNoteCorrect < props.noteGoal) {
      setShowGoalReached(false);
    }
  }, [props.noteGoal]);

  const checkAnswer = (e) => {
    if (e.target.value === shortNote) {
      if (props.noteGoal > 0 && props.totNoteCorrect + 1 === props.noteGoal) {
        setShowGoalReached(true);
      }
      props.onCorrectNote(shortNote);
      setSessionCorrect(prevCorrect => prevCorrect + 1);
      setAnimCorrect(true);
      setTimeout(() => {
        setAnimCorrect(false);
        setNoCorrAnim(false);
        gameLoop();
      }, 300);
    } else {
      props.onWrongNote(shortNote);
      setAnimWrong(true);
      setTimeout(() => {
        setAnimWrong(false);
      }, 300);
      setSessionWrong(prevWrong => prevWrong + 1);
    }
  };

  const repeatNote = () => {
    if (!volumeOn) { return; }
    noteSound.currentTime = 0;
    noteSound.play();
  };

  const toggleNote = (e) => {
    const val = e.target.value;
    if (disabledNotes.includes(val)) {
      setDisabledNotes(prevNotes => prevNotes.filter(n => n !== val));
      if (disabledNotes.length < 12) {
        setShowSettingsErr(false);
        setSettingsErrMsg('');
      }
    } else {
      setDisabledNotes(prevNotes => prevNotes.concat([val]));
      if (disabledNotes.length > 9) {
        setShowSettingsErr(true);
        setSettingsErrMsg('You need to have at least two notes enabled.');
      }
    }
  };

  const closeSettingsHandler = (always, e) => {
    // always closes if close btn clicked
    if ((showSettingsErr || e.target !== settingsBackdrop.current) && !always) { return; }
    setShowSettings(false);
    if (disabledNotes.includes(shortNote) || shortNote !== prevShortNote) {
      setNoCorrAnim(true);
      setPrevShortNote(shortNote);
      gameLoop();
    }
  };

  const toggleAudio = () => {
    noteSound.pause();
    setVolumeOn(prevState => !prevState);
  };

  return (
    <div className={!startGame || showSettings ? [classes.Content, classes.NoScroll].join(' ') : classes.Content}>
      <GoalPanel show={showGoalPanel} />
      <GoalReachedPanel
        show={showGoalReached}
        mode="Note"
        close={() => setShowGoalReached(false)} />
      <h1 className={classes.Title}>Note Trainer</h1>
      <div className={classes.TopBar}>
        <TopBtns
          showSettings={() => { setShowSettings(true); setShowGoalReached(false); }}
          pause={() => { setStartGame(false); setShowGoalReached(false); }}
          repeat={repeatNote}
          started={startGame}
          mode="Note"
          volumeOn={volumeOn}
          clicked={toggleAudio} />
        <h1 className={classes.InnerTitle}>Note Trainer</h1>
        <SessionStats
          animCorrect={animCorrect}
          animWrong={animWrong}
          correct={sessionCorrect}
          wrong={sessionWrong} />
      </div>
      <Guitar
        otherNotes={[note]}
        noAnim={noCorrAnim} />
      <NoteContainer
        disabledBtns={disabledNotes}
        checkAnswer={checkAnswer}
        mode="Note" />
      <StartPanel
        mode="Note"
        started={startGameHandler}
        startGame={startGame} />
      <SettingsPanel
        mode="Note"
        showSettings={showSettings}
        disabledBtns={disabledNotes}
        ref={settingsBackdrop}
        close={closeSettingsHandler}
        showErr={showSettingsErr}
        errMsg={settingsErrMsg}
        pracMode={props.pracMode}
        setMode={() => props.setPracMode(!props.pracMode)}
        toggle={toggleNote} />
    </div>
  );
};

const mapStateToProps = state => ({
  pracMode: state.stats.pracModeNote,
  notesCorrect: state.stats.notesCorrect,
  notesWrong: state.stats.notesWrong,
  totNoteCorrect: state.stats.totNoteCorrectToday,
  noteGoal: state.goals.noteGoal,
  isAuth: state.auth.isAuth
});

const mapDispatchToProps = dispatch => ({
  onCorrectNote: (note) => dispatch(actions.incCorrectNote(note)),
  onWrongNote: (note) => dispatch(actions.incWrongNote(note)),
  setPracMode: (bool) => dispatch(actions.setPracModeNote(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteTrainer);
