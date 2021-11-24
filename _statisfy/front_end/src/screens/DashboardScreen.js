import MethodCard from "../components/MethodCard";
import AllCards from "../components/AllCards";
import Checkbox from "../components/Checkbox";

import "../StyleSheets/dashboard.css";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { processUserToken } from "../actions/userActions";
import { DisplayTable } from "../components/DisplayTable";
import { Alert } from "react-bootstrap";

export default function DashboardScreen(props){
    // ======= FUNCTION-WIDE VARIABLES ======= //
    const [stats, setStats] = useState("");
    const [ML, setML] = useState("");
    const [option, setOption] = useState(false);
    const [toStatistics, setDestination] = useState(false);
    const [showFirst, setShowFirst] = useState(true);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState();

    const [tags, setTags] = useState([]);

    // ======= TOKEN HANDLING ======= //
    const dispatch = useDispatch();
    const dataSelector = useSelector((state) => 
        state.decodedUserToken
    );
    const {processed} = dataSelector;

    if(props.token && processed?.code === "TOKEN_FAIL"){
        localStorage.removeItem('token');
    }

    // ======= HANDLERS ======= //

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


    const switchToFirst = () => {
        setShowFirst(true);
    }

    const switchToSecond = () => {
        if(title?.length == 0 || description?.length == 0 || typeof title === 'undefined' || typeof description === 'undefined'){
            setError("Please fill in all the details to continue.");
            return;
        }
        
        setShowFirst(false);
        setError("");
    }

    // ======= CALLBACKS ======= //
    const callbackCheckbox = (checked) => {
        setTags(checked);
    }

    // ======= DISPATCH ON RENDER ======= //
    useEffect(() => {
        dispatch(processUserToken(props.token));
    }, [])

    if(processed?.code === 'TOKEN_SUCCESS'){
        return(
            <div>
                {showFirst?(
                    <div className="dashboard">
                        <div className ="dashboard_container">
                            <div className="dashboard_header">
                                <h3>Enter Title and Description</h3>
                            </div>
                            <div className="res">
                                {error && <Alert variant='danger'>{error}</Alert>}
                                <div className="res_div">
                                    <span className="res_span">Research Title ({title.length}/200 characters)</span>
                                    <input className="res_title" value={title} placeholder="Research Title" onChange={(e) => setTitle(e.target.value)}></input>
                                </div>
                                <div className="res_div">
                                    <span className="res_span">Research Description ({description.length}/250 characters)</span>
                                    <textarea className="res_desc" value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>
                            </div>
                        </div>
            
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

                            <div className = "proceed">
                                {option?(
                                    <button className="proceed_Btn" onClick={switchToSecond}> next</button>
                                ): null}
                            </div>
                        </div>

                       

                    </div>

                ):(
                    <div className="upload">
                        <div className="upload_container">
                            <div className="upload_res">
                                <div className="upload_header">
                                    <h3>Research</h3>
                                    <div className = "upload_data">
                                        <button className="upload_btn" onClick={switchToFirst}> edit</button>
                                    </div>
                                    
                                </div>
                                <div className="upload_body">
                                    <span className="upload_span"> Title:</span>
                                    <p>{title}</p>
                                    <span className="upload_span"> Author(s):</span>
                                    <Link target="_blank" to={`/profile/${processed?.user._id}`}><p>{processed?.user.username}</p></Link>
                                    <span className="upload_span"> Description:</span>
                                    <p className="upload_desc">{description}</p>
                                </div>
                            </div>
                        </div>

                        <div className="upload_container">
                            <div className="upload_res">
                                <div className="upload_header">
                                    <h3>Data</h3>
                                    <div className="upload_data">
                                            <button className="upload_btn"> Upload</button>
                                            <button className="upload_btn"> Clear</button>

                                    </div>
                                    
                                </div>
                                <div className="upload_table">
                                    <DisplayTable/>
                                </div>
                            </div>
                        </div>

                        <div className="upload_container">
                            <div className="upload_res">
                                <div className="upload_header"><h3>Filter</h3></div>
                                <div className="upload_body">
                                    <Checkbox callbackFunction={callbackCheckbox}/>
                                </div>
                            </div>
                        </div>


                        <div className="upload_container">
                            <div className="upload_res">
                                <div className="upload_header">
                                    <h3>Statistical Methods</h3>
                                </div>
                                <AllCards tags={tags}/>
                            </div>
                        </div>

                    </div>
                )}
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