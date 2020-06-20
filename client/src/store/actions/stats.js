import { SET_PRAC_MODE_INT, SET_PRAC_MODE_NOTE, SET_STATS, RESET, SET_STATSID } from './actionTypes';

export const setPracModeInt = (bool) => ({ type: SET_PRAC_MODE_INT, bool });

export const setPracModeNote = (bool) => ({ type: SET_PRAC_MODE_NOTE, bool });

export const setStats = (stats) => ({ type: SET_STATS, stats });

export const setStatsId = (id) => ({ type: SET_STATSID, id });

export const reset = () => ({ type: RESET });
