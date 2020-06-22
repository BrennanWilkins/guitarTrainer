import * as actionTypes from './actionTypes';
import store from '../../store';

export const setPracModeInt = (bool) => ({ type: actionTypes.SET_PRAC_MODE_INT, bool });

export const setPracModeNote = (bool) => ({ type: actionTypes.SET_PRAC_MODE_NOTE, bool });

export const setStats = (stats) => ({ type: actionTypes.SET_STATS, stats });

export const reset = () => ({ type: actionTypes.RESET, isAuth: store.getState().auth.isAuth });
