import React from 'react';
import classes from './Guitar.module.css';

const Guitar = props => (
  <div className={classes.GuitarContainer}>
  	<div className={classes.Guitar}>
  		<div className={[classes.First, classes.Fret].join(' ')}></div>
  		<div className={classes.Fret}></div>
  		<div className={classes.Fret}></div>
  		<div className={classes.Fret}></div>
  		<div className={classes.Fret}></div>
  		<div className={classes.Fret}></div>
  		<div className={classes.Fret}></div>
  		<div className={classes.Fret}></div>
  		<div className={classes.Fret}></div>
  		<div className={classes.Fret}></div>
  		<div className={classes.Fret}></div>
  		<div className={classes.Fret}></div>
  		<div className={classes.Fret}></div>
  		<ul className={classes.Dots}>
  			<li></li>
  			<li></li>
  			<li></li>
  			<li></li>
  		</ul>
  		<ul className={classes.Strings}>
  			<li></li>
  			<li></li>
  			<li></li>
  			<li></li>
  			<li></li>
  			<li></li>
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
  			<div className={[classes.Notes, classes.LowENotes].join(' ')}>
          <ul>
            {['ER1','F1','Gb1','G1','Ab1','A1','Bb1','B1','C1','Db1','D1','Eb1','E1'].map(note => (
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
  			<div className={[classes.Notes, classes.ANotes].join(' ')}>
          <ul>
            {['AR2','Bb2','B2','C2','Db2','D2','Eb2','E2','F2','Gb2','G2','Ab2','A2'].map(note => (
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
  			<div className={[classes.Notes, classes.DNotes].join(' ')}>
          <ul>
            {['DR3','Eb3','E3','F3','Gb3','G3','Ab3','A3','Bb3','B3','C3','Db3','D3'].map(note => (
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
  			<div className={[classes.Notes, classes.GNotes].join(' ')}>
          <ul>
            {['GR4','Ab4','A4','Bb4','B4','C4','Db4','D4','Eb4','E4','F4','Gb4','G4'].map(note => (
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
  			<div className={[classes.Notes, classes.BNotes].join(' ')}>
          <ul>
            {['BR5','C5','Db5','D5','Eb5','E5','F5','Gb5','G5','Ab5','A5','Bb5','B5'].map(note => (
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
  			<div className={[classes.Notes, classes.HighENotes].join(' ')}>
          <ul>
            {['ER6','F6','Gb6','G6','Ab6','A6','Bb6','B6','C6','Db6','D6','Eb6','E6'].map(note => (
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
		  </div>
  	</div>
  </div>
);

export default Guitar;
