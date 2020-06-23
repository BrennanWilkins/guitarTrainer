import React, { useState } from 'react';
import classes from './SettingsPanel.module.css';
import CloseBtn from '../UI/CloseBtn/CloseBtn';
import { intervals, aScale } from '../../utils/intervalFuncs';
import '../UI/compAnims.css';
import { CSSTransition } from 'react-transition-group';
import { questionCircle2 } from '../UI/UIIcons';

const SettingsPanel = React.forwardRef((props, ref) => {
  const [showPracInfo, setShowPracInfo] = useState(false);

  return (
    <CSSTransition in={props.showSettings} timeout={450} classNames="PanelOpacity" mountOnEnter unmountOnExit>
      <div className={classes.ShowSettings} onClick={(e) => props.close(false, e)} ref={ref}>
        <div className={classes.Panel}>
          <CloseBtn close={(e) => props.close(true, e)} />
          <div className={classes.Content}>
            <span className={classes.SettingsTitle}>
              {props.mode === 'Interval' ? 'Enable or disable individual intervals' : props.mode === 'Chord' ?
              'Enable or disable individual chords' : 'Enable or disable individual notes'}
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
            {props.mode === 'Interval' ?
              (
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
              ) : props.mode === 'Chord' ?
              (
                <React.Fragment>
                  <span className={classes.SettingsTitle}>Show only major or minor chords</span>
                  <div className={classes.SettingsBtns}>
                    <button onClick={() => props.setType('Major')}
                    className={props.intType === 'Major' ? classes.BtnSelected : classes.BtnUnselected}>
                    Major</button>
                    <button onClick={() => props.setType('Minor')}
                    className={props.intType === 'Minor' ? classes.BtnSelected : classes.BtnUnselected}>
                    Minor</button>
                    <button onClick={() => props.setType('Both')}
                    className={props.intType === 'Both' ? classes.BtnSelected : classes.BtnUnselected}>
                    Both</button>
                  </div>
                </React.Fragment>
              ) : null
            }
            <span className={classes.SettingsTitle}>
              Practice Mode
              <span className={classes.Question} onClick={() => setShowPracInfo(prev => !prev)}>
                {questionCircle2}
              </span>
            </span>
            <span className={showPracInfo ? classes.InfoText : classes.Hide}>
              Practice Mode shows you the notes or intervals you tend to get wrong more often.
            </span>
            <label className={classes.Switch}>
              <input type="checkbox" checked={props.pracMode} onChange={props.setMode} />
              <span className={classes.Slider}></span>
            </label>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
});

export default SettingsPanel;
