import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import NavBar from './components/NavBar/NavBar';
import SwitchOrientation from './components/SwitchOrientation/SwitchOrientation';
import Spinner from './components/UI/Spinner/Spinner';
import Home from './components/Home/Home';
import SetGoalPanel from './components/SetGoalPanel/SetGoalPanel';
import AuthPanel from './containers/AuthPanel/AuthPanel';
import { connect } from 'react-redux';
import { logout, reset } from './store/actions/index';
const IntervalTrainer = React.lazy(() => import('./containers/IntervalTrainer/IntervalTrainer'));
const NoteTrainer = React.lazy(() => import('./containers/NoteTrainer/NoteTrainer'));
const ChordTrainer = React.lazy(() => import('./containers/ChordTrainer/ChordTrainer'));
const Stats = React.lazy(() => import('./containers/Stats/Stats'));

const App = props => {
  const [showSwitch, setShowSwitch] = useState(window.innerHeight > window.innerWidth);
  const [ignoreSwitch, setIgnoreSwitch] = useState(false);

  window.addEventListener('resize', () => {
    setShowSwitch(window.innerHeight > window.innerWidth);
  });

  useEffect(() => {
    return () => { props.logout(); props.reset(); };
  }, []);

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <NavBar />
        <SetGoalPanel />
        <AuthPanel />
        <SwitchOrientation show={showSwitch && !ignoreSwitch} ignore={() => setIgnoreSwitch(true)} />
        <Switch>
          <Route exact path="/interval-trainer" render={() => <Suspense fallback={<Spinner />}><IntervalTrainer /></Suspense>} />
          <Route exact path="/note-trainer" render={() => <Suspense fallback={<Spinner />}><NoteTrainer /></Suspense>} />
          <Route exact path="/chord-trainer" render={() => <Suspense fallback={<Spinner />}><ChordTrainer /></Suspense>} />
          <Route exact path="/stats" render={() => <Suspense fallback={<Spinner />}><Stats /></Suspense>} />
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  reset: () => dispatch(reset())
});

export default connect(null, mapDispatchToProps)(App);
