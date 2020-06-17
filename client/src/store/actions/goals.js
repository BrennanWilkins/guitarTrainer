import { IGNORE_GOAL, SHOW_GOAL_PANEL } from './actionTypes';

export const setIgnoreGoal = () => ({ type: IGNORE_GOAL });

export const setShowGoalPanel = (bool) => ({ type: SHOW_GOAL_PANEL, bool });
