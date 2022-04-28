import "../StyleSheets/NewCSSFiles/homeFolder/homepage.css"
import CardMedia from '@mui/material/CardMedia';
import landingPage from '../images/homePage/Landing_Page - Explore.png'
import tryAndJoin from '../images/homePage/Landing_Page - TryAndJoin.png'
import landingPageBar from '../images/homePage/Landing_Page - BarGraph.png'
import landingPageDonut from '../images/homePage/Landing_Page - DonutGraph.png'
import landingPageScatter from '../images/homePage/Landing_Page - ScatterPlot.png'


import { Button } from "@mui/material";

export default function HomeScreen(props){
    return(
        <div className = "HomePage">
            <div className = "HomePage_section">
                <div className="HomePage_section_content_container">
                    <div className="HomePage_section_content">
                        <img src = {landingPage} width="100%"/>
                    </div>
                    <div className="HomePage_section_text">
                        <h1 className="HomeTexts_header">Made For You!</h1>
                        <p className="HomeTexts_content"> Simplified Statistics and Machine Learning for You</p>
                        <Button 
                            variant="contained"
                            sx ={{
                                backgroundColor:"#000000",
                                borderRadius:"0.75rem",
                                fontSize:"18px",
                                fontFamily:"Poppins",
                                width:"10rem"
                                
                            }}
                        >Explore</Button>
                    </div>
                </div>
            </div>
            <div className = "HomePage_section2">
                <div className="HomePage_section2_content_container">
                    <div className="HomePage_section2_text">
                        <h1 className="HomeTexts_header2">Research it...</h1>
                        <p className="HomeTexts_content2"> Just upload your dataset and select variables <br/> Statisfy will do it all</p>
                        
                        <Button 
                            variant="contained"
                            color="secondary"
                            sx ={{
                                backgroundColor:"#6e51b8",
                                borderRadius:"0.75rem",
                                fontSize:"18px",
                                fontFamily:"Poppins",
                                width:"10rem"
                                
                            }}
                        >Try and Join</Button>
                    </div>
                    
                    <div className="HomePage_section2_content">
                        <img src = {tryAndJoin} width="100%"/>
                    </div>
                </div>
            </div>
            <div className = "HomePage_section3">
            <div className="HomePage_section3_content_container">
                    <div className="HomePage_section3_text">
                        <h1 className="HomeTexts_header2">Report Generation</h1>
                        <p className="HomeTexts_content2"> 
                            Download the visualization through graphs of analysis, metrics, and performance of machine learning model
                        </p>
                    </div>
                    
                    <div className="HomePage_section3_content">
                        <img src = {landingPageBar} width="100%"/>

                        <img src = {landingPageDonut}  width="100%" alignItems="center" justifyContent="center"/>
                        <img src = {landingPageScatter} width="100%" />
                    </div>
                </div>
            </div>
        </div>
    );
}