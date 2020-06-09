import React from 'react';
import classes from './GuitarIcon.module.css';
import { Link } from 'react-router-dom';

const GuitarIcon = () => (
  <div className={classes.Icon}>
    <img src="/assets/guitar.png" alt="" />
    <Link to="/">Guitar Trainer</Link>
  </div>
);

export default GuitarIcon;
