import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../StyleSheets/signin.css'
import { authenticateUser } from '../actions/userActions';
import PropTypes from 'prop-types';
import { useHistory } from "react-router"

export default function SignInScreen({ setToken }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  const history = useHistory();
  
  const dispatch = useDispatch();
  const dataSelector = useSelector((state) => 
    state.userAuth
  );
  const {loading, error, userAuth} = dataSelector;

  if(typeof userAuth != 'undefined'){
    if(userAuth.access_token != null){
      setToken(userAuth.access_token);
      history.push('/');
      history.go(0);
      return;
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    
    dispatch(authenticateUser(username, password)); 
  };

  /*
  useEffect(() => {
    if(typeof userAuth != 'undefined'){
      if(userAuth.access_token === null){
        setErrorMessage(userAuth.payload)
      }else if(userAuth.access_token != null){
        setToken(userAuth.access_token);
        setSuccess(true);
      }
    }
  });
  */

  return (
    <div className="display" type="signin">
      <h1>Sign In</h1>
      {
        userAuth?.access_token === null ? <p>{userAuth?.payload}</p> : error ? <p>{error}</p> : <p></p>
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
          <Link to="/SignUp1">Sign Up</Link>
        </div>

      </form>
    </div>
  );
}

SignInScreen.propTypes = {
  setToken: PropTypes.func.isRequired
}