import React from 'react';
import classes from './Guitar.module.css';
import { notes } from '../../utils/intervalFuncs';

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
      <div className={classes.Notes}>
  			<div className={[classes.Mask, classes.LowENotes].join(' ')}>
          <ul>
            {['E','F','F#','G','G#','A','A#','B','C','C#','D','D#','E'].map(note => (
              <li>{note}</li>
            ))}
          </ul>
        </div>
  			<div className={[classes.Mask, classes.ANotes].join(' ')}>
          <ul>
            {['A','A#','B','C','C#','D','D#','E','F','F#','G','G#','A'].map(note => (
              <li>{note}</li>
            ))}
          </ul>
        </div>
  			<div className={[classes.Mask, classes.DNotes].join(' ')}>
          <ul>
            {['D','D#','E','F','F#','G','G#','A','A#','B','C','C#','D'].map(note => (
              <li>{note}</li>
            ))}
          </ul>
        </div>
  			<div className={[classes.Mask, classes.GNotes].join(' ')}>
          <ul>
            {['G','G#','A','A#','B','C','C#','D','D#','E','F','F#','G'].map(note => (
              <li>{note}</li>
            ))}
          </ul>
        </div>
  			<div className={[classes.Mask, classes.BNotes].join(' ')}>
          <ul>
            {['B','C','C#','D','D#','E','F','F#','G','G#','A','A#','B'].map(note => (
              <li>{note}</li>
            ))}
          </ul>
        </div>
  			<div className={[classes.Mask, classes.HighENotes].join(' ')}>
          <ul>
            {['E','F','F#','G','G#','A','A#','B','C','C#','D','D#','E'].map(note => (
              <li>{note}</li>
            ))}
          </ul>
        </div>
		  </div>
  	</div>
  </div>
);

export default Guitar;
