import React, { useState  } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "../StyleSheets/NewCSSFiles/SignInSignUpFolder/SignInSignUp.css"
import { authenticateUser } from '../actions/userActions';
import PropTypes from 'prop-types';
import { Redirect, useHistory } from "react-router"
import { Alert, Fade, Grow, Typography, TextField, Button, CircularProgress} from '@mui/material';
import SignInImage from '../images/homePage/SignIn_SignUp.png'
import { makeStyles } from '@mui/styles';
import { status500 } from '../constants/stringConstants';
import { width } from '@mui/system';

const useStyles = makeStyles ({
  field:{
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: '0.25rem'
  },
  btn:{
    borderRadius: '1.5rem',
    width:'15rem',
    height:'2.5rem',
    color:'white',
    fontWeight:'500'
  }
})
export default function SignInScreen(props) {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  
  const dispatch = useDispatch();
  const dataSelector = useSelector((state) => 
    state.userAuth
  );
  const { loading, error, userAuth } = dataSelector;

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
      <div className="display" type="signin">
        <div className="SignInSignUp">
            <div className="SignInSignUp_container">
                <div className="SignInSignUp_section1">
                  <form method="post" onSubmit={submitHandler}>
                  
                    <div className="SignInSignUp_section1_header">
                        <h1 className='SignText_SectionHeader'>Sign In</h1>
                        {
                        userAuth?.access_token === null ? 
                          <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                              <Alert variant="filled" severity="error">{userAuth?.payload}</Alert>
                          </Grow>
                        : error ? 
                          <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                              <Alert variant="filled" severity="error">{error}</Alert>
                          </Grow>
                        : props.history.location.message ? 
                          <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                              <Alert variant="filled" severity="info">{ props.history.location.message}</Alert>
                          </Grow>
                        : typeof processed === "string" ?
                          <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                              <Alert variant="filled" severity="error">{status500}</Alert>
                          </Grow>
                        : null
                      }
                    </div>

                      
                    <div className="SignInSignUp_section1_fields">
                        <h6 className='SignText_Section'>Username</h6>
                        <TextField
                          hiddenLabel
                          variant="filled"
                          size="small"
                          color="secondary"
                          id="username"
                          required
                          onChange={(e) => setUsername(e.target.value)}
                          className={classes.field}
                        />
                        <h6 className='SignText_Section'>Password</h6>
                        <TextField
                          className={classes.field}
                          hiddenLabel
                          variant="filled"
                          size="small"
                          type="password"
                          color="secondary"
                          id="password"
                          required
                          onChange={(e) => setPassword(e.target.value)}
                          sx ={{
                            input: { color: 'black' }
                          }
                          }
                        />
                        <p className='SignText_Subtext'>Forgot Password?</p>
                    </div>
                    <div className="SignInSignUp_section1_footer">
                        {
                          loading ? <div><CircularProgress color="secondary" thickness={2.5} size={30}/>  <p className='SignText_btn'>Logging you in</p></div> :
                          <Button
                            variant="outlined"
                            color="secondary"
                            size = "medium"
                            className={classes.btn}
                            type="signin"
                          >
                            Sign In</Button>
                        }
                        <p className='SignText_btn'>Not a member? <Link to="/SignUp">Sign Up</Link> </p>
                    </div>
                  
                  </form>
                </div>
                    
                <div className="SignInSignUp_section2">
                  <h1 className='SignText_journey'>Start Your <n/> Journey</h1>
                </div>

              
            </div>
          



        </div>
      </div>
  );
}

SignInScreen.propTypes = {
  setToken: PropTypes.func.isRequired
}