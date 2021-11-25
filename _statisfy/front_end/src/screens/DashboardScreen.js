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
    const [methodChosen, setMethodChosen] = useState("");
    const [showActive, setShowActive] = useState("first");

    const [dataArray, setDataArray] = useState();


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

    const displayMethodChosen = (choice) =>{
        setMethodChosen(choice);
    }


    const switchToFirst = () => {
        setShowActive("first");
    }

    const switchToSecond = () => {
        if(title?.length == 0 || description?.length == 0 || typeof title === 'undefined' || typeof description === 'undefined'){
            setError("Please fill in all the details to continue.");
            return;
        }
        
        setShowActive("second");
        setError("");
    }


    const switchToThird = () => {
        setShowActive("third");
    }



    const handleTitle = (e) => {
        setTitle(e.target.value)

        if(title.length > 200){
            setError("Title should not exceed 200 characters.");
            return;
        }else{
            setError("");
        }
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)

        if(description.length > 250){
            setError("Description should not exceed 200 characters.");
            return;
        }else{
            setError("");
        }
    }

    // ======= CALLBACKS ======= //
    const callbackCheckbox = (checked) => {
        setTags(checked);
    }

    // ======= DISPATCH ON RENDER ======= //
    useEffect(() => {
        dispatch(processUserToken(props.token));
    }, [])

    // ======= FILE UPLOAD MECHANISM ======= //
    const changeHandler = (e) => {
        if (e.target.files.length != 0){
            const reader = new FileReader();

            reader.onload = (e) => {
                const text = e.target.result;
                processCSV(text);
            }

            reader.readAsText(e.target.files[0]);
        }
    }

    const processCSV = (str, delim=',') => {
        const headers = str.slice(0,str.indexOf('\n')).split(delim);
        const rows = str.slice(str.indexOf('\n')+1).split('\n');

        const newArray = rows.map( row => {
            const values = row.split(delim);
            const eachObject = headers.reduce((obj, header, i) => {
                obj[header] = values[i];
                return obj;
            }, {})
            return eachObject;
        })

        setDataArray(newArray)
    }

    if(processed?.code === 'TOKEN_SUCCESS'){
        return(
            <div>
                {showActive === "first" &&
                    <div className="dashboard">
                        <div className ="dashboard_container">
                            <div className="dashboard_header">
                                <h3>Enter Title and Description</h3>
                            </div>
                            <div className="res">
                                {error && <Alert variant='danger'>{error}</Alert>}
                                <div className="res_div">
                                    <span className="res_span">Research Title ({title.length}/200 characters)</span>
                                    <input className="res_title" value={title} placeholder="Research Title" onChange={(e) => handleTitle(e)}></input>
                                </div>
                                <div className="res_div">
                                    <span className="res_span">Research Description ({description.length}/250 characters)</span>
                                    <textarea className="res_desc" value={description} placeholder="Description" onChange={(e) => handleDescription(e)}></textarea>
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
                }

                {showActive === "second" &&
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
                                            <input type="file" name="file" accept=".csv" onChange={(e) => changeHandler(e)} />
                                            <button className="upload_btn"> Clear</button>

                                    </div>
                                    
                                </div>
                                <div className="upload_table">
                                    <DisplayTable data={dataArray}/>
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
                                <div className="upload_headerstat">
                                    <h3>Statistical Method: {methodChosen}</h3>
                                </div>
                                <AllCards tags={tags} display={displayMethodChosen}/>
                                <button className="upload_nxtbtn">
                                    <div className="upload_nxtbtndiv" onClick={switchToThird}>
                                        Next
                                    </div>
                                    
                                </button>
                            </div>
                        </div>

                    </div>
                }

                {showActive === "third" && 
                <div></div>
                }

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