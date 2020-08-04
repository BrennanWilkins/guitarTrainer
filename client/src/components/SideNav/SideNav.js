import React from 'react';
import classes from './SideNav.module.css';
import { Link, withRouter } from 'react-router-dom';
import GuitarIcon from '../GuitarIcon/GuitarIcon';
import CloseBtn from '../UI/CloseBtn/CloseBtn';
import { barChartIcon, noteIcon, intervalIcon, chordIcon, calendarPlus } from '../UI/UIIcons';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const SideNav = props => {
  const closeHandler = () => {
    props.close();
    if (props.location.pathname !== props.history.location.pathname) {
      // close sidenav when link clicked
      props.showPanel(false);
    }
  };

  return (
    <div>
      <div className={[classes.SideNav, props.show ? classes.ShowNav : classes.HideNav].join(' ')}>
        <CloseBtn close={props.close} />
        <div onClick={closeHandler} className={classes.HomeLink}><GuitarIcon /></div>
        <div onClick={closeHandler}
        className={props.location.pathname === '/interval-trainer' ? [classes.ContentLink, classes.Highlight].join(' ') : classes.ContentLink}>
          <Link to="/interval-trainer"><span className={classes.Icon}>{intervalIcon}</span>Interval Trainer</Link>
        </div>
        <div onClick={closeHandler}
        className={props.location.pathname === '/note-trainer' ? [classes.ContentLink, classes.Highlight].join(' ') : classes.ContentLink}>
          <Link to="/note-trainer"><span className={classes.Icon}>{noteIcon}</span>Note Trainer</Link>
        </div>
        <div onClick={closeHandler}
        className={props.location.pathname === '/chord-trainer' ? [classes.ContentLink, classes.Highlight].join(' ') : classes.ContentLink}>
          <Link to="/chord-trainer"><span className={classes.Icon}>{chordIcon}</span>Chord Trainer</Link>
        </div>
        <div onClick={closeHandler}
        className={props.location.pathname === '/stats' ? [classes.ContentLink, classes.Highlight].join(' ') : classes.ContentLink}>
          <Link to="/stats"><span className={classes.Icon}>{barChartIcon}</span>Stats</Link>
        </div>
        <div onClick={() => { props.close(); props.showPanel(true); props.ignorePopupPanel(); }} className={classes.ContentLink}>
          <Link to="#"><span className={classes.Icon}>{calendarPlus}</span>Daily Goal</Link>
        </div>
        {props.isAuth ? (
          <div onClick={() => { props.logout(); props.close(); }} className={classes.AuthLink}>
            <Link to="#">Logout</Link>
          </div>
        ) : (
          <React.Fragment>
            <div onClick={() => { props.close(); props.setAuthMode('Login'); props.setShowAuthPanel(); }} className={classes.AuthLink}>
              <Link to="#">Log in</Link>
            </div>
            <div onClick={() => { props.close(); props.setAuthMode('Signup'); props.setShowAuthPanel(); }} className={classes.AuthLink}>
              <Link to="#">Sign up</Link>
            </div>
          </React.Fragment>
        )}
      </div>
      <div className={props.show ? classes.ShowBackdrop : classes.HideBackdrop} onClick={props.close}></div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  showPanel: (bool) => dispatch(actions.setShowGoalPanel(bool)),
  ignorePopupPanel: () => dispatch(actions.setIgnoreGoal(true)),
  setShowAuthPanel: () => dispatch(actions.setShowAuthPanel(true)),
  setAuthMode: (mode) => dispatch(actions.setAuthMode(mode)),
  logout: () => dispatch(actions.logout())
});

export default withRouter(connect(null, mapDispatchToProps)(SideNav));
