import "../StyleSheets/researchfolder/research.css"
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getResearch } from "../actions/researchAction";
import { useState } from "react";
import { Alert, AlertTitle, Fade, Grow, Skeleton } from "@mui/material";

import TableChartIcon from '@mui/icons-material/TableChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CalculateIcon from '@mui/icons-material/Calculate';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { processUserToken } from "../actions/userActions";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';


import ResData from "../components/researchPages/resData";
import ResStudies from "../components/researchPages/resStudies";


import { status500 } from "../constants/stringConstants";
import { processDataset } from "../actions/datasetActions";



export default function ResearchScreen(props){
    const { id } = useParams();
    const location = useLocation();
    const [value, setValue] = useState(1);
    const [message, setMessage] = useState();
    const [editTitle, setTitle] = useState(true);
    const [editDesc, setDesc] = useState(false);

    const dispatch = useDispatch();
    const dataSelector = useSelector((state) => 
        state.researchGet
    );
    const userdataSelector = useSelector((state) => 
        state.decodedUserToken
    );
    const filedataSelector = useSelector((state) =>
        state.datasetFile
    );

    const { processed } = userdataSelector;
    const {researchGetRes} = dataSelector;
    const {datasetFile} = filedataSelector;   

    const setTitleFunction = function(newValue){
        setTitle(newValue);
    };
    const switchTabs = (event, newValue) => {
        setValue(newValue);
    };
    const nextTab = function(){
        setValue(value+1);
    };
    const prevTab = function(){
        setValue(value-1);
    };
    
    const isAuthor = () => {
        const x = researchGetRes?.data.authors.map(author => {
            return author['uid'] === processed?.user?._id;
        });

        return x.includes(true);
    }

    if(props.token && processed?.code === "TOKEN_FAIL"){
        localStorage.removeItem('token');
    }

    if(typeof datasetFile !== 'undefined'){
        const formData = new FormData();
        formData.append("filepath", datasetFile.directory);
        formData.append("delimiter", ','); // temporary fix

        dispatch(processDataset(formData))
    }

    React.useEffect(() => {
        dispatch(processUserToken(props.token));
        dispatch(getResearch(id));

        if(location.state){
            setMessage(location.state.message);
        }

        const history = createHistory();
        history.replace();
    }, [location]);


    //COMPONENT STYLES
    const styles = theme => ({
        textField: {
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
            color: 'white',
            paddingBottom: 0,
            marginTop: 0,
            fontWeight: 500
        },
    });

    if(researchGetRes?.code === 'RESEARCH_GET_SUCCESS'){

        return(
            <div className = "research">
                <div className = "research_header_container">
                    <div className = "research_heading">
                        {
                            message &&
                            <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                                <Alert variant="outlined" severity="success">
                                    <AlertTitle><b>{message.title}</b></AlertTitle>
                                    { message.body }
                                </Alert>
                            </Grow>
                        }
                        {
                            editTitle? (
                                <div className = "text_content">
                                    <span className ="text_title">{researchGetRes?.data.research_name}
                                        <EditIcon
                                            onClick={()=>setTitleFunction(false)}
                                        />
                                    
                                    </span>
                                    
                                </div>
                                
                            ):(
                                <div className = "text_content">
                                    <TextField 
                                        id="standard-basic" 
                                        label="New Research Title" 
                                        variant="standard"
                                        size="small"
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                        <p>1</p>
                                        <p>2</p>
                                    </Box>
                                </div>
                            )
                        }

                        {researchGetRes?.data.authors.map(author => {
                            return <p className="text_button">
                            <Link to={`/profile/${author['uid']}`}
                            style={{ textDecoration: 'none' }}
                            >
                                <p className="text_button">
                                    {author['username'].toUpperCase()}
                                </p>
                            </Link>
                            </p>
                            
                        })}
                        <span className = "text_content">
                            {researchGetRes?.data.research_description}
                        </span>
                    </div>
                    <div className = "research_heading_tabs">
                        <button
                            className="research_arrow"
                            onClick={prevTab}
                            disabled = {value === 1 ? true : false}
                        >
                            <ArrowBackIosNewIcon/>
                        </button>
                        <Box sx = {{ 
                            minWidth: 100,
                            width: '1fr'
                         }}>
                            
                            <Tabs
                                value={value}
                                onChange={switchTabs}
                                textColor="secondary"
                                indicatorColor="secondary"
                                aria-label="scrollable tabs"
                                variant="scrollable"
                                scrollButtons="auto"
                            >
                                
                                <Tab value={1} label="Dataset"/>
                                <Tab value={2} label="Studies" />
                                <Tab value={3} label="Discussions" />
                                <Tab value={4} label="Metadata" />
                                {
                                    isAuthor() &&
                                    <Tab value={5} label="Settings"/>
                                }
                            </Tabs>
                        </Box>
                        <button
                            className="research_arrow"
                            onClick={nextTab}
                            disabled = {value === 5 ? true : false}
                        >
                            <ArrowForwardIosIcon/>
                        </button>
                    </div>
                </div>
                {value === 1 &&
                <>
                <Fade in={value === 1}>
                    <div>
                        <ResData
                            DataSetFile = {datasetFile}
                        />
                    </div>
                        
                </Fade>
                </>
                }
                {value === 2 &&
                <>
                    <Fade in={value === 2}>
                        <div>
                            <ResStudies
                                DataSetFile = {datasetFile}
                                User = {processed?.user?._id}
                            />
                        </div>
                    </Fade>
                </>
                    
                }
                {value === 3 &&
                <>
                <Fade in={value === 3}>
                    <div className="research_body_container">
                        <div className="research_body_heading">
                            <span className ="text_topic">Discussions</span>
                            <p className ="text_label">FORUM AND THREADS</p>
                        </div>

                    </div>
                </Fade>
                </>
                    
                }
                {value === 4 &&
                <>
                <Fade in={value === 4}>
                    <div className="research_body_container">
                        <div className="research_body_heading">
                            <span className ="text_topic">Metadata</span>
                            <p className ="text_label">RESEARCH DETAILS</p>
                        </div>

                    </div>
                </Fade>
                </>
                }
                {value === 5 &&
                <>
                    <Fade in={value === 5}>
                        <div className="research_body_container">
                            <div className="research_body_heading">
                                <span className ="text_topic">Settings</span>
                                <p className ="text_label">EDIT RESEARCH DETAILS</p>
                            </div>

                        </div>
                    </Fade>
                </>
                    
                }
                
            </div>
        );
    }else if(researchGetRes?.code === 'RESEARCH_NOT_EXIST'){
        return(
            <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                <Alert variant="outlined" severity="error">
                    <AlertTitle>404 not found</AlertTitle>
                    This page does not exist. Please check the URL thoroughly or notify us if this is a mistake.
                </Alert>
            </Grow>
        )
    }else if(processed === "Request failed with status code 500"){
        return(
            <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                <Alert variant="outlined" severity="error">{status500}</Alert>
            </Grow>
        )
    }else{
        return (
            <>
                <Skeleton variant="circular" width={100} height={100} animation="wave"/>
                <Skeleton variant="text" width={300} height={40} animation="wave"/>
                <Skeleton variant="text" width={400} height={40} animation="wave"/>
                <Skeleton variant="text" width={500} height={40} animation="wave"/>
                <Skeleton variant="rectangular" width={500} height={350} animation="wave" />
            </>
        );
    }
}