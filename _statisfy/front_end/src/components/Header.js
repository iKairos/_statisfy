import { Link } from 'react-router-dom'
import {Navbar, Row, Col, Nav, NavDropdown, Container} from 'react-bootstrap'
import { useHistory } from "react-router"

export default function Header(props){
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/');
        history.go(0);
    }

    return(
        <div className="pagewrapper ">
            <Navbar bg="light" expand="lg" className="FirstRow" >
                    <Navbar.Brand to="/">Statisfy</Navbar.Brand>

                    <div className="account">
                    {
                        props.loading ? <p>Loading...</p> : typeof props.user != 'undefined' ? (
                        <div><p>Hello, {props.user?.first_name} {props.user?.last_name}! </p> 
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                        ) : (
                        <div>
                            <Link className="menuLink" to="/signIn"style={{alignContent:"end", padding:"5px"}}>Sign in</Link>
                            <Link className="menuLink" to="/signUp"style={{alignContent:"end", padding:"5px"}}>Sign up</Link>
                        </div>
                        )
                    }
                    </div>
            </Navbar>

            
            <Navbar bg="light" expand="lg" className="SecondRow">
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link> <Link className="menuLink" to="/">Home</Link></Nav.Link>
                        <Nav.Link> <Link className="menuLink" to="/user">Profile</Link></Nav.Link>
                        <NavDropdown title="Guides" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Statistical Method Guide</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Machine Learning Guide</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link to="/dashboard"><Link className="menuLink" to="/dashboard">Dashboard</Link></Nav.Link>
                        <Nav.Link>About</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
        </div>
    )
}