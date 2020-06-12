import React from 'react';
import classes from './Guitar.module.css';
import { notes } from '../../utils/intervalFuncs';

const Guitar = props => (
  <div className={classes.GuitarOuterContainer}>
    <div className={classes.GuitarInnerContainer}>
    	<div className={classes.Guitar}>
    		<div className={[classes.First, classes.Fret].join(' ')}></div>
        {[...Array(12)].map((el, i) => <div className={classes.Fret} key={i}></div>)}
    		<ul className={classes.Dots}>
          {[...Array(4)].map((el, i) => <li key={i}></li>)}
    		</ul>
    		<ul className={classes.Strings}>
          {[...Array(6)].map((el, i) => <li key={i}></li>)}
    		</ul>
    		<ul className={classes.OpenNotes}>
    			<li className={classes.LowE}>E</li>
    			<li className={classes.B}>B</li>
    			<li className={classes.G}>G</li>
    			<li className={classes.D}>D</li>
    			<li className={classes.A}>A</li>
    			<li className={classes.HighE}>E</li>
    		</ul>
        <div className={classes.NoteContainer}>
          {[classes.LowENotes, classes.ANotes, classes.DNotes, classes.GNotes, classes.BNotes, classes.HighENotes]
            .map((elClass, i) => (
            <div className={[classes.Notes, elClass].join(' ')} key={i}>
              <ul>
                {notes.slice(((i * 12) + (i * 1)), ((i * 12) + (i * 1)) + 13).map(note => (
                  <li key={note}
                  className={
                    props.rootNote === note ? classes.RootNote :
                    props.otherNote === note ? classes.OtherNote :
                    classes.HiddenNote}>
                    {props.rootNote === note ? 'R' : ''}
                  </li>
                ))}
              </ul>
            </div>
          ))}
  		  </div>
    	</div>
    </div>
  </div>
);

export default Guitar;
