import { IGNORE_GOAL, SHOW_GOAL_PANEL } from '../actions/actionTypes';

const initialState = {
  ignoreGoal: false,
  showGoalPanel: false
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case IGNORE_GOAL: return { ...state, ignoreGoal: true };
    case SHOW_GOAL_PANEL: return { ...state, showGoalPanel: action.bool };
    default: return state;
  }
};

export default reducer;
