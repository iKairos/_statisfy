import { Link } from 'react-router-dom'
import {Navbar, Row, Col, Nav, NavDropdown} from 'react-bootstrap'

export default function Header(props){
    return(
        <div>
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
                        props.loading ? <p>Loading...</p> : typeof props.user != 'undefined' ? (
                        <p>Hello, {props.user?.first_name} {props.user?.last_name}!</p>
                        ) : (
                        <div>
                            <Link className="menuLink" to="/signIn"style={{alignContent:"end", padding:"5px"}}>Sign in</Link>
                            <Link className="menuLink" to="/signUp1"style={{alignContent:"end", padding:"5px"}}>Sign up</Link>
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
        </div>
    )
}