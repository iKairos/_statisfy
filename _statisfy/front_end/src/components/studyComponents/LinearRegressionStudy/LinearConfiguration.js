import "../../../StyleSheets/LinearConfig/linearconfig.css"
import { Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";
const ButtonStyles = makeStyles ({

    icons:{
        color: '#7051b8'
    },
    inputText:{
        fontFamily:'Poppins',
    }
  })

export default function LinearConfiguration(props){
    const ButtonClasses = ButtonStyles();  
    return(
        <div className="LinearConfig">
            <Typography className={ButtonClasses.inputText} variant="h6"> Linear Regression Configurations</Typography>
            <div className="LinearConfig_container">
                
                <div className="LinearConfig_container_content">
                    <Typography className={ButtonClasses.inputText}  variant="h6">Training Set Details</Typography>
                    <div className="LinearConfig_container_content_grid">
                        <Typography className={ButtonClasses.inputText} >Training Set Percentage: </Typography>
                        <Typography className={ButtonClasses.inputText}>{100 - props.configs['test_size']}%</Typography>
                        <Typography className={ButtonClasses.inputText}>Number of Rows : </Typography>
                        <Typography className={ButtonClasses.inputText}>__placeholder__</Typography>
                    </div>
                    
                </div>
                <div className="LinearConfig_container_table">
                    Training set dataset here
                </div>
            </div>

            <div className="LinearConfig_container">
                
                <div className="LinearConfig_container_content">
                    <Typography className={ButtonClasses.inputText} variant="h6">Testing Set Details</Typography>
                    <div className="LinearConfig_container_content_grid">
                        <Typography className={ButtonClasses.inputText}>Testing Set Percentage: </Typography>
                        <Typography className={ButtonClasses.inputText}>{props.configs['test_size']}%</Typography>
                        <Typography className={ButtonClasses.inputText}>Number of Rows : </Typography>
                        <Typography className={ButtonClasses.inputText}>__placeholder__</Typography>
                    </div>
                    
                </div>
                <div className="LinearConfig_container_table">
                    Testing set dataset here
                </div>
            </div>

        </div>
        
    );  
}