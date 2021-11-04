import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './actions/userActions';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import {Button, Navbar, Row, Col, Container, Nav, NavDropdown} from 'react-bootstrap'
import './App.css';
import HomeScreen from './screens/HomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import StatScreen from './DashboardContents/StatsMethods';
import MLScreen from './DashboardContents/MachineLearning';
import PearsonScreen from './screens/PearsonScreen';

function App() {
  const dispatch = useDispatch();
  const dataSelector = useSelector((state) => 
    state.users
  );
  const {loading, error, userData} = dataSelector;

  useEffect(() => {
    dispatch(getUser(9875));
  }, [])

  return (
    <BrowserRouter>
    <div>
    
          <Container fluid>
              <Row className ="FirstRow">
                <Col sm ="5" md lg ="2">
                  <div>
                     <Link class="headerLink" to="/">Statisfy</Link>
                  </div>
                </Col>
                <Col sm ="2" md lg ="8"/>
                <Col sm ="5" md lg ="2">
                  <div>
                      <a style={{alignContent:"end", padding:"5px"}}>Log-in</a>
                      <a style={{alignContent:"end", padding:"5px"}}>Sign up</a>
                  </div>
                </Col>
              </Row>
              <Row className ="SecondRow">
                <Col sm md lg ="12">
                <Navbar bg="light" variant="light" fluid>
                      <Nav className ="justify-content-center" style={{width:"100%"}}>
                        <Nav.Link className="NavbarContents">
                          <Link class="menuLink" to="/">Home</Link>
                        </Nav.Link>
                        <NavDropdown title ="Guides" className="NavbarContents">
                            <NavDropdown.Item>Statistical Method Guide</NavDropdown.Item>
                            <NavDropdown.Item>Machine Learning Guide</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link className="NavbarContents">
                          <Link class="menuLink" to="/dashboard">Dashboard</Link>
                        </Nav.Link>
                        <Nav.Link className="NavbarContents">About</Nav.Link>
                      </Nav>
                    </Navbar>
                </Col>
              </Row>

              <main>
              <Switch>
                <Route path = "/" component={HomeScreen} exact></Route>
                <Route path = "/dashboard" component={DashboardScreen} exact></Route>
                <Route path = "/dashboard/stats" component={StatScreen} exact></Route>
                <Route path = "/dashboard/stats/pearson" component={PearsonScreen} exact></Route>
                <Route path = "/dashboard/machinelearning" component={MLScreen} exact></Route>
              </Switch>
              </main>
              
          </Container>
        </div>
    
      
    </BrowserRouter>
  );
}

export default App;
