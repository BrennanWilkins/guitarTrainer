import React from 'react';
import classes from './Spinner.module.css';

const Spinner = props => (
  <div className={props.login ? classes.LoginLoader : classes.Loader}></div>
);

export default Spinner;
