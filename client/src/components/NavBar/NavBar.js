import React, { useState } from 'react';
import classes from './NavBar.module.css';
import { Link } from 'react-router-dom';
import SideNav from '../SideNav/SideNav';
import GuitarIcon from '../GuitarIcon/GuitarIcon';

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
          <div><Link to="/login">Login</Link></div>
          <span> or </span>
          <div><Link to="/signup">Signup</Link></div>
          <span> to save your progress and view your stats </span>
        </div>
      </div>
      <SideNav show={showSideBar} close={sideNavHandler} />
    </div>
  );
};

export default NavBar;
