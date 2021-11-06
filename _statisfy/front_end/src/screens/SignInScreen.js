import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../StyleSheets/signin.css'
import { authenticateUser } from '../actions/userActions';

export default function SignInScreen() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const dataSelector = useSelector((state) => 
    state.userAuth
  );
  const {loading, error, userAuth} = dataSelector;

  const submitHandler = (e) => {
    e.preventDefault();
    
    dispatch(authenticateUser(username, password)); 
  };

  return (
    <div className="display" type="signin">
      <h1>Sign In</h1>
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