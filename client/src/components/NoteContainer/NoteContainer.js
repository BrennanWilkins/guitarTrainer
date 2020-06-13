import React from 'react';
import classes from './NoteContainer.module.css';
import { aScale, intervals } from '../../utils/intervalFuncs';

const NoteContainer = props => (
  <div className={classes.NoteContainer}>
    <div className={classes.Notes}>
      {props.mode === 'Note' ?
        (
          aScale.map(scaleNote => (
            <button onClick={props.checkAnswer} value={scaleNote} key={scaleNote}
            className={(props.disabledBtns).includes(scaleNote) ? classes.NoteDisabled : classes.NoteEnabled}>
            {scaleNote}</button>
          ))
        ) : (
          intervals.map(interval => (
            <button onClick={props.checkAnswer} value={interval} key={interval}
            className={(props.disabledBtns).includes(interval) ? classes.NoteDisabled : classes.NoteEnabled}>
            {interval}</button>
          ))
        )
      }
    </div>
  </div>
);

export default NoteContainer;
