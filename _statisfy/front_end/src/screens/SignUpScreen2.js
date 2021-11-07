import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../StyleSheets/signup.css'

export default function SignUpScreen2() {
  const [password, setPassword] = useState('');
  const [firstname, setConfirmPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: sign in action
  };
  return (
    <div className="display" type="signup">
      <h1>Sign Up</h1>
      <form className="post">
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

        <div className="division">
          <input 
            type="confirmpassword"
            id="confirmpassword"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}>
          </input> 
          <span></span>
          <label>Confirm Password</label>
        </div>

        <div className="btn_container">
          <button className="btn_back" type="back_signup2">
            <Link to="/SignUp1">Back</Link>
          </button>
          <button className="btn_next" type="next_signup2">
            <Link to="/SignIn">Next</Link> 
          </button>
        </div>

        <div className="signin">
          Already have an Account?
            <Link to="/SignIn">Sign In</Link>
        </div>

      </form>
    </div>
  );
}