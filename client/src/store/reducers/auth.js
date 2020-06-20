import { SHOW_AUTH_PANEL, SET_AUTH_MODE, SET_IS_AUTH, LOGOUT, SET_USERID, SET_TOKEN } from '../actions/actionTypes';
import { instance } from '../../axios';

const initialState = {
  showAuthPanel: false,
  authMode: 'Login',
  isAuth: false,
  userId: null,
  token: null
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SHOW_AUTH_PANEL: return { ...state, showAuthPanel: action.bool };
    case SET_AUTH_MODE: return { ...state, authMode: action.mode };
    case SET_IS_AUTH: return { ...state, isAuth: action.bool };
    case SET_USERID: return { ...state, userId: action.id };
    case SET_TOKEN: return { ...state, token: action.token };
    case LOGOUT:
      delete instance.defaults.headers.common['x-auth-token'];
      return { ...state, isAuth: false, userId: null, token: null };
    default: return state;
  }
};

export default reducer;
