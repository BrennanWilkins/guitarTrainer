import React, { useState } from 'react';
import classes from './AuthPanel.module.css';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import '../../components/UI/compAnims.css';
import * as actions from '../../store/actions/index';
import CloseBtn from '../../components/UI/CloseBtn/CloseBtn';
import { personIcon, lockIcon } from '../../components/UI/UIIcons';
import { validate } from '../../utils/authValidation';
import { authInstance as axios, instance } from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import moment from 'moment';

const AuthPanel = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const showErr = (msg) => {
    setErr(true);
    setLoading(false);
    setErrMsg(msg);
  };

  const successHandler = (data) => {
    setLoading(false);
    instance.defaults.headers.common['x-auth-token'] = data.token;
    const today = String(moment().format('L'));
    const newData = { ...data.stats };
    if (data.stats.lastPlayed !== today) {
      newData.lastPlayed = today;
      newData.totIntCorrectToday = 0;
      newData.totNoteCorrectToday = 0;
      newData.totChordCorrectToday = 0;
      instance.put('stats/', newData).catch(err => {
        console.log(err.response);
      });
    }
    if (remember) {
      localStorage['token'] = data.token;
      // expires in 30 days
      localStorage['expirationDate'] = new Date(new Date().getTime() + 2592000000);
      localStorage['expirationTime'] = '2592000000';
    } else {
      // expires in 24hr
      localStorage['token'] = data.token;
      localStorage['expirationDate'] = new Date(new Date().getTime() + 86400000);
      localStorage['expirationTime'] = '86400000';
    }
    props.setStats(newData);
    props.setGoals(data.goals);
    props.login();
    closeHandler();
  };

  const loginHandler = () => {
    setLoading(true);
    axios.post('login', { email, password, remember }).then(res => {
      if (res.status !== 200) { return showErr(res.data.msg); }
      successHandler(res.data);
    }).catch(err => {
      showErr(err.response.data.msg);
    });
  };

  const signupHandler = () => {
    setLoading(true);
    axios.post('signup', { email, password, remember }).then(res => {
      if (res.status !== 200) { return showErr(res.data.msg); }
      successHandler(res.data);
    }).catch(err => {
      showErr(err.response.data.msg);
    });
  };

  const submitHandler = () => {
    const res = validate(email, password);
    setErrMsg(res);
    res === '' ? setErr(false) : setErr(true);
    if (res !== '') { return; }
    if (props.mode === 'Login') { return loginHandler(); }
    signupHandler();
  };

  const closeHandler = () => {
    setEmail('');
    setPassword('');
    setErr(false);
    setErrMsg('');
    props.setShowAuthPanel();
  };

  return (
    <div>
      <CSSTransition in={props.show} timeout={800} classNames="AuthPanel" mountOnEnter unmountOnExit>
        <div className={classes.Panel}>
          {loading && <Spinner login />}
          <CloseBtn close={closeHandler} />
          <div className={classes.Content}>
            <h1>{props.mode === 'Login' ? 'Log in' : 'Sign up'}</h1>
            <div className={classes.InputDiv}>
              <input
                value={email}
                placeholder="Email"
                spellCheck="false"
                onChange={(e) => { setEmail(e.target.value); setErr(false); }} />
              <span className={classes.Icon}>{personIcon}</span>
              <div className={classes.FocusBorder}></div>
            </div>
            <div className={classes.InputDiv}>
              <input
                type="password"
                value={password}
                placeholder="Password"
                spellCheck="false"
                onChange={(e) => { setPassword(e.target.value); setErr(false); }} />
              <span className={classes.Icon}>{lockIcon}</span>
              <div className={classes.FocusBorder}></div>
            </div>
            <div className={classes.Remember}>
              <input type="checkbox" onChange={() => setRemember(prev => !prev)} />
              <span>Remember me for 30 days</span>
            </div>
            <div className={classes.ErrDiv}>
              <span className={err ? classes.ErrMsgShow : classes.ErrMsgHide}>
                {errMsg}
              </span>
            </div>
            <button onClick={submitHandler}>
              {props.mode === 'Login' ? 'Log in' : 'Sign up'}
            </button>
          </div>
        </div>
      </CSSTransition>
      <CSSTransition in={props.show} timeout={800} classNames="BackdropOpacity" mountOnEnter unmountOnExit>
        <div className={classes.Container} onClick={closeHandler}>
        </div>
      </CSSTransition>
    </div>
  );
};

const mapStateToProps = state => ({
  show: state.auth.showAuthPanel,
  mode: state.auth.authMode
});

const mapDispatchToProps = dispatch => ({
  setShowAuthPanel: () => dispatch(actions.setShowAuthPanel(false)),
  login: () => dispatch(actions.login()),
  setStats: (stats) => dispatch(actions.setStats(stats)),
  setGoals: (goals) => dispatch(actions.setGoals(goals))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthPanel);
