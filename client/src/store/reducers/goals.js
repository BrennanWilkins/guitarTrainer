import * as actionTypes from '../actions/actionTypes';
import { instance as axios } from '../../axios';

const updateGoals = (data) => {
  axios.put('goals/', { ...data }).catch(err => {
    console.log(err.response);
  });
};

const initialState = {
  ignoreGoal: false,
  showGoalPanel: false,
  intGoal: 0,
  noteGoal: 0,
  chordGoal: 0
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.IGNORE_GOAL: return { ...state, ignoreGoal: true };
    case actionTypes.SHOW_GOAL_PANEL: return { ...state, showGoalPanel: action.bool };
    case actionTypes.CHANGE_INT_GOAL:
      if (action.isAuth) { updateGoals({ intGoal: action.num, noteGoal: state.noteGoal, chordGoal: state.chordGoal }); }
      return { ...state, intGoal: action.num };
    case actionTypes.CHANGE_NOTE_GOAL:
      if (action.isAuth) { updateGoals({ intGoal: state.intGoal, noteGoal: action.num, chordGoal: state.chordGoal }); }
      return { ...state, noteGoal: action.num };
    case actionTypes.CHANGE_CHORD_GOAL:
      if (action.isAuth) { updateGoals({ intGoal: state.intGoal, noteGoal: state.noteGoal, chordGoal: action.num }); }
      return { ...state, chordGoal: action.num };
    case actionTypes.RESET_GOALS: return { ...initialState };
    case actionTypes.SET_GOALS:
      return {
        ...initialState,
        intGoal: action.goals.intGoal,
        noteGoal: action.goals.noteGoal,
        chordGoal: action.goals.chordGoal
      };
    default: return state;
  }
};

export default reducer;
