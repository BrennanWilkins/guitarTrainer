import { SHOW_AUTH_PANEL, SET_AUTH_MODE, SET_IS_AUTH, LOGOUT, SET_USERID, SET_TOKEN } from './actionTypes';

export const setShowAuthPanel = (bool) => ({ type: SHOW_AUTH_PANEL, bool });

export const setAuthMode = (mode) => ({ type: SET_AUTH_MODE, mode });

export const setIsAuth = (bool) => ({ type: SET_IS_AUTH, bool });

export const logout = () => ({ type: LOGOUT });

export const setUserId = (id) => ({ type: SET_USERID, id });

export const setToken = (token) => ({ type: SET_TOKEN, token });
