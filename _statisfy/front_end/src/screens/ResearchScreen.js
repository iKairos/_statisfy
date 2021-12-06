
import "../StyleSheets/researchfolder/research.css"
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getResearch } from "../actions/researchAction";
import { Alert, AlertTitle, Grow, Skeleton } from "@mui/material";
import TableChartIcon from '@mui/icons-material/TableChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CalculateIcon from '@mui/icons-material/Calculate';
import { processUserToken } from "../actions/userActions";


export default function ResearchScreen(props){
    const { id } = useParams();
    const [value, setValue] = React.useState('one');
    const [contentPage, setContentPage] = React.useState('one');

    const dispatch = useDispatch();
    const dataSelector = useSelector((state) => 
        state.researchGet
    );
    const userdataSelector = useSelector((state) => 
        state.decodedUserToken
    );

    const { processed } = userdataSelector;
    const {researchGetRes} = dataSelector;

    const switchTabs = (event, newValue) => {
        setValue(newValue);
    };

    const switchContentPage = (event, newValue) => {
        setContentPage(newValue);
    };

    const isAuthor = () => {
        const x = researchGetRes?.data.authors.map(author => {
            return author['uid'] === processed?.user?._id;
        });

        return x[0];
    }

    if(props.token && processed?.code === "TOKEN_FAIL"){
        localStorage.removeItem('token');
    }

    React.useEffect(() => {
        dispatch(processUserToken(props.token));
        dispatch(getResearch(id));
    }, []);

    if(researchGetRes?.code === 'RESEARCH_GET_SUCCESS'){
        return(
            <div className = "research">
                <div className = "research_container research_header">
                    <div className = "research_header_display">
                        <span className ="text_title">{researchGetRes?.data.research_name}</span>
                        <p className ="text_label">{researchGetRes?.data.authors.map(author => author['username'].toUpperCase())}</p>
                        <span className = "text_content">
                            {researchGetRes?.data.research_description}
                        </span>
                    </div>
                    <div className = "research_header_tabs">
                        <Box sx={{ width: '100%' }}>
                            <Tabs
                                value={value}
                                onChange={switchTabs}
                                textColor="secondary"
                                indicatorColor="secondary"
                                aria-label="secondary tabs example"
                            >
                                <Tab value="one" label="Computation" />
                                <Tab value="two" label="Interpretation" />
                                <Tab value="three" label="Discussions" />
                                <Tab value="four" label="Metadata" />
                                {
                                    isAuthor() &&
                                    <Tab value="five" label="Settings" />
                                }
                            </Tabs>
                        </Box>
                    </div>
                </div>
                {value === "one" &&
                <div className="research_container research_body">
                    <div className = "research_body_header">
                        <span className ="text_topic">{researchGetRes?.data.test_type}</span>
                        <p className ="text_label">STATISTICS</p>

                    <Box sx={{ width: '100%' }}>
                        <Tabs
                            value={contentPage}
                            onChange={switchContentPage}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                        >
                            <Tab value="one" label="Dataset" icon={<TableChartIcon/>}/>
                            <Tab value="two" label="Graphs" icon={<TimelineIcon/>}/>
                            <Tab value="four" label="Variables" icon={<CalculateIcon/>}/>
                            <Tab value="three" label="Results" icon={<DoneAllIcon/>}/>
                        </Tabs>
                    </Box>
                    </div>
                    
                </div>
                }

                {value === "two" &&
                <div className="research_container research_body">
                    <div className = "research_body_header">
                        <span className ="text_topic">Interpretation of the Results</span>
                        <p className ="text_label">SUMMARY</p>
                    </div>
                </div>
                }

                {value === "three" &&
                <div className="research_container research_body">
                    <div className = "research_body_header">
                        <span className ="text_topic">Discussions</span>
                        <p className ="text_label">FORUM AND THREADS</p>
                    </div>
                </div>
                }

                {value === "four" &&
                <div className="research_container research_body">
                    <div className = "research_body_header">
                        <span className ="text_topic">Metadata</span>
                        <p className ="text_label">RESEARCH DETAILS</p>
                    </div>
                </div>
                }

                {value === "five" &&
                <div className="research_container research_body">
                    <div className = "research_body_header">
                        <span className ="text_topic">Settings</span>
                        <p className ="text_label">EDIT RESEARCH DETAILS</p>
                    </div>
                </div>
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