import { INC_WRONG_NOTE, INC_CORRECT_NOTE } from './actionTypes';
import store from '../../store';

export const incCorrectNote = (note) => ({ type: INC_CORRECT_NOTE, note, isAuth: store.getState().auth.isAuth });

export const incWrongNote = (note) => ({ type: INC_WRONG_NOTE, note, isAuth: store.getState().auth.isAuth });
