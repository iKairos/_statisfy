import React, { useState  } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../StyleSheets/signin.css'
import { authenticateUser } from '../actions/userActions';
import PropTypes from 'prop-types';
import { useHistory } from "react-router"
import { Alert } from 'react-bootstrap'

export default function SignInScreen(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  
  const dispatch = useDispatch();
  const dataSelector = useSelector((state) => 
    state.userAuth
  );
  const {loading, error, userAuth} = dataSelector;

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

  return (
    <div className="display" type="signin">
      <h1>Sign In</h1>
      {
        userAuth?.access_token === null ? 
        <Alert variant='danger'>{userAuth?.payload}</Alert> 
        : error ? 
        <Alert variant='danger'>{error}</Alert>
        : props.history.location.message ? 
        <Alert variant='info'>{props.history.location.message}</Alert>
        : ""
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
  );
}

SignInScreen.propTypes = {
  setToken: PropTypes.func.isRequired
}