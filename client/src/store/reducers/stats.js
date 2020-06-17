import * as actionTypes from '../actions/actionTypes';

const initialIntervals = {
  'b2': 0,
  '2': 0,
  'b3': 0,
  '3': 0,
  '4': 0,
  'b5': 0,
  '5': 0,
  'b6': 0,
  '6': 0,
  'b7': 0,
  '7': 0,
  '8': 0
};

const initialNotes = {
  'A': 0,
  'Bb': 0,
  'B': 0,
  'C': 0,
  'Db': 0,
  'D': 0,
  'Eb': 0,
  'E': 0,
  'F': 0,
  'Gb': 0,
  'G': 0,
  'Ab': 0
};

const initialState = {
  totCorrect: 0,
  totWrong: 0,
  intervalsCorrect: { ...initialIntervals },
  intervalsWrong: { ...initialIntervals },
  notesCorrect: { ...initialNotes },
  notesWrong: { ...initialNotes },
  pracModeInt: false,
  pracModeNote: false
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.INC_CORRECT:
      return {
        ...state,
        totCorrect: state.totCorrect + 1
      };
    case actionTypes.INC_WRONG:
      return {
        ...state,
        totWrong: state.totWrong + 1
      };
    case actionTypes.RESET:
      return {
        ...state,
        totCorrect: 0,
        totWrong: 0,
        intervalsCorrect: { ...initialIntervals },
        intervalsWrong: { ...initialIntervals },
        notesCorrect: { ...initialNotes },
        notesWrong: { ...initialNotes }
      };
    case actionTypes.INC_CORRECT_INT:
      return {
        ...state,
        intervalsCorrect: {
          ...state.intervalsCorrect,
          [action.interval]: state.intervalsCorrect[action.interval] + 1
        }
      };
    case actionTypes.INC_WRONG_INT:
      return {
        ...state,
        intervalsWrong: {
          ...state.intervalsWrong,
          [action.interval]: state.intervalsWrong[action.interval] + 1
        }
      };
    case actionTypes.INC_CORRECT_NOTE:
      return {
        ...state,
        notesCorrect: {
          ...state.notesCorrect,
          [action.note]: state.notesCorrect[action.note] + 1
        }
      };
    case actionTypes.INC_WRONG_NOTE:
      return {
        ...state,
        notesWrong: {
          ...state.notesWrong,
          [action.note]: state.notesWrong[action.note] + 1
        }
      };
    case actionTypes.SET_PRAC_MODE_INT:
      return {
        ...state,
        pracModeInt: action.bool
      };
    case actionTypes.SET_PRAC_MODE_NOTE:
      return {
        ...state,
        pracModeNote: action.bool
      };
    default: return state;
  }
};

export default reducer;
