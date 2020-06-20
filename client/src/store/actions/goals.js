import * as actionTypes from './actionTypes';

export const setIgnoreGoal = () => ({ type: actionTypes.IGNORE_GOAL });

export const setShowGoalPanel = (bool) => ({ type: actionTypes.SHOW_GOAL_PANEL, bool });

export const changeIntGoal = (num) => ({ type: actionTypes.CHANGE_INT_GOAL, num });

export const changeNoteGoal = (num) => ({ type: actionTypes.CHANGE_NOTE_GOAL, num });

export const changeChordGoal = (num) => ({ type: actionTypes.CHANGE_CHORD_GOAL, num });

export const changeIntGoalReached = (bool) => ({ type: actionTypes.CHANGE_INT_GOAL_REACHED, bool });

export const changeNoteGoalReached = (bool) => ({ type: actionTypes.CHANGE_NOTE_GOAL_REACHED, bool });

export const changeChordGoalReached = (bool) => ({ type: actionTypes.CHANGE_CHORD_GOAL_REACHED, bool });
