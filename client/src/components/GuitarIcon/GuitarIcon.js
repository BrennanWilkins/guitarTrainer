import React from 'react';
import classes from './GuitarIcon.module.css';
import { Link } from 'react-router-dom';
import { guitarIcon } from '../UI/UIIcons';

const GuitarIcon = () => (
  <div className={classes.Icon}>
    <span>{guitarIcon}</span>
    <Link to="/">Guitar Trainer</Link>
  </div>
);

export default GuitarIcon;
