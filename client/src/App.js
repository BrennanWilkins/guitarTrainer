import React, { useState, Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import NavBar from './components/NavBar/NavBar';
import SwitchOrientation from './components/SwitchOrientation/SwitchOrientation';
import Spinner from './components/UI/Spinner/Spinner';
const IntervalTrainer = React.lazy(() => import('./containers/IntervalTrainer/IntervalTrainer'));
const NoteTrainer = React.lazy(() => import('./containers/NoteTrainer/NoteTrainer'));

const App = () => {
  const [showSwitch, setShowSwitch] = useState(window.innerHeight > window.innerWidth);
  const [ignoreSwitch, setIgnoreSwitch] = useState(false);

  window.addEventListener('resize', () => {
    setShowSwitch(window.innerHeight > window.innerWidth);
  });

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <NavBar />
        <SwitchOrientation show={showSwitch && !ignoreSwitch} ignore={() => setIgnoreSwitch(true)}/>
        <Switch>
          <Route exact path="/interval-trainer" render={() => <Suspense fallback={<Spinner />}><IntervalTrainer /></Suspense>} />
          <Route exact path="/note-trainer" component={() => <Suspense fallback={<Spinner />}><NoteTrainer /></Suspense>} />
          <Route exact path="/stats" />
          <Route exact path="/login" render={() => <h1>Login Page</h1>} />
          <Route exact path="/signup" render={() => <h1>Signup Page</h1>} />
          <Route exact path="/" render={() => <h1>Home</h1>} />
          <Route exact path="/stats" render={() => <h1>Stats</h1>} />
          <Redirect to="/" />
        </Switch>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
