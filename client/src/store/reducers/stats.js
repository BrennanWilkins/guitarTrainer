import * as actionTypes from '../actions/actionTypes';
import { initialNotes, initialIntervals } from '../../utils/statFuncs';

const initialState = {
  totCorrect: 0,
  totWrong: 0,
  totChordCorrectToday: 0,
  totIntCorrectToday: 0,
  totNoteCorrectToday: 0,
  chordCorrect: 0,
  chordWrong: 0,
  intervalsCorrect: { ...initialIntervals },
  intervalsWrong: { ...initialIntervals },
  notesCorrect: { ...initialNotes },
  notesWrong: { ...initialNotes },
  pracModeInt: false,
  pracModeNote: false,
  statsId: null
};

const getTotCorrect = (stats) => {
  let total = stats.chordCorrect;
  for (let key in stats.intervalsCorrect) { total += stats.intervalsCorrect[key]; }
  for (let key in stats.notesCorrect) { total += stats.notesCorrect[key]; }
  return total;
};

const getTotWrong = (stats) => {
  let total = stats.chordWrong;
  for (let key in stats.intervalsWrong) { total += stats.intervalsWrong[key]; }
  for (let key in stats.notesWrong) { total += stats.notesWrong[key]; }
  return total;
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
        totChordCorrectToday: 0,
        totIntCorrectToday: 0,
        totNoteCorrectToday: 0,
        chordCorrect: 0,
        chordWrong: 0,
        intervalsCorrect: { ...initialIntervals },
        intervalsWrong: { ...initialIntervals },
        notesCorrect: { ...initialNotes },
        notesWrong: { ...initialNotes }
      };
    case actionTypes.INC_CORRECT_INT:
      return {
        ...state,
        totCorrect: state.totCorrect + 1,
        totIntCorrectToday: state.totIntCorrectToday + 1,
        intervalsCorrect: {
          ...state.intervalsCorrect,
          [action.interval]: state.intervalsCorrect[action.interval] + 1
        }
      };
    case actionTypes.INC_WRONG_INT:
      return {
        ...state,
        totWrong: state.totWrong + 1,
        intervalsWrong: {
          ...state.intervalsWrong,
          [action.interval]: state.intervalsWrong[action.interval] + 1
        }
      };
    case actionTypes.INC_CORRECT_NOTE:
      return {
        ...state,
        totCorrect: state.totCorrect + 1,
        totNoteCorrectToday: state.totNoteCorrectToday + 1,
        notesCorrect: {
          ...state.notesCorrect,
          [action.note]: state.notesCorrect[action.note] + 1
        }
      };
    case actionTypes.INC_WRONG_NOTE:
      return {
        ...state,
        totWrong: state.totWrong + 1,
        notesWrong: {
          ...state.notesWrong,
          [action.note]: state.notesWrong[action.note] + 1
        }
      };
    case actionTypes.INC_CORRECT_CHORD:
      return {
        ...state,
        totCorrect: state.totCorrect + 1,
        totChordCorrectToday: state.totChordCorrectToday + 1,
        chordCorrect: state.chordCorrect + 1
      };
    case actionTypes.INC_WRONG_CHORD:
      return {
        ...state,
        totWrong: state.totWrong + 1,
        chordWrong: state.chordWrong + 1
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
    case actionTypes.SET_STATS:
      return {
        ...state,
        totCorrect: getTotCorrect(action.stats),
        totWrong: getTotWrong(action.stats),
        chordCorrect: { ...action.stats.chordCorrect },
        chordWrong: { ...action.stats.chordWrong },
        intervalsCorrect: { ...action.stats.intervalsCorrect },
        intervalsWrong: { ...action.stats.intervalsWrong },
        notesCorrect: { ...action.stats.notesCorrect },
        notesWrong: { ...action.stats.notesWrong },
        totNoteCorrectToday: action.stats.totNoteCorrectToday,
        totIntCorrectToday: action.stats.totIntCorrectToday,
        totChordCorrectToday: action.stats.totChordCorrectToday
      };
    case actionTypes.SET_STATSID:
      return {
        ...state,
        statsId: action.id
      };
    default: return state;
  }
};

export default reducer;
