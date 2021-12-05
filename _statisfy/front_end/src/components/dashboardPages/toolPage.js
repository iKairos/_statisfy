
import MethodCard from "../MethodCard";
import { useState } from "react";
import { Alert, Grow } from "@mui/material";



export default function Toolpage(props){
    const [stats, setStats] = useState("");
    const [ML, setML] = useState("");

    const selectStats = function(){
        setStats("Selected");
        setML(""); 
        props.SetToolChosen("Statistics")
    }

    const selectML = function(){
        setML("Selected");
        setStats("");
        props.SetToolChosen("Machine Learning")
    }

     return(

        <div className="dashboard">
            <div className ="dashboard_container">
                <div className="dashboard_header">
                    <h3>Choose Research Tool</h3>
                </div>
                <div className="cardwrapper">
                    {props.Error && (
                        <Grow in={props.Error} {...(props.Error ? { timeout: 1000 } : {})}>
                            <Alert variant="outlined" severity="error">{props.Error}</Alert>
                        </Grow>
                    )}
                    <div onClick ={selectStats}>
                        <MethodCard
                            title="Statistics"
                            desc= "Analyze your dataset by performing statistical techniques to infer specific hypotheses."
                            status ={stats}
                        />
                    </div>
                    <div onClick = {selectML}>
                        <MethodCard
                            title="Machine Learning"
                            desc= "Develop a model for prediction and classification by training a machine learning model."
                            status ={ML}
                        />
                    </div>
                </div>
            </div>
        </div>
     ); 
 }