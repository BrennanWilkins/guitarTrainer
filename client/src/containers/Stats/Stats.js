import React, { useState, useRef } from 'react';
import classes from './Stats.module.css';
import CloseBtn from '../../components/UI/CloseBtn/CloseBtn';
import { aScale, intervals } from '../../utils/intervalFuncs';
import CanvasJSReact from '../../canvasjs/canvasjs.react';
import { connect } from 'react-redux';
import { reset } from '../../store/actions/index';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const colors = ['rgb(213, 31, 31)', 'rgb(226, 99, 41)', 'rgb(221, 140, 24)', 'rgb(231, 222, 63)', 'rgb(85, 205, 46)'];

const Stats = props => {
  const [showReset, setShowReset] = useState(false);

  const resetBackdrop = useRef();

  const closeResetPanelHandler = (e) => {
    if (e.target !== resetBackdrop.current) { return; }
    setShowReset(false);
  }

  // eg: [10, 20, 31, etc...];
  const notePerc = aScale.map(key => {
    let total = props.notesCorrect[key] + props.notesWrong[key];
    return total === 0 ? 0 : +((props.notesCorrect[key] / total) * 100).toFixed(2);
  });
  // red if <20%, red-orange if <40%, orange if <60%, yellow if <80%, green if >80%
  const noteColors = notePerc.map((y, i) => (
    y < 20 ? colors[0] : y < 40 ? colors[1] : y < 60 ? colors[2] : y < 80 ? colors[3] : colors[4]
  ));
  const noteData = aScale.map((note, i) => ({ label: note, y: notePerc[i], color: noteColors[i] }));
  const noteOptions = {
		animationEnabled: true,
		theme: 'light2',
		title: { text: 'Note Accuracy' },
    axisY: { valueFormatString: "0'%'", maximum: 100 },
    exportEnabled: false,
		data: [{
			type: 'column',
			indexLabelFontColor: '#5A5757',
			indexLabelPlacement: 'outside',
      toolTipContent: "{label}: {y}%",
      dataPoints: noteData
		}]
	};

  const intPerc = intervals.map(int => {
    let total = props.intervalsCorrect[int] + props.intervalsWrong[int];
    return total === 0 ? 0 : +((props.intervalsCorrect[int] / total) * 100).toFixed(2);
  });
  const intColors = intPerc.map((y, i) => (
    y < 20 ? colors[0] : y < 40 ? colors[1] : y < 60 ? colors[2] : y < 80 ? colors[3] : colors[4]
  ));
  const intervalData = intervals.map((interval, i) => ({ label: interval, y: intPerc[i], color: intColors[i] }));
  const intervalOptions = {
		animationEnabled: true,
		theme: 'light2',
		title: { text: 'Interval Accuracy' },
    axisY: { valueFormatString: "0'%'", maximum: 100 },
    exportEnabled: false,
		data: [{
			type: 'column',
			indexLabelFontColor: '#5A5757',
			indexLabelPlacement: 'outside',
      toolTipContent: "{label}: {y}%",
      dataPoints: intervalData
		}]
	};

  const total = props.totCorrect + props.totWrong;
  const accuracy = total === 0 ? 100 : +(props.totCorrect / total * 100).toFixed(2);


  return (
    <div className={classes.Content}>
      <h1 className={classes.Title}>Stats</h1>
      <div className={classes.TopStats}>
        <div className={classes.TopStatNums}>
          <div>Total correct: {props.totCorrect}</div>
          <div>Total wrong: {props.totWrong}</div>
        </div>
        <div>Total percent accuracy: {accuracy}%</div>
      </div>
      <div className={classes.NoteStats}>
        <CanvasJSChart options={noteOptions} />
        <div className={classes.Block}></div>
      </div>
      <div className={classes.IntervalStats}>
        <CanvasJSChart options={intervalOptions} />
        <div className={classes.Block}></div>
      </div>
      <div className={classes.ResetDiv}>
        <button onClick={() => setShowReset(true)}>Reset stats</button>
      </div>
      <div className={showReset ? classes.ResetBackdrop : classes.Hide}
      onClick={closeResetPanelHandler} ref={resetBackdrop}>
        <div className={classes.ResetPanel}>
          <CloseBtn close={() => setShowReset(false)} />
          <div className={classes.Reset}>
            <p>Are you sure?</p>
            <button onClick={() => { props.onReset(); setShowReset(false); }}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  totCorrect: state.totCorrect,
  totWrong: state.totWrong,
  intervalsCorrect: state.intervalsCorrect,
  intervalsWrong: state.intervalsWrong,
  notesCorrect: state.notesCorrect,
  notesWrong: state.notesWrong
});

const mapDispatchToProps = dispatch => ({
  onReset: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
