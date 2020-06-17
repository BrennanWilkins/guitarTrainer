import React, { useState, Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import NavBar from './components/NavBar/NavBar';
import SwitchOrientation from './components/SwitchOrientation/SwitchOrientation';
import Spinner from './components/UI/Spinner/Spinner';
import Home from './components/Home/Home';
import { createStore, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import statsReducer from './store/reducers/stats';
import goalReducer from './store/reducers/goals';
const IntervalTrainer = React.lazy(() => import('./containers/IntervalTrainer/IntervalTrainer'));
const NoteTrainer = React.lazy(() => import('./containers/NoteTrainer/NoteTrainer'));
const ChordTrainer = React.lazy(() => import('./containers/ChordTrainer/ChordTrainer'));
const Stats = React.lazy(() => import('./containers/Stats/Stats'));

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  stats: statsReducer,
  goals: goalReducer
});

const store = createStore(rootReducer, composeEnhancers());

const App = () => {
  const [showSwitch, setShowSwitch] = useState(window.innerHeight > window.innerWidth);
  const [ignoreSwitch, setIgnoreSwitch] = useState(false);

  window.addEventListener('resize', () => {
    setShowSwitch(window.innerHeight > window.innerWidth);
  });

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <NavBar />
          <SwitchOrientation show={showSwitch && !ignoreSwitch} ignore={() => setIgnoreSwitch(true)}/>
          <Switch>
            <Route exact path="/interval-trainer" render={() => <Suspense fallback={<Spinner />}><IntervalTrainer /></Suspense>} />
            <Route exact path="/note-trainer" render={() => <Suspense fallback={<Spinner />}><NoteTrainer /></Suspense>} />
            <Route exact path="/chord-trainer" render={() => <Suspense fallback={<Spinner />}><ChordTrainer /></Suspense>} />
            <Route exact path="/stats" render={() => <Suspense fallback={<Spinner />}><Stats /></Suspense>} />
            <Route exact path="/login" render={() => <h1>Login Page</h1>} />
            <Route exact path="/signup" render={() => <h1>Signup Page</h1>} />
            <Route exact path="/" component={Home} />
            <Redirect to="/" />
          </Switch>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
