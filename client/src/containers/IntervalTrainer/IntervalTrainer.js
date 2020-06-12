import React, { useState, useRef } from 'react';
import classes from './IntervalTrainer.module.css';
import Guitar from '../../components/Guitar/Guitar';
import { settingsIcon, questionCircle, checkMark, xIcon, repeatIcon, arrowUp,
  volumeOnIcon, volumeOffIcon } from '../../components/UI/UIIcons';
import { generateInterval, intervals } from '../../utils/intervalFuncs';
import CloseBtn from '../../components/UI/CloseBtn/CloseBtn';

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

  const settingsBackdrop = useRef();

  const startGameHandler = () => {
    if (!gameFirstStart) {
      setGameFirstStart(true);
      gameLoop();
    }
    setStartGame(true);
  };

  const gameLoop = () => {
    const [root, other, interval] = generateInterval(disabledIntervals, intervalType);
    const newRootSound = new Audio(`/assets/notes/${root}.mp3`);
    const newOtherSound = new Audio(`/assets/notes/${other}.mp3`);
    setRootNote(root);
    setOtherNote(other);
    setInterval(interval);
    setRootSound(newRootSound);
    setOtherSound(newOtherSound);
    if (volumeOn) {
      newRootSound.play();
      setTimeout(() => newOtherSound.play(), 1700);
    }
  };

  const checkAnswer = (e) => {
    if (e.target.value === interval) {
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

  const repeatNotes = () => {
    if (!volumeOn) { return; }
    setTimeout(() => rootSound.play(), 100);
    setTimeout(() => otherSound.play(), 1700);
  };

  const toggleInterval = (e) => {
    const val = e.target.value;
    if (disabledIntervals.includes(val)) {
      setDisabledIntervals(prevInts => prevInts.filter(int => int !== val));
      if (disabledIntervals.length < 12) {
        setShowSettingsErr(false);
        setSettingsErrMsg('');
      }
    } else {
      setDisabledIntervals(prevInts => prevInts.concat([val]));
      if (disabledIntervals.length > 9) {
        setShowSettingsErr(true);
        setSettingsErrMsg('You need to have at least two intervals enabled.');
      }
    }
  };

  const closeSettingsHandler = () => {
    if (showSettingsErr) { return; }
    setShowSettings(false);
    if (disabledIntervals.includes(interval) || intervalType !== prevIntervalType) {
      setPrevIntervalType(intervalType);
      gameLoop();
    }
  };

  const closeSettingsOutsideHandler = (e) => {
    if (showSettingsErr || e.target !== settingsBackdrop.current) { return; }
    setShowSettings(false);
    if (disabledIntervals.includes(interval) || intervalType !== prevIntervalType) {
      setPrevIntervalType(intervalType);
      gameLoop();
    }
  };

  return (
    <div className={classes.Content}>
      <h1 className={classes.Title}>Interval Trainer</h1>
      <div className={classes.TopBar}>
        <div className={classes.TopBtns}>
          <button onClick={() => setShowSettings(true)}>{settingsIcon}</button>
          <button onClick={() => setStartGame(false)}>{questionCircle}</button>
          <button className={classes.RepeatNotes} onClick={repeatNotes}>
            {repeatIcon}
            <span className={startGame ? classes.Hidden : classes.ArrowUp}>{arrowUp}</span>
            <span className={startGame ? classes.Hidden : classes.RepeatText}>Repeat the notes</span>
          </button>
          <button onClick={() => setVolumeOn(prevState => !prevState)}>{volumeOn ? volumeOnIcon : volumeOffIcon}</button>
        </div>
        <h1 className={classes.InnerTitle}>Interval Trainer</h1>
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
      <Guitar rootNote={rootNote} otherNote={otherNote} />
      <div className={classes.IntervalContainer}>
        <div className={classes.Intervals}>
          {intervals.map(interval => (
            <button onClick={checkAnswer} value={interval} key={interval}
            className={disabledIntervals.includes(interval) ? classes.IntDisabled : classes.IntEnabled}>
            {interval}</button>
          ))}
        </div>
      </div>
      <div className={startGame ? classes.Hide : classes.ShowStart}>
        <div className={classes.StartPanel}>
          <span className={classes.ExampleTitle}>Select the interval between the two notes</span>
          <button className={classes.StartBtn} onClick={startGameHandler}>Play</button>
          <div className={classes.RootExample}>
            <button>R</button>
            <span>Root Note</span>
          </div>
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
          <span className={classes.SettingsTitle}>Enable or disable individual intervals</span>
          <div className={classes.SettingsIntervals}>
            {intervals.map(interval => (
              <button onClick={toggleInterval} value={interval} key={interval}
              className={disabledIntervals.includes(interval) ? classes.SettingIntDisabled : classes.SettingIntEnabled}>
              {interval}</button>
            ))}
          </div>
          <span className={showSettingsErr ? classes.SettingsErrMsg : classes.HideOpacity}>{settingsErrMsg}</span>
          <span className={classes.SettingsTitle}>Show only ascending or descending intervals</span>
          <div className={classes.SettingsBtns}>
            <button onClick={() => setIntervalType('Ascending')}
            className={intervalType === 'Ascending' ? classes.BtnSelected : classes.BtnUnselected}>
            Ascending</button>
            <button onClick={() => setIntervalType('Descending')}
            className={intervalType === 'Descending' ? classes.BtnSelected : classes.BtnUnselected}>
            Descending</button>
            <button onClick={() => setIntervalType('Both')}
            className={intervalType === 'Both' ? classes.BtnSelected : classes.BtnUnselected}>
            Both</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntervalTrainer;
