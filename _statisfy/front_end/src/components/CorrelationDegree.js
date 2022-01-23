import "../StyleSheets/studyfolder/study.css"
import { Button, Typography } from "@mui/material";



export default function CorrelationDegree(props){
    const level = Math.abs(props.value);
   // const attributes = props.attribute
    return(
        <div className ="Study_Correlation">
            <div className="Study_Correlation_table">
                <div className="Study_Correlation_values">
                    <div className="Study_Correlation_header">
                        <Typography variant="overline">Size of Correlation</Typography>
                    </div>

                    <div className={level >= 0.99 ? level <= 1.00 ? "Study_Correlation_level" : "Study_Correlation_content"  : "Study_Correlation_content"} >
                        <Typography variant="body2">Coefficient value is near ±1</Typography>
                    </div>
                    <div className={level >= 0.5 ? level < 0.99 ? "Study_Correlation_level" : "Study_Correlation_content" : "Study_Correlation_content"}>
                        <Typography variant="body2">50% - 100% (±) (0.5 - 1.0)</Typography>
                    </div>
                    <div className={level >= 0.3 ? level < 0.5 ? "Study_Correlation_level" : "Study_Correlation_content" : "Study_Correlation_content"}>
                        <Typography variant="body2">30% - 49% (±) (0.3 - 0.5)</Typography>
                    </div>
                    <div className={level > 0 ? level < 0.3 ? "Study_Correlation_level" : "Study_Correlation_content" : "Study_Correlation_content"}>
                        <Typography variant="body2">1% - 29% (±) (0.1 - 0.3)</Typography>
                    </div>
                    <div className={level == 0 ? level < 0.1 ? "Study_Correlation_level" : "Study_Correlation_content" : "Study_Correlation_content"}>
                        <Typography variant="body2">0% (0.0)</Typography>
                    </div>
                </div>
                <div className="Study_Correlation_label">
                    
                    <div className="Study_Correlation_header">
                        <Typography variant="overline">Interpretation</Typography>
                    </div>

                    <div className={level >= 0.99 ? level <= 1.00 ? "Study_Correlation_level" : "Study_Correlation_content" : "Study_Correlation_content"} >
                        <Typography variant="body2">Perfect Correlation</Typography>
                    </div>
                    <div className={level >= 0.5 ? level < 0.99 ? "Study_Correlation_level" : "Study_Correlation_content" : "Study_Correlation_content"}>
                        <Typography variant="body2">High Degree of Correlation</Typography>
                    </div>
                    <div className={level >= 0.3 ? level < 0.5 ? "Study_Correlation_level" : "Study_Correlation_content" : "Study_Correlation_content"}>
                        <Typography variant="body2">Moderate Degree of Correlation</Typography>
                    </div>
                    <div className={level > 0 ? level < 0.3 ? "Study_Correlation_level" : "Study_Correlation_content" : "Study_Correlation_content"}>
                        <Typography variant="body2">Low Degree of Correlation</Typography>
                    </div>
                    <div className={level == 0 ? level < 0.1 ? "Study_Correlation_level" : "Study_Correlation_content" : "Study_Correlation_content"}>
                        <Typography variant="body2">No Correlation</Typography>
                    </div>

                </div>
            </div>
            
        </div>
    ); 
}