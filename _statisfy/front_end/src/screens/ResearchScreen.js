
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
import { processUserToken } from "../actions/userActions";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { status500 } from "../constants/stringConstants";

import { DisplayTable } from "../components/DisplayTable";

import createHistory from 'history/createBrowserHistory';

export default function ResearchScreen(props){
    const { id } = useParams();
    const location = useLocation();
    const [value, setValue] = useState(1);
    const [contentPage, setContentPage] = useState(1);
    const [message, setMessage] = useState();

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

    const switchTabs = (event, newValue) => {
        setValue(newValue);
    };
    const nextTab = function(){
        setValue(value+1);
    };
    const prevTab = function(){
        setValue(value-1);
    };
    const nextContent = function(){
        setContentPage(contentPage+1);
    };
    const prevContent = function(){
        setContentPage(contentPage-1);
    };


    const switchContentPage = (event, newValue) => {
        setContentPage(newValue);
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

    React.useEffect(() => {
        dispatch(processUserToken(props.token));
        dispatch(getResearch(id));

        if(location.state){
            setMessage(location.state.message);
        }

        const history = createHistory();
        history.replace();
    }, [location]);

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
                        <span className ="text_title">{researchGetRes?.data.research_name}</span>
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
                                
                                <Tab value={1} label="Computation"/>
                                <Tab value={2} label="Interpretation" />
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
                    <div className="research_body_container">
                        <div className="research_body_heading">
                            <span className ="text_topic">{researchGetRes?.data.test_type}</span>
                            <p className ="text_label">STATISTICS</p>
                        </div>
                        <div className="research_body_tabs">
                            <button
                                className="research_arrow"
                                onClick={prevContent}
                                disabled = {contentPage === 1 ? true : false}
                            >
                                <ArrowBackIosNewIcon/>
                            </button>
                            <Box sx = {{ 
                                minWidth: 100,
                                width: '1fr'
                             }}>
                                <Tabs
                                    value={contentPage}
                                    onChange={switchContentPage}
                                    textColor="secondary"
                                    indicatorColor="secondary"
                                    aria-label="scrollable tabs"
                                    variant="scrollable"
                                    scrollButtons="auto"
                                >
                                    <Tab value={1} label="Dataset" icon={<TableChartIcon/>}/>
                                    <Tab value={2} label="Graphs" icon={<TimelineIcon/>} />
                                    <Tab value={3} label="Variables" icon={<CalculateIcon/>} />
                                    <Tab value={4} label="Results" icon={<DoneAllIcon/>} />
                                </Tabs>
                            </Box>
                            <button
                                className="research_arrow"
                                onClick={nextContent}
                                disabled = {contentPage === 4 ? true : false}
                            >
                                <ArrowForwardIosIcon/>
                            </button>
                        </div>
                        {contentPage === 1 &&
                            <Fade in={contentPage === 1}>
                                <div className = "research_body_content">
                                    <div className = "research_dataset">
                                        <div className = "research_dataset_heading">
                                            Description
                                        </div>
                                        <div className = "research_dataset_desc">
                                            <p className = "text_topic"> Context</p>
                                            <p className = " text_content">
                                                This Dataset ChuChu
                                            </p>
                                            <p className = "text_topic"> Content</p>
                                            <p className = " text_content">
                                                This Dataset ChuChu
                                            </p>
                                            <p className = "text_topic"> Acknowledgements</p>
                                            <p className = " text_content">
                                                This Dataset ChuChu
                                            </p>
                                        </div>
                                        <div className = "research_dataset_table">
                                            <div className = "research_dataset_table_heading">
                                                dataset_name.csv (5.43 kB)
                                            </div>
                                            {typeof datasetFile !== 'undefined' ? <DisplayTable data={datasetFile.data} Header={true} rowNumber={15}/> : null}
                                        </div>
                                    </div>
                                </div>
                            </Fade>
                        }
                        
                    </div>
                    
                </Fade>
                </>
                

                }
                {value === 2 &&
                <>
                    <Fade in={value === 2}>
                        <div className="research_body_container">
                            <div className="research_body_heading">
                                <span className ="text_topic">Interpretation of the Results</span>
                                <p className ="text_label">STATISTICS</p>
                            </div>
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