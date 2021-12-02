import React from "react";
import "../StyleSheets/homescreen.css";
import banner from '../images/background.png'
import image1 from '../images/image1.png'
import {Container} from 'react-bootstrap'

export default function HomeScreen(props){
    return(
        <div>
            <div className="wrapper_home">
                <div className="container" >  
                    <div className="overlay" type="banner">
                        <h1 type="banner">Title</h1>
                        <p type="banner">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        <div className="choices">
                            <a href="">Read More</a>
                            <a href="">Discover More</a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="container" >  
                <div className="row">
                    <div className="col-sm-6">
                        <div className="content-image">
                            <img src={image1} class="img-responsive"/>
                        </div>
                    </div> 
                    <div className="col-sm-6">
                        <div className="content-text">
                            <h1>Statistics</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
                                qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <h1>Statistics</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
                            qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    <div className="col-sm-6">
                        <img src={image1} width="400vh"/>
                    </div>
                </div>
            </div>
            <div className="description" >  
                <div className="content-image">
                    <img src={image1} class="img-responsive"/>
                </div>
                <div className="content-text">
                    <h1>Statistics</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
                        qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>
        </div>
        
    );
}