import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { registerUser } from '../actions/userActions';
import '../StyleSheets/signup.css'
import { Redirect } from "react-router"

export default function SignUpScreen1() {
  const [email, setEmail] = useState('');
  const [uname, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [middlename, setMiddlename] = useState(null);
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const [showFirst, setShowFirst] = useState(true);
  const [showSecond, setShowSecond] = useState(false);

  // REDUX DISPATCHER 
  const dispatch = useDispatch();
  const dataSelector = useSelector((state) => 
    state.registerRes
  );
  const {loading, error, registerRes} = dataSelector;

  const submitHandler = (e) => {
    e.preventDefault();

    if(password != confirmpassword){
      return;
    }

    dispatch(registerUser({
      first_name: firstname,
      middle_name: middlename,
      last_name: lastname,
      username: uname,
      password: password,
      email_address: email,
      created_at: new Date(Date.now()).toISOString().replace(/T/, ' ').replace(/\..+/, '')
    }))
  };

  if(registerRes?.code === 'REGISTER_SUCCESS'){
    return(
      <Redirect to={{pathname: "/signIn", message: "Registration successful! You may now log in to your account."}}></Redirect>
    )
  }

  const switchToFirst = () => {
    setShowFirst(true);
    setShowSecond(false);
  }

  const switchToSecond = () => {
    setShowFirst(false);
    setShowSecond(true);
  }

  return (
    <div className="display" type="signup">
      <h1>Sign Up</h1>
      {
        registerRes?.message ? (
          <Alert variant={registerRes?.type}>{registerRes?.message + " Code: " + registerRes?.code}</Alert>
        ) : registerRes?.error ? (
          <Alert variant={registerRes?.type}>{registerRes?.error + " Code: " + registerRes?.code }</Alert>
        ) : (password != confirmpassword) ? (
          <Alert variant='warning'>Password is not match.</Alert>
        ) : (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) && showSecond) ? (
          <Alert variant='warning'>
            Password should be at least eight characters, has at least one uppercase letter, one lowercase letter, one number and one special character.
          </Alert>
        ) : ""
      }
      <form className="post" onSubmit={submitHandler}>
        {
          showFirst ? (
            <div>
              <div className="division">
                <input 
                  type="text"
                  id="username"
                  required
                  value={uname}
                  onChange={(e) => setUsername(e.target.value)}>
                </input> 
                <span></span>
                <label>Username</label>
              </div>

              <div className="division">
                <input 
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}></input>
                  <span></span>
                <label>Email</label>
              </div>

              <div className="division">
                <input 
                  type="text"
                  id="firstname"
                  required
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}>
                </input> 
                <span></span>
                <label>First Name</label>
              </div>

              <div className="division">
                <input 
                  type="text"
                  id="middlename"
                  required
                  value={middlename}
                  onChange={(e) => setMiddlename(e.target.value)}>
                </input> 
                <span></span>
                <label>Middle Name</label>
              </div>

              <div className="division">
                <input 
                  type="text"
                  id="lastname"
                  required
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}>
                </input> 
                <span></span>
                <label>Last Name</label>
              </div>

              <div className="btn_container">
                <button className="btn_next" type="next_signup1" onClick={switchToSecond}>
                  Next
                </button>
              </div>
            </div>
          ) : showSecond ? (
            <div>
              <div className="division">
                <input 
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}>
                </input>
                <span></span>
                <label>Password</label>
              </div>

              <div className="division">
                <input 
                  type="password"
                  id="confirmpassword"
                  required
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}>
                </input> 
                <span></span>
                <label>Confirm Password</label>
              </div>

              <div className="btn_container">
                <button className="btn_back" type="back_signup2" onClick={switchToFirst}>
                  Back
                </button>
                <button className="btn_next" type="next_signup2">
                  Submit
                </button>
              </div>
            </div>
          ) : <p></p>
        }
        <div className="signin">
          Already have an Account?
            <Link to="/SignIn">Sign In</Link>
        </div>

      </form>
    </div>
  );
}