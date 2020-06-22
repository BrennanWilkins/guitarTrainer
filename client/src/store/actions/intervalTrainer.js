import { INC_WRONG_INT, INC_CORRECT_INT } from './actionTypes';
import store from '../../store';

export const incCorrectInterval = (interval) => ({ type: INC_CORRECT_INT, interval, isAuth: store.getState().auth.isAuth });

export const incWrongInterval = (interval) => ({ type: INC_WRONG_INT, interval, isAuth: store.getState().auth.isAuth });
