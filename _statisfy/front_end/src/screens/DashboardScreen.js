import MethodCard from "../components/MethodCard";
import "../StyleSheets/dashboard.css";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { processUserToken } from "../actions/userActions";

export default function DashboardScreen(props){
    const [stats, setStats] = useState("");
    const [ML, setML] = useState("");
    const [option, setOption] = useState(false);
    const [toStatistics, setDestination] = useState(false);

    const selectStats = function(){
        setStats("Selected");
        setML(""); 
        setOption(true);
        setDestination(true);
    }

    const selectML = function(){
        setML("Selected");
        setStats("");
        setOption(true);
        setDestination(false);
    }

    const dispatch = useDispatch();
    
    const dataSelector = useSelector((state) => 
        state.decodedUserToken
    );
    const {loading, error, processed} = dataSelector;

    if(props.token && processed?.code === "TOKEN_FAIL"){
        localStorage.removeItem('token');
    }

    useEffect(() => {
        dispatch(processUserToken(props.token));
    }, [])

    if(processed?.code === 'TOKEN_SUCCESS'){
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

                <div className = "proceed">
                    {option?(
                        toStatistics?(
                            <Link to="/dashboard/stats">
                                <button className="proceed_Btn" >PROCEED</button>
                            </Link>
                        ):(
                            <Link to="/dashboard/machinelearning">
                            <button className="proceed_Btn" > PROCEED</button>
                            </Link>
                        )
                    ): null}
                </div>

            </div> 
        );
    }else if(processed?.code === 'TOKEN_FAIL'){
        return(
            <Redirect to={{pathname: "/signIn", message: "You need to log in to access this page. Please log in first or create an account using the Sign Up page."}}></Redirect>
        )
    }else{
        return(
            <p></p>
        );
    }
}