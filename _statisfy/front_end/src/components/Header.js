import { Link } from 'react-router-dom'
import {Navbar, Row, Col, Nav, NavDropdown} from 'react-bootstrap'
import { useHistory } from "react-router"
import { useDispatch, useSelector } from 'react-redux';
import { expireToken } from '../actions/tokenActions';

import StatisfyIcon from '../images/statisfyLogo.png';


import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function Header(props){
    const history = useHistory();
    const dispatch = useDispatch();

    const expireTokenSelector = useSelector((state) => 
        state.tokenExpire
    );

    const {expireRes} = expireTokenSelector;

    const handleLogout = () => {
        dispatch(expireToken(props.token));
        localStorage.removeItem('token');
        history.push('/');
        history.go(0);
    }

    const handleExitLogOut = () => {
        handleLogout();
        handleCloseUserMenu();
    }


//=======================================================>
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return(
        <div className="pagewrapper ">
            <AppBar 
                position="static"
                color = "transparent"
                elevation={0}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        <img src= {StatisfyIcon} alt='Statisfy' height="50"/>
                    </Typography>
                    

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                        <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem key={1} onClick={handleCloseNavMenu}>
                                <Link className="menuLink" to="/"> 
                                    <Typography textAlign="center">Home</Typography>
                                </Link>
                            </MenuItem>
                            <MenuItem key={2} onClick={handleCloseNavMenu}>
                                <Link className="menuLink" to="/profile">
                                    <Typography textAlign="center">Profile</Typography>
                                </Link>
                            </MenuItem>
                            
                            <MenuItem key={3} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Guides</Typography>
                            </MenuItem>
                            <MenuItem key={4} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">About</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        <img src= {StatisfyIcon} alt='Statisfy' height="50"/>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Link className="menuLink" to="/">
                            <Button
                                key={"1"}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Home
                            </Button>
                        </Link>
                        <Link className="menuLink" to="/profile">
                            <Button
                                key={"2"}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Profile
                            </Button>
                        </Link>
                        
                        <Button
                            key={"3"}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Guides
                        </Button>
                        <Button
                            key={"4"}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            About
                        </Button>
                        
                    </Box>

                    <div className="account">
                    {
                        props.loading ? <p>Loading...</p> : typeof props.user != 'undefined' ? (
                        <div>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={props.user?.first_name} src="/static/images/avatar/2.jpg" />
                                </IconButton>
                                </Tooltip>
                                <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                                >
                                    <Link className="menuLink" to="/profile">
                                        <MenuItem key={1} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">{props.user?.first_name} {props.user?.last_name}</Typography>
                                        </MenuItem>
                                    </Link>
                                        
                                   
                                    <MenuItem key={2} onClick={handleExitLogOut}>
                                        <Typography textAlign="center">Log Out</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </div>
                        ) : (
                        <div>
                            <Link className="menuLink" to="/signIn"style={{alignContent:"end", padding:"5px"}}>Sign in</Link>
                        </div>
                        )
                    }
                    </div>

                    
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
}