import * as actionTypes from './actionTypes';
import { instance } from '../../axios';
import { reset, resetGoals, setStats, setGoals } from './index';

let expirationTimeout;

export const setShowAuthPanel = (bool) => ({ type: actionTypes.SHOW_AUTH_PANEL, bool });

export const setAuthMode = (mode) => ({ type: actionTypes.SET_AUTH_MODE, mode });

export const loginDispatch = () => ({ type: actionTypes.LOGIN });

export const login = () => dispatch => {
  // auto logout user when token expiration reached
  expirationTimeout = setTimeout(() => dispatch(logout()), Number(localStorage['expirationTime']));
  dispatch(loginDispatch());
};

export const logoutDispatch = () => ({ type: actionTypes.LOGOUT });

export const logout = () => dispatch => {
  delete instance.defaults.headers.common['x-auth-token'];
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('expirationTime');
  clearTimeout(expirationTimeout);
  dispatch(logoutDispatch());
  dispatch(reset());
  dispatch(resetGoals());
};

export const autoLogin = () => dispatch => {
  if (!localStorage['token'] || !localStorage['expirationDate']) { return; }
  if (new Date(localStorage['expirationDate']) <= new Date()) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('expirationTime');
    return;
  }
  instance.defaults.headers.common['x-auth-token'] = localStorage['token'];
  const newTime = new Date(localStorage['expirationDate']).getTime() - new Date().getTime();
  localStorage['expirationTime'] = newTime;
  instance.get('stats/').then(res => {
    const today = new Date();
    const newData = { ...res.data.stats };
    // if new day then reset current day's stats
    if (today.getTime() - new Date(res.data.stats.lastPlayed).getTime() >= 86400000) {
      newData.lastPlayed = today;
      newData.totIntCorrectToday = 0;
      newData.totNoteCorrectToday = 0;
      newData.totChordCorrectToday = 0;
      instance.put('stats/', newData).catch(err => {
        console.log(err);
        return dispatch(logout());
      });
    }
    instance.get('goals/').then(resp => {
      dispatch(setGoals(resp.data.goals));
      dispatch(setStats(newData));
      dispatch(login());
    }).catch(err => {
      console.log(err);
      return dispatch(logout());
    });
  }).catch(err => {
    console.log(err);
    return dispatch(logout());
  });
};
