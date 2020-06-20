import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ignoreGoal: false,
  showGoalPanel: false,
  intGoal: 0,
  intGoalReached: false,
  noteGoal: 0,
  noteGoalReached: false,
  chordGoal: 0,
  chordGoalReached: false
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.IGNORE_GOAL: return { ...state, ignoreGoal: true };
    case actionTypes.SHOW_GOAL_PANEL: return { ...state, showGoalPanel: action.bool };
    case actionTypes.CHANGE_INT_GOAL: return { ...state, intGoal: action.num };
    case actionTypes.CHANGE_NOTE_GOAL: return { ...state, noteGoal: action.num };
    case actionTypes.CHANGE_CHORD_GOAL: return { ...state, chordGoal: action.num };
    case actionTypes.CHANGE_INT_GOAL_REACHED: return { ...state, intGoalReached: action.bool };
    case actionTypes.CHANGE_NOTE_GOAL_REACHED: return { ...state, noteGoalReached: action.bool };
    case actionTypes.CHANGE_CHORD_GOAL_REACHED: return { ...state, chordGoalReached: action.bool };
    default: return state;
  }
};

export default reducer;
