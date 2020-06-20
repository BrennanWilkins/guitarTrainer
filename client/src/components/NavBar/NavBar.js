import React, { useState } from 'react';
import classes from './NavBar.module.css';
import { Link } from 'react-router-dom';
import SideNav from '../SideNav/SideNav';
import GuitarIcon from '../GuitarIcon/GuitarIcon';
import { connect } from 'react-redux';
import { setShowAuthPanel, setAuthMode, setIsAuth, logout, reset } from '../../store/actions/index';

const NavBar = props => {
  const [showSideBar, setShowSideBar] = useState(false);

  const sideNavHandler = () => {
    setShowSideBar(prevState => !prevState);
  };

  return (
    <div>
      <div className={classes.NavBar}>
        <div className={classes.LeftNavBar}>
          <div className={classes.SideToggle} onClick={sideNavHandler}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className={classes.HomeLink}><GuitarIcon /></div>
        </div>
        <div className={classes.AuthLinks}>
          {props.isAuth ?
            (
              <div onClick={() => { props.logout(); props.reset(); }}>
                <Link to="#">Logout</Link>
              </div>
            ) : (
              <React.Fragment>
                <div onClick={() => { props.setAuthMode('Login'); props.setShowAuthPanel(); }}>
                  <Link to="#">Log in</Link>
                </div>
                <span> or </span>
                <div onClick={() => { props.setAuthMode('Signup'); props.setShowAuthPanel(); }}>
                  <Link to="#">Sign up</Link>
                </div>
                <span> to save your progress and view your stats </span>
              </React.Fragment>
            )
          }
        </div>
      </div>
      <SideNav show={showSideBar} close={sideNavHandler} isAuth={props.isAuth} />
    </div>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

const mapDispatchToProps = dispatch => ({
  setShowAuthPanel: () => dispatch(setShowAuthPanel(true)),
  setAuthMode: (mode) => dispatch(setAuthMode(mode)),
  setIsAuth: (bool) => dispatch(setIsAuth(bool)),
  logout: () => dispatch(logout()),
  reset: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
