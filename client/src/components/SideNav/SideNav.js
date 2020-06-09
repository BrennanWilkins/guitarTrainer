import React from 'react';
import classes from './SideNav.module.css';
import { Link } from 'react-router-dom';
import GuitarIcon from '../GuitarIcon/GuitarIcon';
import { xIcon } from '../UIIcons';

const SideNav = props => (
  <div>
    <div className={[classes.SideNav, props.show ? classes.ShowNav : classes.HideNav].join(' ')}>
      <button className={classes.CloseBtn} onClick={props.close}><span>{xIcon}</span></button>
      <div className={classes.HomeLink}><GuitarIcon /></div>
      <div className={classes.ContentLink}><Link to="/interval-finder">Interval Finder</Link></div>
      <div className={classes.ContentLink}><Link to="/interval-ear-trainer">Interval Ear Trainer</Link></div>
      <div className={classes.ContentLink}><Link to="/note-finder">Note Finder</Link></div>
      <div className={classes.ContentLink}><Link to="/note-ear-trainer">Note Ear Trainer</Link></div>
      <div className={classes.ContentLink}><Link to="/stats">Stats</Link></div>
      <div className={classes.AuthLink}><Link to="/login">Login</Link></div>
      <div className={classes.AuthLink}><Link to="/signup">Signup</Link></div>
    </div>
    <div className={props.show ? classes.ShowBackdrop : classes.HideBackdrop} onClick={props.close}></div>
  </div>
);

export default SideNav;
