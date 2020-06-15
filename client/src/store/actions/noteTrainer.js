import { INC_WRONG_NOTE, INC_CORRECT_NOTE } from './actionTypes';

export const incCorrectNote = (note) => ({ type: INC_CORRECT_NOTE, note });

export const incWrongNote = (note) => ({ type: INC_WRONG_NOTE, note });
