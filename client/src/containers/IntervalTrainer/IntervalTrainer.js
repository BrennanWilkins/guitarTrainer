import React, { useState, useRef } from 'react';
import classes from './IntervalTrainer.module.css';
import Guitar from '../../components/Guitar/Guitar';
import { generateInterval, intervals } from '../../utils/intervalFuncs';
import TopBtns from '../../components/TrainerTopBtns/TrainerTopBtns';
import SessionStats from '../../components/SessionStats/SessionStats';
import StartPanel from '../../components/StartPanel/StartPanel';
import SettingsPanel from '../../components/SettingsPanel/SettingsPanel';

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
        <TopBtns showSettings={() => setShowSettings(true)} pause={() => setStartGame(false)} repeat={repeatNotes}
        started={startGame} mode="Interval" clicked={() => setVolumeOn(prevState => !prevState)} volumeOn={volumeOn} />
        <h1 className={classes.InnerTitle}>Interval Trainer</h1>
        <SessionStats animCorrect={animCorrect} animWrong={animWrong} correct={sessionCorrect} wrong={sessionWrong} />
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
      <StartPanel mode="Interval" started={startGameHandler} startGame={startGame} />
      <SettingsPanel showSettings={showSettings} outsideClose={closeSettingsOutsideHandler} ref={settingsBackdrop}
      close={closeSettingsHandler} mode="Interval" toggle={toggleInterval} disabledBtns={disabledIntervals}
      showErr={showSettingsErr} errMsg={settingsErrMsg} setType={(type) => setIntervalType(type)} intType={intervalType} />
    </div>
  );
};

export default IntervalTrainer;
