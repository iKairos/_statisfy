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
import DashboardScreen from './screens/DashboardScreen';
import StatScreen from './screens/StatScreen';
import MLScreen from './DashboardContents/MachineLearning';
import PearsonScreen from './screens/PearsonScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

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

  return (
    <BrowserRouter>
      <div className="wrapper">
              <Header loading={loading} user={processed?.user} />

              <div>
                <Switch>
                  <Route path = "/" exact component={HomeScreen}></Route>
                  <Route path = "/user/:id?" render={(props) => <UserScreen token={token} />} exact></Route>
                  <Route path = "/dashboard" render={(props) => <DashboardScreen token={token} />} exact></Route>
                  <Route path = "/dashboard/stats" component={StatScreen} exact></Route>
                  <Route path = "/dashboard/stats/pearson" component={PearsonScreen} exact></Route>
                  <Route path = "/dashboard/machinelearning" component={MLScreen} exact></Route>
                  <Route path = "/signIn" exact render={(props) => <SignInScreen setToken={setToken} token={token} {...props}/>}/>
                  <Route path = "/signUp" exact render={() => <SignUpScreen token={token} />}></Route>
                </Switch>
              </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
