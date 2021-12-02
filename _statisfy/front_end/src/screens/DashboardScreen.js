import MethodCard from "../components/MethodCard";
import AllCards from "../components/AllCards";
import Checkbox from "../components/Checkbox";


import TitlePage from "../components/dashboardPages/titlepage";
import ToolPage from "../components/dashboardPages/toolPage";
import DataPage from "../components/dashboardPages/dataPage";
import DataSetPage from "../components/dashboardPages/datasetPage";
import StatPage from "../components/dashboardPages/statPage";
import Navigator from "../components/navigator";

import "../StyleSheets/dashboard.css";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { processUserToken } from "../actions/userActions";
import { DisplayTable } from "../components/DisplayTable";
import { Alert, Spinner } from "react-bootstrap";
import { processDataset } from "../actions/datasetActions";

export default function DashboardScreen(props){
    // ======= FUNCTION-WIDE VARIABLES ======= //
    
    // Research details variables
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState();
    const [columns, setColumns] = useState([]);

    // Utils variables
    const [error, setError] = useState();
    const [tags, setTags] = useState([]);
    const [methodChosen, setMethodChosen] = useState("");
    const [showActive, setShowActive] = useState(1);

    // File handling variables
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
    const displayMethodChosen = (choice) =>{
        setMethodChosen(choice);
    }

    const nextScreen = () => {
       if(title?.length == 0 || description?.length == 0 || typeof title === 'undefined' || typeof description === 'undefined'){
            setError("Please fill in all the details to continue.");
            return;
        }
        setShowActive(showActive + 1);
    }

    const prevScreen = () => {
        setShowActive(showActive - 1);
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

    const callbackColumns = (columns) => {
        setColumns(columns);
    }

    // ======= FILE UPLOAD MECHANISM ======= //
    const fileDetailsSelector = useSelector((state) => 
        state.datasetDetails
    );
    const {loading, datasetDetails} = fileDetailsSelector;

    const changeHandler = (e) => {
        if (e.target.files.length != 0){
            var filename = e.target.files[0].name

            const extension = filename.split('.').pop();

            if(extension != 'csv'){
                setError("File is not in comma-separated value (CSV) format. Please make sure you are uploading your dataset in CSV format.");
                return;
            }

            setError(undefined);

            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                processCSV(text);
            }
            reader.readAsText(e.target.files[0]);

            const formData = new FormData();
            formData.append("file", e.target.files[0]);

            dispatch(processDataset(formData));

            setFile(e.target.files[0])
        }
    }

    const processCSV = (str, delim=',') => {
        const headers = str.slice(0,str.indexOf('\n')).split(delim);
        const rows = str.slice(str.indexOf('\n')+1).split('\n');

        var newArray = rows.map( (row, index) => {
            const values = row.split(delim);
            const eachObject = headers.reduce((obj, header, i) => {
                obj[header] = values[i];
                return obj;
            }, {})
            if(index == 50){
                return eachObject;
            }
            return eachObject;
        })

        if (newArray.length > 50) {
            newArray = newArray.slice(0,50);
        }

        setDataArray(newArray);
    }
    
    // ======= DISPATCH ON RENDER ======= //
    useEffect(() => {
        dispatch(processUserToken(props.token));
    }, [])

    if(processed?.code === 'TOKEN_SUCCESS'){
        return(
            <div>
                
                {showActive === 1 &&
                <div>
                    <TitlePage
                        Title = {title}
                        HandleTitle = {handleTitle}
                        Error = {error}
                        Description = {description}
                        HandleDescription = {handleDescription}
                    />
                    <Navigator
                        NextScreen={nextScreen}
                        PrevScreen={prevScreen}
                        nextDisabled={false}
                        prevDisabled={true}
                    />
                    
                </div>
                }
                {showActive === 2 &&
                <div>
                    <ToolPage/>
                    <div className="dashboard_btn_cont">
                        <div className="dashboard_btn_div">
                         <button className="dashboard_btn" onClick={prevScreen}> previous</button>
                        </div>
                        <div className="dashboard_btn_div">
                            <button className="dashboard_btn" onClick={nextScreen}> next</button>
                        </div>
                    </div>
                </div>
                    
                }
                { showActive === 3 &&
                    <div>
                        <DataSetPage
                            CallbackColumns = {callbackColumns}
                            ChangeHandler = {changeHandler}
                            DataArray = {dataArray}
                            DatasetDetails = {datasetDetails}
                            FileDetails = { file ? {
                                'name': file.name,
                                'size': file.size
                            } : undefined}
                            Error = {error}
                            Loading = {loading}
                        />
                        <Navigator
                            NextScreen={nextScreen}
                            PrevScreen={prevScreen}
                            nextDisabled={false}
                            prevDisabled={false}
                        />
                    </div>
                }
                { showActive === 4 &&
                    <div>
                        <StatPage
                            CallbackCheckbox = {callbackCheckbox}
                            MethodChosen = {methodChosen}
                            Tags = {tags}
                            DisplayMethodChosen = {displayMethodChosen}
                        />
                        <Navigator
                            NextScreen={nextScreen}
                            PrevScreen={prevScreen}
                            nextDisabled={false}
                            prevDisabled={false}
                        />
                    </div>
                        
                }
                {
                    showActive === "third" && <div></div>
                }
            </div>
        );
    }else if(processed?.code === 'TOKEN_FAIL'){
        return(
            <Redirect to={{pathname: "/signIn", message: "You need to log in to access this page. Please log in first or create an account using the Sign Up page."}}></Redirect>
        )
    }else{
        return(
            <Spinner animation="border" variant="primary" />
        );
    }
}