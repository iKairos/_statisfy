// dependencies
import React, {useEffect} from 'react';
import { Container } from 'react-bootstrap'
import { processUserToken } from './actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter, Route, Switch } from 'react-router-dom'

// components
import Header from './components/Header'

// screens
import HomeScreen from './screens/HomeScreen';
import UserScreen from './screens/UserScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ResearchScreen from './screens/ResearchScreen';
import GuidesScreen from './screens/GuidesScreen';
import ResearchList from './components/newDashBoard/ResearchList';

// stylesheets
import './App.css';

// token handling
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();

  const dispatch = useDispatch();
  const dataSelector = useSelector((state) => 
    state.decodedUserToken
  );
  const {loading, error, processed} = dataSelector;

  if(token && processed?.code === "TOKEN_FAIL"){
    localStorage.removeItem('token');
  }

  useEffect(() => {
    dispatch(processUserToken(token));
  }, [])
  console.log(processed)
  return (
    <BrowserRouter>
      <div className="wrapper">
              <Header loading={loading} token={token} user={processed?.user} />

              <div>
                <Switch>
                  <Route path = "/" exact component={HomeScreen}></Route>
                  <Route path = "/profile" render={(props) => <UserScreen token={token} isUser={true}/>} exact></Route>
                  <Route path = "/profile/:id?" render={(props) => <UserScreen token={token}/>} exact></Route>
                  <Route path = "/dashboard/:id?" render={(props) => <ResearchScreen token={token}/>} exact></Route>
                  <Route path = "/guides" exact component={GuidesScreen}></Route>
                  <Route path = "/signIn" exact render={(props) => <SignInScreen setToken={setToken} token={token} {...props}/>}/>
                  <Route path = "/signUp" exact render={() => <SignUpScreen token={token} />}></Route>
                </Switch>
              </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
