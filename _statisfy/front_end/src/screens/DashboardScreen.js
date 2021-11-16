import MethodCard from "../components/MethodCard";
import "../StyleSheets/dashboard.css";
import { useState } from "react";

export default function PearsonScreen(){
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

            <div className ="dashContainer">
                <div className="dashheader">
                    <h3>Enter Title and Description</h3>
                </div>
                <div className="res">
                    <div className="res_div">
                        <span className="res_span">Research Title</span>
                        <input className="res_title" placeholder="Research Title"></input>
                    </div>
                    <div className="res_div">
                        <span className="res_span">Research Description</span>
                        <textarea className="res_desc" placeholder="Description"></textarea>
                    </div>
                    
                </div>
            </div>

            <div className ="dashContainer">
                <div className="dashheader">
                    <h3>Choose Research Tool</h3>
                </div>
                <div className="cardwrapper">
                    <div onClick ={selectStats}>
                        <MethodCard
                            title="Statistics"
                            desc= "dsad"
                            status ={stats}
                        />
                    </div>
                    <div onClick = {selectML}>
                        <MethodCard
                            title="Machine Learning"
                            desc= "card 1"
                            status ={ML}
                            
                        />
                    </div>
                </div>
            </div>
        </div> 
    );
}