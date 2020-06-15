import React, { useState, useRef } from 'react';
import classes from './NoteTrainer.module.css';
import Guitar from '../../components/Guitar/Guitar';
import { getRandNote, getNoteShorthand } from '../../utils/intervalFuncs';
import TopBtns from '../../components/TrainerTopBtns/TrainerTopBtns';
import SessionStats from '../../components/SessionStats/SessionStats';
import StartPanel from '../../components/StartPanel/StartPanel';
import SettingsPanel from '../../components/SettingsPanel/SettingsPanel';
import NoteContainer from '../../components/NoteContainer/NoteContainer';
import { connect } from 'react-redux';
import { incCorrect, incWrong, incCorrectNote, incWrongNote } from '../../store/actions/index';

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

  const settingsBackdrop = useRef();

  const startGameHandler = () => {
    if (!gameFirstStart) {
      setGameFirstStart(true);
      gameLoop();
    }
    setStartGame(true);
  };

  const gameLoop = () => {
    const randNote = getRandNote(disabledNotes);
    setNote(randNote);
    setShortNote(getNoteShorthand(randNote));
    setPrevShortNote(getNoteShorthand(randNote));
    const newNoteSound = new Audio(`/assets/notes/${randNote}.mp3`);
    setNoteSound(newNoteSound);
    if (volumeOn) { newNoteSound.play(); }
  };

  const checkAnswer = (e) => {
    if (e.target.value === shortNote) {
      props.onCorrect();
      props.onCorrectNote(shortNote);
      setSessionCorrect(prevCorrect => prevCorrect + 1);
      setAnimCorrect(true);
      setTimeout(() => {
        setAnimCorrect(false);
        setNoCorrAnim(false);
        gameLoop();
      }, 300);
    } else {
      props.onWrong();
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
      <h1 className={classes.Title}>Note Trainer</h1>
      <div className={classes.TopBar}>
        <TopBtns
          showSettings={() => setShowSettings(true)}
          pause={() => setStartGame(false)}
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
        toggle={toggleNote} />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  onCorrect: () => dispatch(incCorrect()),
  onWrong: () => dispatch(incWrong()),
  onCorrectNote: (note) => dispatch(incCorrectNote(note)),
  onWrongNote: (note) => dispatch(incWrongNote(note))
});

export default connect(null, mapDispatchToProps)(NoteTrainer);
