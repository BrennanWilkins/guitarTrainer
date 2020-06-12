import React from 'react';
import classes from './SwitchOrientation.module.css';
import { phonePortrait, arrowUp } from '../UI/UIIcons';
import { CSSTransition } from 'react-transition-group';
import '../UI/compAnims.css';

const SwitchOrientation = props => (
  <CSSTransition in={props.show} timeout={450} classNames="PanelOpacity" mountOnEnter unmountOnExit>
    <div className={classes.Container}>
      <div className={classes.Panel}>
        <p>Please rotate to landscape orientation</p>
        <div className={classes.Icons}>
          <span className={classes.Portrait}>{phonePortrait}</span>
          <span className={classes.Arrow}>{arrowUp}</span>
          <span className={classes.Landscape}>{phonePortrait}</span>
        </div>
        <div className={classes.Ignore}>
          <input type="checkbox" onClick={props.ignore}/>
          <span>Ignore</span>
        </div>
      </div>
    </div>
  </CSSTransition>
);

export default SwitchOrientation;
