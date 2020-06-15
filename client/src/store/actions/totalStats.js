import { INC_WRONG, INC_CORRECT, RESET } from './actionTypes';

export const incCorrect = () => ({ type: INC_CORRECT });

export const incWrong = () => ({ type: INC_WRONG });

export const reset = () => ({ type: RESET });
