import "../StyleSheets/studyfolder/study.css"
import { Button, Typography } from "@mui/material";



export default function CorrelationDegree(props){
   // const attributes = props.attribute
    return(
        <div className ="Study_Correlation">
            <div className="Study_Correlation_table">
                <div className="Study_Correlation_values">
                    <div className="Study_Correlation_header">
                        <Typography variant="overline">Size of Correlation</Typography>
                    </div>
                    <div className="Study_Correlation_content">
                        <Typography variant="body2">Coefficient value is near ±1</Typography>
                    </div>
                    <div className="Study_Correlation_content">
                        <Typography variant="body2">90% - 100% (±) (0.9 - 1.0)</Typography>
                    </div>
                    <div className="Study_Correlation_content">
                        <Typography variant="body2">70% - 90% (±) (0.7 - 0.9)</Typography>
                    </div>
                    <div className="Study_Correlation_content">
                        <Typography variant="body2">50% - 70% (±) (0.5 - 0.7)</Typography>
                    </div>
                    <div className="Study_Correlation_content">
                        <Typography variant="body2">30% - 50% (±) (0.3 - 0.5)</Typography>
                    </div>
                    <div className="Study_Correlation_content">
                        <Typography variant="body2">0% - 30% (±) (0.0 - 0.3)</Typography>
                    </div>
                </div>
                <div className="Study_Correlation_label">
                    
                    <div className="Study_Correlation_header">
                        <Typography variant="overline">Interpretation</Typography>
                    </div>
                    <div className="Study_Correlation_content">
                        <Typography variant="body2">Perfect Correlation</Typography>
                    </div>
                    <div className="Study_Correlation_content">
                        <Typography variant="body2">Very High Degree of Correlation</Typography>
                    </div>
                    <div className="Study_Correlation_content">
                        <Typography variant="body2">High Degree of Correlation</Typography>
                    </div>
                    <div className="Study_Correlation_content">
                        <Typography variant="body2">Moderate Degree of Correlation</Typography>
                    </div>
                    <div className="Study_Correlation_content">
                        <Typography variant="body2">Low Degree of Correlation</Typography>
                    </div>
                    <div className="Study_Correlation_content">
                        <Typography variant="body2">Negligible Correlation</Typography>
                    </div>
                </div>
            </div>
            
        </div>
    ); 
}