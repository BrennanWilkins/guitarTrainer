import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import statsReducer from './store/reducers/stats';
import goalReducer from './store/reducers/goals';
import authReducer from './store/reducers/auth';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  stats: statsReducer,
  goals: goalReducer,
  auth: authReducer
});

const store = createStore(rootReducer, composeEnhancers());

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
