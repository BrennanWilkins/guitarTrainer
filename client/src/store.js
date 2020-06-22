import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import statsReducer from './store/reducers/stats';
import goalReducer from './store/reducers/goals';
import authReducer from './store/reducers/auth';
import thunk from 'redux-thunk';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  stats: statsReducer,
  goals: goalReducer,
  auth: authReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
