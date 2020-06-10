import React, { useState } from 'react';
import classes from './IntervalFinder.module.css';
import Guitar from '../../components/Guitar/Guitar';
import { settingsIcon, questionCircle, checkMark, xIcon, repeatIcon, arrowUp } from '../../components/UI/UIIcons';
import { generateInterval } from '../../utils/intervalFuncs';
import CloseBtn from '../../components/UI/CloseBtn/CloseBtn';

const IntervalFinder = props => {
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionWrong, setSessionWrong] = useState(0);
  const [gameFirstStart, setGameFirstStart] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [rootNote, setRootNote] = useState('');
  const [otherNote, setOtherNote] = useState('');
  const [interval, setInterval] = useState('');
  const [rootSound, setRootSound] = useState();
  const [otherSound, setOtherSound] = useState();
  const [showSettings, setShowSettings] = useState(false);
  const [disabledIntervals, setDisabledIntervals] = useState([]);

  const startGameHandler = () => {
    if (!gameFirstStart) {
      setGameFirstStart(true);
      gameLoop();
    }
    setStartGame(true);
  };

  const gameLoop = () => {
    const [root, other, interval] = generateInterval(disabledIntervals);
    const rootSound = new Audio(`/assets/notes/${root}.mp3`);
    rootSound.play();
    setRootNote(root);
    setOtherNote(other);
    setInterval(interval);
    const otherSound = new Audio(`/assets/notes/${other}.mp3`);
    setRootSound(rootSound);
    setOtherSound(otherSound);
    setTimeout(() => {
      otherSound.play();
    }, 2000);
  };

  const checkAnswer = (e) => {
    if (e.target.value === interval) {
      setSessionCorrect(prevCorrect => prevCorrect + 1);
      setTimeout(() => {
        gameLoop();
      }, 300);
    } else {
      setSessionWrong(prevWrong => prevWrong + 1);
    }
  };

  const repeatNotes = () => {
    rootSound.play();
    setTimeout(() => {
      otherSound.play();
    }, 2000);
  };

  const toggleInterval = (e) => {
    const val = e.target.value;
    if (disabledIntervals.includes(val)) {
      setDisabledIntervals(prevInts => prevInts.filter(int => int !== val));
    } else {
      setDisabledIntervals(prevInts => prevInts.concat([val]));
    }
  };

  return (
    <div className={classes.Content}>
      <h1>Interval Finder</h1>
      <div className={classes.TopBar}>
        <div className={classes.TopBtns}>
          <button className={classes.SettingsBtn} onClick={() => setShowSettings(true)}>{settingsIcon}</button>
          <button className={classes.HelpBtn} onClick={() => setStartGame(false)}>{questionCircle}</button>
          <button className={classes.RepeatBtn} onClick={repeatNotes}>{repeatIcon}</button>
        </div>
        <div className={classes.SessionStats}>
          <div>
            <span className={classes.CheckMark}>{checkMark}</span>
            <span className={classes.SessionNum}>{sessionCorrect}</span>
          </div>
          <div>
            <span className={classes.XIcon}>{xIcon}</span>
            <span className={classes.SessionNum}>{sessionWrong}</span>
          </div>
        </div>
      </div>
      <Guitar rootNote={rootNote} otherNote={otherNote} />
      <div className={classes.Intervals}>
        <button onClick={checkAnswer} value="b2"
        className={disabledIntervals.includes('b2') ? classes.IntDisabled : classes.IntEnabled}>
        b2</button>
        <button onClick={checkAnswer} value="2"
        className={disabledIntervals.includes('2') ? classes.IntDisabled : classes.IntEnabled}>
        2</button>
        <button onClick={checkAnswer} value="b3"
        className={disabledIntervals.includes('b3') ? classes.IntDisabled : classes.IntEnabled}>
        b3</button>
        <button onClick={checkAnswer} value="3"
        className={disabledIntervals.includes('3') ? classes.IntDisabled : classes.IntEnabled}>
        3</button>
        <button onClick={checkAnswer} value="4"
        className={disabledIntervals.includes('4') ? classes.IntDisabled : classes.IntEnabled}>
        4</button>
        <button onClick={checkAnswer} value="b5"
        className={disabledIntervals.includes('b5') ? classes.IntDisabled : classes.IntEnabled}>
        b5</button>
        <button onClick={checkAnswer} value="5"
        className={disabledIntervals.includes('5') ? classes.IntDisabled : classes.IntEnabled}>
        5</button>
        <button onClick={checkAnswer} value="b6"
        className={disabledIntervals.includes('b6') ? classes.IntDisabled : classes.IntEnabled}>
        b6</button>
        <button onClick={checkAnswer} value="6"
        className={disabledIntervals.includes('6') ? classes.IntDisabled : classes.IntEnabled}>
        6</button>
        <button onClick={checkAnswer} value="b7"
        className={disabledIntervals.includes('b7') ? classes.IntDisabled : classes.IntEnabled}>
        b7</button>
        <button onClick={checkAnswer} value="7"
        className={disabledIntervals.includes('7') ? classes.IntDisabled : classes.IntEnabled}>
        7</button>
        <button onClick={checkAnswer} value="8"
        className={disabledIntervals.includes('8') ? classes.IntDisabled : classes.IntEnabled}>
        8</button>
      </div>
      <div className={startGame ? classes.HideStart : classes.ShowStart}>
        <span className={classes.ArrowUp}>{arrowUp}</span>
        <span className={classes.RepeatText}>Repeat the notes</span>
        <span className={classes.ExampleTitle}>Select the interval between the two notes</span>
        <button className={classes.StartBtn} onClick={startGameHandler}>Start</button>
        <div className={classes.RootExample}>
          <button>R</button>
          <span>Root Note</span>
        </div>
        <div className={classes.TargetExample}>
          <button></button>
          <span>Target Note</span>
        </div>
      </div>
      <div className={showSettings ? classes.ShowSettings : classes.HideSettings}>
        <div className={classes.SettingsDiv}>
          <div className={classes.SettingsTop}>
            <CloseBtn close={() => setShowSettings(false)}/>
          </div>
          <span className={classes.SettingsTitle}>Enable or disable individual intervals</span>
          <div className={classes.SettingsIntervals}>
            <button onClick={toggleInterval} value="b2"
            className={disabledIntervals.includes('b2') ? classes.SettingIntDisabled : classes.SettingIntEnabled}>
            b2</button>
            <button onClick={toggleInterval} value="2"
            className={disabledIntervals.includes('2') ? classes.SettingIntDisabled : classes.SettingIntEnabled}>
            2</button>
            <button onClick={toggleInterval} value="b3"
            className={disabledIntervals.includes('b3') ? classes.SettingIntDisabled : classes.SettingIntEnabled}>
            b3</button>
            <button onClick={toggleInterval} value="3"
            className={disabledIntervals.includes('3') ? classes.SettingIntDisabled : classes.SettingIntEnabled}>
            3</button>
            <button onClick={toggleInterval} value="4"
            className={disabledIntervals.includes('4') ? classes.SettingIntDisabled : classes.SettingIntEnabled}>
            4</button>
            <button onClick={toggleInterval} value="b5"
            className={disabledIntervals.includes('b5') ? classes.SettingIntDisabled : classes.SettingIntEnabled}>
            b5</button>
            <button onClick={toggleInterval} value="5"
            className={disabledIntervals.includes('5') ? classes.SettingIntDisabled : classes.SettingIntEnabled}>
            5</button>
            <button onClick={toggleInterval} value="b6"
            className={disabledIntervals.includes('b6') ? classes.SettingIntDisabled : classes.SettingIntEnabled}>
            b6</button>
            <button onClick={toggleInterval} value="6"
            className={disabledIntervals.includes('6') ? classes.SettingIntDisabled : classes.SettingIntEnabled}>
            6</button>
            <button onClick={toggleInterval} value="b7"
            className={disabledIntervals.includes('b7') ? classes.SettingIntDisabled : classes.SettingIntEnabled}>
            b7</button>
            <button onClick={toggleInterval} value="7"
            className={disabledIntervals.includes('7') ? classes.SettingIntDisabled : classes.SettingIntEnabled}>
            7</button>
            <button onClick={toggleInterval} value="8"
            className={disabledIntervals.includes('8') ? classes.SettingIntDisabled : classes.SettingIntEnabled}>
            8</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntervalFinder;
