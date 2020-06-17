import { SET_PRAC_MODE_INT, SET_PRAC_MODE_NOTE } from './actionTypes';

export const setPracModeInt = (bool) => ({ type: SET_PRAC_MODE_INT, bool });

export const setPracModeNote = (bool) => ({ type: SET_PRAC_MODE_NOTE, bool });
