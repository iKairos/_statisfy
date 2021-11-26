
import MethodCard from "../MethodCard";
import { useState } from "react";



export default function Toolpage(props){
    const [stats, setStats] = useState("");
    const [ML, setML] = useState("");

    const selectStats = function(){
        setStats("Selected");
        setML(""); 
    }

    const selectML = function(){
        setML("Selected");
        setStats("");
    }

     return(

        <div className="dashboard">
            <div className ="dashboard_container">
                <div className="dashboard_header">
                    <h3>Choose Research Tool</h3>
                </div>
                <div className="cardwrapper">
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