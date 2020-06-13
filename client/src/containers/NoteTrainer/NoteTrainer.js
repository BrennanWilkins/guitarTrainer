import React, { useState, useRef } from 'react';
import classes from './NoteTrainer.module.css';
import Guitar from '../../components/Guitar/Guitar';
import { getRandNote, getNoteShorthand } from '../../utils/intervalFuncs';
import TopBtns from '../../components/TrainerTopBtns/TrainerTopBtns';
import SessionStats from '../../components/SessionStats/SessionStats';
import StartPanel from '../../components/StartPanel/StartPanel';
import SettingsPanel from '../../components/SettingsPanel/SettingsPanel';
import NoteContainer from '../../components/NoteContainer/NoteContainer';

const NoteTrainer = () => {
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
      setSessionCorrect(prevCorrect => prevCorrect + 1);
      setAnimCorrect(true);
      setTimeout(() => {
        setAnimCorrect(false);
        gameLoop();
      }, 300);
    } else {
      setAnimWrong(true);
      setTimeout(() => {
        setAnimWrong(false);
      }, 300);
      setSessionWrong(prevWrong => prevWrong + 1);
    }
  };

  const repeatNote = () => {
    if (!volumeOn) { return; }
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

  const closeSettingsHandler = () => {
    if (showSettingsErr) { return; }
    setShowSettings(false);
    if (disabledNotes.includes(shortNote) || shortNote !== prevShortNote) {
      setPrevShortNote(shortNote);
      gameLoop();
    }
  };

  const closeSettingsOutsideHandler = (e) => {
    if (showSettingsErr || e.target !== settingsBackdrop.current) { return; }
    setShowSettings(false);
    if (disabledNotes.includes(shortNote) || shortNote !== prevShortNote) {
      setPrevShortNote(shortNote);
      gameLoop();
    }
  };

  return (
    <div className={classes.Content}>
      <h1 className={classes.Title}>Note Trainer</h1>
      <div className={classes.TopBar}>
        <TopBtns showSettings={() => setShowSettings(true)} pause={() => setStartGame(false)} repeat={repeatNote}
        started={startGame} mode="Note" clicked={() => setVolumeOn(prevState => !prevState)} volumeOn={volumeOn} />
        <h1 className={classes.InnerTitle}>Note Trainer</h1>
        <SessionStats animCorrect={animCorrect} animWrong={animWrong} correct={sessionCorrect} wrong={sessionWrong} />
      </div>
      <Guitar otherNote={note} />
      <NoteContainer disabledBtns={disabledNotes} checkAnswer={checkAnswer} mode="Note" />
      <StartPanel mode="Note" started={startGameHandler} startGame={startGame} />
      <SettingsPanel mode="Note" showSettings={showSettings} disabledBtns={disabledNotes} toggle={toggleNote}
      outsideClose={closeSettingsOutsideHandler} ref={settingsBackdrop} close={closeSettingsHandler}
      showErr={showSettingsErr} errMsg={settingsErrMsg} />
    </div>
  );
};

export default NoteTrainer;
