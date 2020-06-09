import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import NavBar from './components/NavBar/NavBar';
import IntervalFinder from './containers/IntervalFinder/IntervalFinder';

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <NavBar />
        <Switch>
          <Route exact path="/interval-finder" component={IntervalFinder}/>
          <Route exact path="/interval-ear-trainer" />
          <Route exact path="/note-finder" />
          <Route exact path="/note-ear-trainer" />
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
