import React from 'react';
import classes from './SettingsPanel.module.css';
import CloseBtn from '../UI/CloseBtn/CloseBtn';
import { intervals, aScale } from '../../utils/intervalFuncs';

const SettingsPanel = React.forwardRef((props, ref) => (
  <div className={props.showSettings ? classes.ShowSettings : classes.Hide}
  onClick={props.outsideClose} ref={ref}>
    <div className={classes.SettingsDiv}>
      <div className={classes.SettingsTop}>
        <CloseBtn close={props.close} />
      </div>
      <span className={classes.SettingsTitle}>
        {props.mode === 'Interval' ? 'Enable or disable individual intervals' : 'Enable or disable individual notes'}
      </span>
      <div className={classes.SettingsIntervals}>
        {props.mode === 'Interval' ?
          (
            intervals.map(interval => (
            <button onClick={props.toggle} value={interval} key={interval}
            className={(props.disabledBtns).includes(interval) ? classes.SettingIntDisabled : classes.SettingIntEnabled}>
            {interval}</button>
            ))
          ) : (
            aScale.map(scaleNote => (
              <button onClick={props.toggle} value={scaleNote} key={scaleNote}
              className={(props.disabledBtns).includes(scaleNote) ? classes.SettingIntDisabled : classes.SettingIntEnabled}>
              {scaleNote}</button>
            ))
          )
        }
      </div>
      <span className={props.showErr ? classes.SettingsErrMsg : classes.HideOpacity}>{props.errMsg}</span>
      {props.mode !== 'Interval' ? null : (
        <React.Fragment>
          <span className={classes.SettingsTitle}>Show only ascending or descending intervals</span>
          <div className={classes.SettingsBtns}>
            <button onClick={() => props.setType('Ascending')}
            className={props.intType === 'Ascending' ? classes.BtnSelected : classes.BtnUnselected}>
            Ascending</button>
            <button onClick={() => props.setType('Descending')}
            className={props.intType === 'Descending' ? classes.BtnSelected : classes.BtnUnselected}>
            Descending</button>
            <button onClick={() => props.setType('Both')}
            className={props.intType === 'Both' ? classes.BtnSelected : classes.BtnUnselected}>
            Both</button>
          </div>
        </React.Fragment>
      )}
    </div>
  </div>
));

export default SettingsPanel;
