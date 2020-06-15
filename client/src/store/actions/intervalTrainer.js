import { INC_WRONG_INT, INC_CORRECT_INT } from './actionTypes';

export const incCorrectInterval = (interval) => ({ type: INC_CORRECT_INT, interval });

export const incWrongInterval = (interval) => ({ type: INC_WRONG_INT, interval });
