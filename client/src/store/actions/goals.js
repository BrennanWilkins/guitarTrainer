import * as actionTypes from './actionTypes';
import store from '../../store';

export const setIgnoreGoal = () => ({ type: actionTypes.IGNORE_GOAL });

export const setShowGoalPanel = (bool) => ({ type: actionTypes.SHOW_GOAL_PANEL, bool });

export const changeIntGoal = (num) => ({ type: actionTypes.CHANGE_INT_GOAL, num, isAuth: store.getState().auth.isAuth });

export const changeNoteGoal = (num) => ({ type: actionTypes.CHANGE_NOTE_GOAL, num, isAuth: store.getState().auth.isAuth });

export const changeChordGoal = (num) => ({ type: actionTypes.CHANGE_CHORD_GOAL, num, isAuth: store.getState().auth.isAuth });

export const resetGoals = () => ({ type: actionTypes.RESET_GOALS });

export const setGoals = (goals) => ({ type: actionTypes.SET_GOALS, goals });
