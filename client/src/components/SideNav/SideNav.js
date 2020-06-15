import React from 'react';
import classes from './SideNav.module.css';
import { Link, withRouter } from 'react-router-dom';
import GuitarIcon from '../GuitarIcon/GuitarIcon';
import CloseBtn from '../UI/CloseBtn/CloseBtn';

const SideNav = props => (
  <div>
    <div className={[classes.SideNav, props.show ? classes.ShowNav : classes.HideNav].join(' ')}>
      <CloseBtn close={props.close} />
      <div onClick={props.close} className={classes.HomeLink}><GuitarIcon /></div>
      <div onClick={props.close}
      className={props.location.pathname === '/interval-trainer' ? [classes.ContentLink, classes.Highlight].join(' ') : classes.ContentLink}>
        <Link to="/interval-trainer">Interval Trainer</Link>
      </div>
      <div onClick={props.close}
      className={props.location.pathname === '/note-trainer' ? [classes.ContentLink, classes.Highlight].join(' ') : classes.ContentLink}>
        <Link to="/note-trainer">Note Trainer</Link>
      </div>
      <div onClick={props.close}
      className={props.location.pathname === '/chord-trainer' ? [classes.ContentLink, classes.Highlight].join(' ') : classes.ContentLink}>
        <Link to="/chord-trainer">Chord Trainer</Link>
      </div>
      <div onClick={props.close}
      className={props.location.pathname === '/stats' ? [classes.ContentLink, classes.Highlight].join(' ') : classes.ContentLink}>
        <Link to="/stats">Stats</Link>
      </div>
      <div onClick={props.close} className={classes.AuthLink}><Link to="/login">Login</Link></div>
      <div onClick={props.close} className={classes.AuthLink}><Link to="/signup">Signup</Link></div>
    </div>
    <div className={props.show ? classes.ShowBackdrop : classes.HideBackdrop} onClick={props.close}></div>
  </div>
);

export default withRouter(SideNav);
