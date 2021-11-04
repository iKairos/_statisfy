import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../StyleSheets/signin.css'

export default function SignInScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: sign in action
  };
  return (
    <div className="display" type="signin">
      <h1>Sign In</h1>
      <form method="post">
        <div className="division">
          <input 
            type="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}></input>
          <span></span>
          <label>Username</label>
        </div>

        <div className="division">
          <input 
            type="password"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}>
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