import React, { useState } from 'react';
import classes from './AuthPanel.module.css';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import '../../components/UI/compAnims.css';
import { setShowAuthPanel, setIsAuth, setUserId, setToken, setStats, setStatsId } from '../../store/actions/index';
import CloseBtn from '../../components/UI/CloseBtn/CloseBtn';
import { personIcon, lockIcon } from '../../components/UI/UIIcons';
import { validate } from '../../utils/authValidation';
import { authInstance as axios, instance } from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';

const AuthPanel = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const showErr = (msg) => {
    setErr(true);
    setLoading(false);
    setErrMsg(msg);
  };

  const successHandler = (data) => {
    setLoading(false);
    props.setStats(data.stats);
    instance.defaults.headers.common['x-auth-token'] = data.token;
    props.setUserId(data.userId);
    props.setToken(data.token);
    props.setStatsId(data.stats._id);
    props.setIsAuth();
    closeHandler();
  };

  const loginHandler = () => {
    setLoading(true);
    axios.post('login', { email, password }).then(res => {
      if (res.status !== 200) { return showErr(res.data.msg); }
      successHandler(res.data);
    }).catch(err => {
      showErr(err.response.data.msg);
    });
  };

  const signupHandler = () => {
    setLoading(true);
    axios.post('signup', { email, password }).then(res => {
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
          {props.loading && <Spinner />}
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
              <input type="checkbox" />
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
  mode: state.auth.authMode,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  setShowAuthPanel: () => dispatch(setShowAuthPanel(false)),
  setIsAuth: () => dispatch(setIsAuth(true)),
  setUserId: (id) => dispatch(setUserId(id)),
  setToken: (token) => dispatch(setToken(token)),
  setStats: (stats) => dispatch(setStats(stats)),
  setStatsId: (id) => dispatch(setStatsId(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthPanel);
