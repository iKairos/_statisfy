import "../../../StyleSheets/LinearConfig/linearconfig.css"
import { Typography } from "@mui/material";


export default function LinearConfiguration(props){
    
    return(
        <div className="LinearConfig">
            <Typography variant="h6"> Linear Regression Configurations</Typography>
            <div className="LinearConfig_container">
                
                <div className="LinearConfig_container_content">
                    <Typography  variant="h6">Training Set Details</Typography>
                    <div className="LinearConfig_container_content_grid">
                        <Typography>Training Set Percentage: </Typography>
                        <Typography>30</Typography>
                        <Typography>Number of Rows : </Typography>
                        <Typography>30</Typography>
                    </div>
                    
                </div>
                <div className="LinearConfig_container_table">
                    Training set dataset here
                </div>
            </div>

            <div className="LinearConfig_container">
                
                <div className="LinearConfig_container_content">
                    <Typography  variant="h6">Testing Set Details</Typography>
                    <div className="LinearConfig_container_content_grid">
                        <Typography>Testing Set Percentage: </Typography>
                        <Typography>30</Typography>
                        <Typography>Number of Rows : </Typography>
                        <Typography>30</Typography>
                    </div>
                    
                </div>
                <div className="LinearConfig_container_table">
                    Testing set dataset here
                </div>
            </div>

        </div>
        
    );  
}