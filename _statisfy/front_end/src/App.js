import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { processUserToken } from './actions/userActions';
import {BrowserRouter, Route, Switch, Link, withRouter } from 'react-router-dom'
import {Navbar, Row, Col, Container, Nav, NavDropdown} from 'react-bootstrap'
import './App.css';
import HomeScreen from './screens/HomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import StatScreen from './DashboardContents/StatsMethods';
import MLScreen from './DashboardContents/MachineLearning';

import PearsonScreen from './screens/PearsonScreen';

import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

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
              <Row className ="FirstRow">
                <Col sm ="5" md lg ="2">
                  <div>
                     <Link className="headerLink" to="/">Statisfy</Link>
                  </div>
                </Col>
                <Col sm ="2" md lg ="8"/>
                <Col sm ="5" md lg ="2">
                  <div>
                    {
                      loading ? <p>Loading...</p> : token && typeof processed != 'undefined' ? (
                        <p>Hello, {processed.user?.first_name} {processed.user?.last_name}!</p>
                      ) : (
                        <div>
                          <Link className="menuLink" to="/signIn"style={{alignContent:"end", padding:"5px"}}>Sign in</Link>
                          <Link className="menuLink" to="/signUp"style={{alignContent:"end", padding:"5px"}}>Sign up</Link>
                        </div>
                      )
                    }
                  </div>
                </Col>
              </Row>
              <Row className ="SecondRow">
                <Col sm md lg ="12">
                <Navbar bg="light" variant="light" fluid>
                      <Nav className ="justify-content-center" style={{width:"100%"}}>
                        <Nav.Link className="NavbarContents">
                          <Link className="menuLink" to="/">Home</Link>
                        </Nav.Link>
                        <NavDropdown title ="Guides" className="NavbarContents">
                            <NavDropdown.Item>Statistical Method Guide</NavDropdown.Item>
                            <NavDropdown.Item>Machine Learning Guide</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link className="NavbarContents">
                          <Link className="menuLink" to="/dashboard">Dashboard</Link>
                        </Nav.Link>
                        <Nav.Link className="NavbarContents">About</Nav.Link>
                      </Nav>
                    </Navbar>
                </Col>
              </Row>

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
