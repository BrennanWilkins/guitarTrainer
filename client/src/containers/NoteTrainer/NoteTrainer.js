import React, { useState, useRef } from 'react';
import classes from './NoteTrainer.module.css';
import Guitar from '../../components/Guitar/Guitar';
import { settingsIcon, questionCircle, checkMark, xIcon, repeatIcon, arrowUp,
  volumeOnIcon, volumeOffIcon } from '../../components/UI/UIIcons';
import { getRandNote, aScale, getNoteShorthand } from '../../utils/intervalFuncs';
import CloseBtn from '../../components/UI/CloseBtn/CloseBtn';

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
        <div className={classes.TopBtns}>
          <button onClick={() => setShowSettings(true)}>{settingsIcon}</button>
          <button onClick={() => setStartGame(false)}>{questionCircle}</button>
          <button className={classes.RepeatNotes} onClick={repeatNote}>
            {repeatIcon}
            <span className={startGame ? classes.Hidden : classes.ArrowUp}>{arrowUp}</span>
            <span className={startGame ? classes.Hidden : classes.RepeatText}>Repeat the note</span>
          </button>
          <button onClick={() => setVolumeOn(prevState => !prevState)}>
            {volumeOn ? volumeOnIcon : volumeOffIcon}
          </button>
        </div>
        <h1 className={classes.InnerTitle}>Note Trainer</h1>
        <div className={classes.SessionStats}>
          <div>
            <span className={classes.CheckMark}>{checkMark}</span>
            <span className={animCorrect ? [classes.NumAnim, classes.SessionNum].join(' ') : classes.SessionNum}>
              {sessionCorrect}
            </span>
          </div>
          <div>
            <span className={classes.XIcon}>{xIcon}</span>
            <span className={animWrong ? [classes.NumAnim, classes.SessionNum].join(' ') : classes.SessionNum}>
              {sessionWrong}
            </span>
          </div>
        </div>
      </div>
      <Guitar otherNote={note} />
      <div className={classes.NoteContainer}>
        <div className={classes.Notes}>
          {aScale.map(scaleNote => (
            <button onClick={checkAnswer} value={scaleNote} key={scaleNote}
            className={disabledNotes.includes(scaleNote) ? classes.NoteDisabled : classes.NoteEnabled}>
            {scaleNote}</button>
          ))}
        </div>
      </div>
      <div className={startGame ? classes.Hide : classes.ShowStart}>
        <div className={classes.StartPanel}>
          <span className={classes.ExampleTitle}>Name the note</span>
          <button className={classes.StartBtn} onClick={startGameHandler}>Play</button>
          <div className={classes.TargetExample}>
            <button></button>
            <span>Target Note</span>
          </div>
        </div>
      </div>
      <div className={showSettings ? classes.ShowSettings : classes.Hide}
      onClick={closeSettingsOutsideHandler} ref={settingsBackdrop}>
        <div className={classes.SettingsDiv}>
          <div className={classes.SettingsTop}>
            <CloseBtn close={closeSettingsHandler}/>
          </div>
          <span className={classes.SettingsTitle}>Enable or disable individual notes</span>
          <div className={classes.SettingsNotes}>
            {aScale.map(scaleNote => (
              <button onClick={toggleNote} value={scaleNote} key={scaleNote}
              className={disabledNotes.includes(scaleNote) ? classes.SettingNoteDisabled : classes.SettingNoteEnabled}>
              {scaleNote}</button>
            ))}
          </div>
          <span className={showSettingsErr ? classes.SettingsErrMsg : classes.HideOpacity}>{settingsErrMsg}</span>
        </div>
      </div>
    </div>
  );
};

export default NoteTrainer;
