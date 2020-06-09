import React from 'react';
import classes from './ErrorBoundary.module.css';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  state = {
    hasError: false
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error, info);
  }

  render() {
    // if there was an error show custom error display
    if (this.state.hasError) {
      return (
        <div className={classes.Error}>
          <h1>Something went wrong.</h1>
          <Link to="/"><button>Back to Guitar Trainer Home</button></Link>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
