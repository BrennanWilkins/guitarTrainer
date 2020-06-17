import React, { useState, useRef } from 'react';
import classes from './ChordTrainer.module.css';
import Guitar from '../../components/Guitar/Guitar';
import { getMajMinChord, getNoteShorthand } from '../../utils/intervalFuncs';
import TopBtns from '../../components/TrainerTopBtns/TrainerTopBtns';
import SessionStats from '../../components/SessionStats/SessionStats';
import StartPanel from '../../components/StartPanel/StartPanel';
import SettingsPanel from '../../components/SettingsPanel/SettingsPanel';
import NoteContainer from '../../components/NoteContainer/NoteContainer';
import { connect } from 'react-redux';
import { incCorrect, incWrong } from '../../store/actions/index';
import GoalPanel from '../../components/GoalPanel/GoalPanel';

const ChordTrainer = props => {
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [animCorrect, setAnimCorrect] = useState(false);
  const [sessionWrong, setSessionWrong] = useState(0);
  const [animWrong, setAnimWrong] = useState(false);
  const [gameFirstStart, setGameFirstStart] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [rootNote, setRootNote] = useState('');
  const [thirdNote, setThirdNote] = useState('');
  const [fifthNote, setFifthNote] = useState('');
  const [chord, setChord] = useState('');
  const [rootSound, setRootSound] = useState();
  const [thirdSound, setThirdSound] = useState();
  const [fifthSound, setFifthSound] = useState();
  const [showSettings, setShowSettings] = useState(false);
  const [disabledRoots, setDisabledRoots] = useState([]);
  const [settingsErrMsg, setSettingsErrMsg] = useState('');
  const [showSettingsErr, setShowSettingsErr] = useState(false);
  const [chordType, setChordType] = useState('Both');
  const [prevChordType, setPrevChordType] = useState('Both');
  const [volumeOn, setVolumeOn] = useState(true);
  const [selectedChord, setSelectedChord] = useState('3');
  const [noCorrAnim, setNoCorrAnim] = useState(false);
  const [showGoalPanel, setShowGoalPanel] = useState(false);

  const settingsBackdrop = useRef();

  const startGameHandler = () => {
    if (!gameFirstStart) {
      setGameFirstStart(true);
      gameLoop();
      setTimeout(() => setShowGoalPanel(true), 2000);
    }
    setStartGame(true);
  };

  const gameLoop = () => {
    const [root, third, fifth, newChord] = getMajMinChord(disabledRoots, chordType);
    const newRootSound = new Audio(`/assets/notes/${root}.mp3`);
    const newThirdSound = new Audio(`/assets/notes/${third}.mp3`);
    const newFifthSound = new Audio(`/assets/notes/${fifth}.mp3`);
    setRootNote(root);
    setThirdNote(third);
    setFifthNote(fifth);
    setChord(newChord);
    setRootSound(newRootSound);
    setThirdSound(newThirdSound);
    setFifthSound(newFifthSound);
    if (!volumeOn) { return; }
    newRootSound.autoplay = false;
    newThirdSound.autoplay = false;
    newFifthSound.autoplay = false;
    newRootSound.play();
    newThirdSound.play();
    newFifthSound.play();
  };

  const repeatNotes = () => {
    rootSound.pause();
    thirdSound.pause();
    fifthSound.pause();
    rootSound.currentTime = 0;
    thirdSound.currentTime = 0;
    fifthSound.currentTime = 0;
    if (!volumeOn) { return; }
    rootSound.play();
    thirdSound.play();
    fifthSound.play();
  };

  const checkAnswer = (e) => {
    if (e.target.value === getNoteShorthand(rootNote) && selectedChord === chord) {
      rootSound.pause();
      thirdSound.pause();
      fifthSound.pause();
      rootSound.muted = true;
      thirdSound.muted = true;
      fifthSound.muted = true;
      props.onCorrect();
      setSessionCorrect(prevCorrect => prevCorrect + 1);
      setAnimCorrect(true);
      setTimeout(() => {
        setNoCorrAnim(false);
        setAnimCorrect(false);
        gameLoop();
      }, 300);
    } else {
      props.onWrong();
      setAnimWrong(true);
      setTimeout(() => {
        setAnimWrong(false);
      }, 300);
      setSessionWrong(prevWrong => prevWrong + 1);
    }
  };

  const toggleChord = (e) => {
    const val = e.target.value;
    if (disabledRoots.includes(val)) {
      setDisabledRoots(prevRoots => prevRoots.filter(root => root !== val));
      if (disabledRoots.length < 12) {
        setShowSettingsErr(false);
        setSettingsErrMsg('');
      }
    } else {
      setDisabledRoots(prevRoots => prevRoots.concat([val]));
      if (disabledRoots.length > 9) {
        setShowSettingsErr(true);
        setSettingsErrMsg('You need to have at least two chords enabled.');
      }
    }
  };

  const closeSettingsHandler = (always, e) => {
    // always closes if close btn clicked
    if ((showSettingsErr || e.target !== settingsBackdrop.current) && !always) { return; }
    setShowSettings(false);
    if (disabledRoots.includes(getNoteShorthand(rootNote)) || chordType !== prevChordType) {
      setNoCorrAnim(true);
      setPrevChordType(chordType);
      gameLoop();
    }
  };

  const toggleAudio = () => {
    rootSound.muted = volumeOn;
    thirdSound.muted = volumeOn;
    fifthSound.muted = volumeOn;
    rootSound.pause();
    thirdSound.pause();
    fifthSound.pause();
    setVolumeOn(prev => !prev);
  };

  return (
    <div className={!startGame || showSettings ? [classes.Content, classes.NoScroll].join(' ') : classes.Content}>
      <GoalPanel show={showGoalPanel} />
      <h1 className={classes.Title}>Chord Trainer</h1>
      <div className={classes.TopBar}>
        <TopBtns
          showSettings={() => setShowSettings(true)}
          pause={() => setStartGame(false)}
          repeat={repeatNotes}
          started={startGame}
          mode="Chord"
          clicked={toggleAudio}
          volumeOn={volumeOn} />
        <h1 className={classes.InnerTitle}>Chord Trainer</h1>
        <SessionStats
          animCorrect={animCorrect}
          animWrong={animWrong}
          correct={sessionCorrect}
          wrong={sessionWrong} />
      </div>
      <Guitar
        rootNote={rootNote}
        otherNotes={[thirdNote, fifthNote]}
        noAnim={noCorrAnim} />
      <NoteContainer
        disabledBtns={disabledRoots}
        checkAnswer={checkAnswer}
        mode="Chord"
        selectedChord={selectedChord}
        setSelected={(int) => setSelectedChord(int)} />
      <StartPanel
        mode="Chord"
        started={startGameHandler}
        startGame={startGame} />
      <SettingsPanel
        showSettings={showSettings}
        ref={settingsBackdrop}
        close={closeSettingsHandler}
        mode="Chord"
        toggle={toggleChord}
        disabledBtns={disabledRoots}
        showErr={showSettingsErr}
        errMsg={settingsErrMsg}
        setType={(type) => setChordType(type)}
        intType={chordType} />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  onCorrect: () => dispatch(incCorrect()),
  onWrong: () => dispatch(incWrong())
});

export default connect(null, mapDispatchToProps)(ChordTrainer);
