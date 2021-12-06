import React, { useState  } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../StyleSheets/signin.css'
import { authenticateUser } from '../actions/userActions';
import PropTypes from 'prop-types';
import { Redirect, useHistory } from "react-router"
import { Alert, Fade, Grow } from '@mui/material';
import { status500 } from '../constants/stringConstants';

export default function SignInScreen(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  
  const dispatch = useDispatch();
  const dataSelector = useSelector((state) => 
    state.userAuth
  );
  const { error, userAuth } = dataSelector;

  // process token
  const tokSelector = useSelector((state) => 
      state.decodedUserToken
  );
  const {processed} = tokSelector;

  if(typeof userAuth != 'undefined'){
    if(userAuth.access_token != null){
      props.setToken(userAuth.access_token);
      history.push('/');
      history.go(0);
      return;
    }
  }
  
  const submitHandler = (e) => {
    e.preventDefault();
    
    dispatch(authenticateUser(username, password)); 
  };

  if(props.token && processed?.code === "TOKEN_FAIL"){
    localStorage.removeItem('token');
  }

  if(props.token && processed?.code == "TOKEN_SUCCESS"){
    return(
      <Redirect to={{pathname: "/profile"}}></Redirect>
    )
  }

  return (
    <Fade in={true}>
      <div className="display" type="signin">
        <h1>Sign In</h1>
        {
          userAuth?.access_token === null ? 
            <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                <Alert variant="outlined" severity="error">{userAuth?.payload}</Alert>
            </Grow>
          : error ? 
            <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                <Alert variant="outlined" severity="error">{error}</Alert>
            </Grow>
          : props.history.location.message ? 
            <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                <Alert variant="outlined" severity="info">{ props.history.location.message}</Alert>
            </Grow>
          : typeof processed === "string" ?
            <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                <Alert variant="outlined" severity="error">{status500}</Alert>
            </Grow>
          : null
        }
        <form method="post" onSubmit={submitHandler}>
          <div className="division">
            <input 
              type="text"
              id="username"
              required
              onChange={(e) => setUsername(e.target.value)}></input>
            <span></span>
            <label>Username</label>
          </div>

          <div className="division">
            <input 
              type="password"
              id="password"
              required
              onChange={(e) => setPassword(e.target.value)}>
            </input> 
            <span></span>
            <label>Password</label>
          </div>

          <div className="forgot">
            Forgot Password?
          </div>

          <div>
            <button className="btn_signin" type="signin" id="signin">
              Sign In
            </button>
          </div>

          <div className="signup" type="signup" id="signup">
            Not a member? 
            <Link to="/SignUp">Sign Up</Link>
          </div>

        </form>
      </div>
    </Fade>
  );
}

SignInScreen.propTypes = {
  setToken: PropTypes.func.isRequired
}