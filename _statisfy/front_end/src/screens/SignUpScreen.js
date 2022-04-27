import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../actions/userActions';
import "../StyleSheets/NewCSSFiles/SignInSignUpFolder/SignInSignUp.css"
import { Redirect } from "react-router"
import { Alert, Fade, Grow, TextField, Button, AlertTitle, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { passwordRequirement, status500 } from '../constants/stringConstants';


const useStyles = makeStyles ({
  field:{
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: '0.25rem'
  },
  btn:{
    borderRadius: '1.5rem',
    width:'8rem',
    height:'2.5rem',
    color:'white',
    fontWeight:'500',
    paddingLeft:'0.5rem',
    paddingRight:'0.5rem'
  }
})

export default function SignUpScreen1(props) {
  // ======= FUNCTION-WIDE VARIABLES ======= //
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [uname, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [middlename, setMiddlename] = useState(null);
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [submitError, setSubmitError] = useState(null)

  const [showFirst, setShowFirst] = useState(true);
  const [showSecond, setShowSecond] = useState(false);

  // ======= REGISTER FUNCTION ======= //
  const dispatch = useDispatch();
  const dataSelector = useSelector((state) => 
    state.registerRes
  );
  const {loading, registerRes} = dataSelector;

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
    

    if(uname === "" || password === "" || firstname === "" || lastname === "" || email === ""){
      setSubmitError("One of the required fields are missing. Please complete the form to proceed.");
      return;
    }
    setShowFirst(false);
    setShowSecond(true);
  }

  const submitHandlerFirst = (e) => {
    e.preventDefault();

    
    if(uname === "" || password === "" || firstname === "" || lastname === "" || email === ""){
      setSubmitError("One of the required fields are missing. Please complete the form to proceed.");
      return;
    }
  };

  const submitHandlerSecond = (e) => {
    e.preventDefault();

    if(password != confirmpassword){
      return;
    }


    dispatch(registerUser({
      first_name: firstname,
      middle_name: middlename === "" ? null : middlename,
      last_name: lastname,
      username: uname,
      password: password,
      email_address: email,
      created_at: new Date(Date.now()).toISOString()
    }))
  };

  return (
      <div className="display" type="signup">
        <div className="SignInSignUp">
        {showFirst &&(
          <div className="SignInSignUp_container">
              <div className="SignInSignUp_SignIn1">
                <form className="post" onSubmit={submitHandlerFirst}>
                  <div className="SignInSignUp_SignIn1_header">
                      <h1 className='SignText_SectionHeader'>Sign Up</h1>
                      {
                        registerRes?.message ? (
                          <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                            <Alert variant="filled" severity={registerRes?.type}>
                              <AlertTitle>{`Error Code: ${registerRes?.code }`}</AlertTitle>
                              {registerRes?.message}
                            </Alert>
                          </Grow>
                        ) : registerRes?.error ? (
                          <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                            <Alert variant="filled" severity={registerRes?.type}>
                              <AlertTitle>{`Error Code: ${registerRes?.code }`}</AlertTitle>
                              {registerRes?.error}
                            </Alert>
                          </Grow>
                        ) : (password != confirmpassword) ? (
                          <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                            <Alert variant="filled" severity="warning">Password do not match.</Alert>
                          </Grow>
                        ) : (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) && showSecond) ? (
                          <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                            <Alert variant="filled" severity="warning">{passwordRequirement}</Alert>
                          </Grow>
                        ) : typeof processed === "string" ?
                          <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                              <Alert variant="filled" severity="error">
                                <AlertTitle>Response Code 500</AlertTitle>
                                {status500}
                              </Alert>
                          </Grow>
                        : submitError ?
                          <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                            <Alert variant="filled" severity="warning">
                              {submitError}
                            </Alert>
                          </Grow>
                        : null
                      }
                  </div>

                  <div className="SignInSignUp_SignIn1_fields">
                      <div className="SignInSignUp_SignIn1_fields_column">
                        <h6 className='SignText_Section'>Username</h6>
                        <TextField
                          hiddenLabel
                          variant="filled"
                          size="small"
                          color="secondary"
                          id="username"
                          required
                          className={classes.field}
                          value={uname}
                          onChange={(e) => setUsername(e.target.value)}
                          type="text"
                        />
                      </div>

                      <div className="SignInSignUp_SignIn1_fields_column">
                        <h6 className='SignText_Section'>First Name</h6>
                        <TextField
                          hiddenLabel
                          variant="filled"
                          size="small"
                          color="secondary"
                          required
                          className={classes.field}
                          type="text"
                          id="firstname"
                          value={firstname}
                          onChange={(e) => setFirstname(e.target.value)}
                        />
                      </div>

                      <div className="SignInSignUp_SignIn1_fields_column">
                        <h6 className='SignText_Section'>E-mail</h6>
                        <TextField
                          hiddenLabel
                          variant="filled"
                          size="small"
                          color="secondary"
                          className={classes.field}
                          type="email"
                          id="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="SignInSignUp_SignIn1_fields_column">
                        <h6 className='SignText_Section'>Middle Name</h6>
                        <TextField
                          hiddenLabel
                          variant="filled"
                          size="small"
                          color="secondary"
                          required
                          className={classes.field}
                          type="text"
                          id="middlename"
                          value={middlename}
                          onChange={(e) => setMiddlename(e.target.value)}
                        />
                      </div>

                      <div className="SignInSignUp_SignIn1_fields_column">
                      </div>
                      <div className="SignInSignUp_SignIn1_fields_column">
                        <h6 className='SignText_Section'>Last Name</h6>
                        <TextField
                          hiddenLabel
                          variant="filled"
                          size="small"
                          color="secondary"
                          className={classes.field}
                          type="text"
                          id="lastname"
                          required
                          value={lastname}
                          onChange={(e) => setLastname(e.target.value)}
                        />
                      </div>
                  </div>
                  <div className="SignInSignUp_SignIn1_footer_btnCont">
                      <div></div>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size = "medium"
                        className={classes.btn}
                        type="button" 
                        onClick={switchToSecond}
                      >
                      Next</Button>
                  </div>

                </form>
              </div>
              
            <div className="SignInSignUp_section2">
              <h1 className='SignText_journey'>Start Your <n/> Journey</h1>
            </div> 
          </div>
        )}
        {showSecond &&(
          <div className="SignInSignUp_container">
            <div className="SignInSignUp_SignIn1">
              <form className="post" onSubmit={submitHandlerSecond}>
                <div className="SignInSignUp_SignIn1_header">
                    <h1 className='SignText_SectionHeader'>Sign Up</h1>
                    {
                      registerRes?.message ? (
                        <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                          <Alert variant="filled" severity={registerRes?.type}>
                            <AlertTitle>{`Error Code: ${registerRes?.code }`}</AlertTitle>
                            {registerRes?.message}
                          </Alert>
                        </Grow>
                      ) : registerRes?.error ? (
                        <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                          <Alert variant="filled" severity={registerRes?.type}>
                            <AlertTitle>{`Error Code: ${registerRes?.code }`}</AlertTitle>
                            {registerRes?.error}
                          </Alert>
                        </Grow>
                      ) : (password != confirmpassword) ? (
                        <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                          <Alert variant="filled" severity="warning">Password do not match.</Alert>
                        </Grow>
                      ) : (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) && showSecond) ? (
                        <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                          <Alert variant="filled" severity="warning">{passwordRequirement}</Alert>
                        </Grow>
                      ) : typeof processed === "string" ?
                        <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                            <Alert variant="filled" severity="error">
                              <AlertTitle>Response Code 500</AlertTitle>
                              {status500}
                            </Alert>
                        </Grow>
                      : submitError ?
                        <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                          <Alert variant="filled" severity="warning">
                            {submitError}
                          </Alert>
                        </Grow>
                      : null
                    }
                </div>
                <div className="SignInSignUp_SignIn1_fields">
                  <div className="SignInSignUp_SignIn1_fields_column">
                    <h6 className='SignText_Section'>Password</h6>
                    <TextField
                      hiddenLabel
                      variant="filled"
                      size="small"
                      color="secondary"
                      className={classes.field}
                      type="password"
                      id="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="SignInSignUp_SignIn1_fields_column">
                    <h6 className='SignText_Section'>Confirm Password</h6>
                    <TextField
                      hiddenLabel
                      variant="filled"
                      size="small"
                      color="secondary"
                      className={classes.field}
                      id="confirmpassword"
                      required
                      value={confirmpassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type="password"
                    />
                  </div>

                </div>
                {
                  loading ? <CircularProgress color="secondary" thickness={2.5} size={30}/>:
                  <div className="SignInSignUp_SignIn1_footer_btnCont">
                      <Button
                          variant="outlined"
                          color="secondary"
                          size = "medium"
                          className={classes.btn}
                          type="button" 
                          onClick={switchToFirst}
                        >
                        Back</Button>
                      <Button
                          variant="outlined"
                          color="secondary"
                          size = "medium"
                          className={classes.btn}
                          type="submit"
                        >
                      Submit</Button>
                  </div>
                }
                
                
              </form>
            </div>
            <div className="SignInSignUp_section2">
              <h1 className='SignText_journey'>Start Your <n/> Journey</h1>
            </div> 
        </div>
        )}
        </div>
        </div>
  );
}