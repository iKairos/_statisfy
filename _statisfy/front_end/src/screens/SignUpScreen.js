import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../StyleSheets/signup.css'

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [lastname, setLastname] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: sign in action
  };
  const clickNext = () => {
    console.log('Twice')
  };

  const clickBack = () => {
    console.log('Twice')
  };
  return (
    <div className="display" type="signup">
      <h1>Sign Up</h1>
      <form className="post">
        <div className="division">
          <input 
            type="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}></input>
            <span></span>
          <label>Email</label>
        </div>

        <div className="division">
          <input 
            type="firstname"
            id="firstname"
            required
            onChange={(e) => setFirstname(e.target.value)}>
          </input> 
          <span></span>
          <label>First Name</label>
        </div>

        <div className="division">
          <input 
            type="middlename"
            id="middlename"
            required
            onChange={(e) => setMiddlename(e.target.value)}>
          </input> 
          <span></span>
          <label>Middle Name</label>
        </div>

        <div className="division">
          <input 
            type="lastname"
            id="lastname"
            required
            onChange={(e) => setLastname(e.target.value)}>
          </input> 
          <span></span>
          <label>Last Name</label>
        </div>

        <div className="btn_container">
          <button className="btn_back" type="back" onClick={clickBack} >
            Back
          </button>
          <button className="btn_next" type="next" onClick={clickNext}>
            Next
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