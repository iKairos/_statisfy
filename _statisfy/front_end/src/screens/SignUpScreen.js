import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../actions/userActions';
import '../StyleSheets/signup.css'
import { Redirect } from "react-router"
import { Alert, Fade, Grow } from '@mui/material';
import { passwordRequirement, status500 } from '../constants/stringConstants';

export default function SignUpScreen1(props) {
  // ======= FUNCTION-WIDE VARIABLES ======= //
  const [email, setEmail] = useState('');
  const [uname, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [middlename, setMiddlename] = useState(null);
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const [showFirst, setShowFirst] = useState(true);
  const [showSecond, setShowSecond] = useState(false);

  // ======= REGISTER FUNCTION ======= //
  const dispatch = useDispatch();
  const dataSelector = useSelector((state) => 
    state.registerRes
  );
  const {registerRes} = dataSelector;

  // ======= TOKEN HANDLING ======= //
  const tokSelector = useSelector((state) => 
      state.decodedUserToken
  );
  const {processed} = tokSelector;

  if(registerRes?.code === 'REGISTER_SUCCESS'){
    return(
      <Redirect to={{pathname: "/signIn", message: "Registration successful! You may now log in to your account."}}></Redirect>
    )
  }

  if(props.token && processed?.code === "TOKEN_FAIL"){
    localStorage.removeItem('token');
  }

  if(props.token && processed?.code == "TOKEN_SUCCESS"){
    return(
      <Redirect to={{pathname: "/profile"}}></Redirect>
    )
  }

  // ======= HANDLERS ======= //

  const switchToFirst = () => {
    setShowFirst(true);
    setShowSecond(false);
  }

  const switchToSecond = () => {
    setShowFirst(false);
    setShowSecond(true);
  }

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

  return (
    <Fade in={true}>
      <div className="display" type="signup">
        <h1>Sign Up</h1>
        {
          registerRes?.message ? (
            <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
              <Alert variant="outlined" severity={registerRes?.type}>{registerRes?.message + " Code: " + registerRes?.code}</Alert>
            </Grow>
          ) : registerRes?.error ? (
            <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
              <Alert variant="outlined" severity={registerRes?.type}>{registerRes?.error + " Code: " + registerRes?.code }</Alert>
            </Grow>
          ) : (password != confirmpassword) ? (
            <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
              <Alert variant="outlined" severity="warning">Password do not match.</Alert>
            </Grow>
          ) : (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) && showSecond) ? (
            <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
              <Alert variant="outlined" severity="warning">{passwordRequirement}</Alert>
            </Grow>
          ) : typeof processed === "string" ?
            <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                <Alert variant="outlined" severity="error">{status500}</Alert>
            </Grow>
          : null
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
    </Fade>
  );
}