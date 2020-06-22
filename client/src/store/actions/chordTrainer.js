import { INC_CORRECT_CHORD, INC_WRONG_CHORD } from './actionTypes';
import store from '../../store';

export const incCorrectChord = () => ({ type: INC_CORRECT_CHORD, isAuth: store.getState().auth.isAuth });

export const incWrongChord = () => ({ type: INC_WRONG_CHORD, isAuth: store.getState().auth.isAuth });
