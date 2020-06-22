import { SHOW_AUTH_PANEL, SET_AUTH_MODE, LOGIN, LOGOUT } from '../actions/actionTypes';

const initialState = {
  showAuthPanel: false,
  authMode: 'Login',
  isAuth: false
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SHOW_AUTH_PANEL: return { ...state, showAuthPanel: action.bool };
    case SET_AUTH_MODE: return { ...state, authMode: action.mode };
    case LOGIN: return { ...state, isAuth: true };
    case LOGOUT: return { ...state, isAuth: false };
    default: return state;
  }
};

export default reducer;
