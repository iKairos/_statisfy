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
import DashboardScreen from './screens/DashboardScreen';
import StatScreen from './DashboardContents/StatsMethods';
import MLScreen from './DashboardContents/MachineLearning';
import PearsonScreen from './screens/PearsonScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

// stylesheets
import './App.css';

// tokens
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();

  const dispatch = useDispatch();
  const dataSelector = useSelector((state) => 
    state.decodedUserToken
  );
  const {loading, error, processed} = dataSelector;

  if(processed?.code === "TOKEN_FAIL"){
    localStorage.removeItem('token');
  }

  useEffect(() => {
    dispatch(processUserToken(token));
  }, [])

  return (
    <BrowserRouter>
      <div>
          <Container fluid>
              <Header loading={loading} user={processed?.user} />

              <main>
                <Switch>
                  <Route path = "/" exact component={HomeScreen}></Route>
                  <Route path = "/dashboard" component={DashboardScreen} exact></Route>
                  <Route path = "/dashboard/stats" component={StatScreen} exact></Route>
                  <Route path = "/dashboard/stats/pearson" component={PearsonScreen} exact></Route>
                  <Route path = "/dashboard/machinelearning" component={MLScreen} exact></Route>
                  <Route path = "/signIn" exact>
                    <SignInScreen setToken={setToken}/>
                  </Route>
                  <Route path = "/signUp" component={SignUpScreen} exact></Route>
                </Switch>
              </main>
              
          </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
