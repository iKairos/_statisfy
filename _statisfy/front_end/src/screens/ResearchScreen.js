//import "../StyleSheets/researchfolder/research.css"
import "../StyleSheets/NewCSSFiles/researchFolder/ResearchScreen.css"
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getResearch } from "../actions/researchAction";
import { useState } from "react";
import { Alert, AlertTitle, Fade, Grow, IconButton, Skeleton, Snackbar, Typography} from "@mui/material";
import { Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


import AnalyticsIcon from '@mui/icons-material/Analytics';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ForumIcon from '@mui/icons-material/Forum';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import SettingsIcon from '@mui/icons-material/Settings';


import { processUserToken } from "../actions/userActions";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';


import ResData from "../components/researchPages/resData";
import ResStudies from "../components/researchPages/resStudies";
import ResMeta from "../components/researchPages/resMeta";


import { status500 } from "../constants/stringConstants";
import { processDataset } from "../actions/datasetActions";

import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import InfoOutlined from "@mui/icons-material/InfoOutlined";

const ButtonStyles = makeStyles ({
    btn:{
      borderRadius: '0.5rem',
      width:'8rem',
      height:'2.5rem',
      color:'white',
      backgroundColor:'#7051b8',
      fontWeight:'500',
      paddingLeft:'0.5rem',
      paddingRight:'0.5rem',
      fontFamily:'Poppins'
    },
    tabs:{
        textColor:'white'
    }
  })

  const StyledTabs = styled((props) => (
    <Tabs
      {...props}
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
  ))({
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
      maxWidth: 0,
      width: '100%',
      height: '2rem',
      backgroundColor: '#23272a',
    },
    
  });
  
  const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        minHeight:'auto',
      textTransform: 'none',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(18),
      marginRight: theme.spacing(1),
      color: '#23272a',
      '&.Mui-selected': {
        color: '#fff',
        backgroundColor: '#7051b8',
      },
      '&.Mui-focusVisible': {
        backgroundColor: '#000',
      },
      borderRadius: '0.5rem',
      backgroundColor: 'transparent',
    }),
  );

export default function ResearchScreen(props){

    const ButtonClasses = ButtonStyles();

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
    const { researchGetRes } = dataSelector;
    const { datasetFile } = filedataSelector;   

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
            return author['user'] === processed?.user?._id;
        });

        return x.includes(true);
    }

    if(props.token && processed?.code === "TOKEN_FAIL"){
        localStorage.removeItem('token');
    }
/*
    if(typeof datasetFile !== 'undefined'){
        const formData = new FormData();
        formData.append("filepath", datasetFile.directory);
        formData.append("delimiter", ','); // temporary fix

        dispatch(processDataset(formData))
    }
*/
    React.useEffect(() => {
        dispatch(processUserToken(props.token));
        dispatch(getResearch(id));

        if(location.state){
            setMessage(location.state.message);
            setOpenErrorSnackbar(location.state.openSnackbar);
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

    // snackbar utils
    const [isOpenSnackbar, setOpenErrorSnackbar] = useState(false);
    const handleCloseSnackbar = () => {
        setOpenErrorSnackbar(false);
    }
    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
    );

    if(researchGetRes?.code === 'RESEARCH_GET_SUCCESS'){
        return(
            <div className = "research">

                <div className = "ResearchScreen">
                    <div className = "ResearchScreen_header">
                        {
                            message &&
                            <Snackbar
                                open={isOpenSnackbar} 
                                onClose={handleCloseSnackbar}
                                action={action}
                            >
                                <Alert severity="success" variant="filled">
                                    {message.body}
                                    <React.Fragment>
                                        <IconButton
                                            size="small"
                                            aria-label="close"
                                            color="inherit"
                                            onClick={handleCloseSnackbar}
                                        >
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    </React.Fragment>
                                </Alert>
                            </Snackbar>
                        }

                        {researchGetRes?.data.authors.map(author => {
                            return <p className="ResearchScreenText_profName">
                            <Link to={`/profile/${author['user']}`}
                            style={{ textDecoration: 'none' }}
                            >
                                    {author['username']} 
                            </Link>
                            - CREATED 2 MONTHS AGO
                            </p>
                            
                        })}
                        <h5 className="ResearchScreenText_resTitle">
                            {researchGetRes?.data.research_name}
                        </h5>
                        <h6 className="ResearchScreenText_resDesc">
                            {researchGetRes?.data.research_description}
                        </h6>

                        <div className = "ResearchScreen_header_footer">
                            <p className="ResearchScreenText_resFooter">
                                Author: Placeholder
                            </p>
                        </div>
                        <Button 
                            sx={{position:'absolute', bottom:'1rem', right:'1rem'}}
                            className={ButtonClasses.btn}
                            variant="contained"
                            color="secondary"
                        >
                            Edit Profile
                        </Button>
                    </div>
                    <div className = "ResearchScreen_tabs">
                        <Box sx = {{
                            maxWidth: { xs: 320, sm: 480, md: 900 },
                            minWidth: { xs: 320, sm: 480, md: 900 },
                         }}>
                            
                            <StyledTabs
                                value={value}
                                onChange={switchTabs}
                                indicatorColor="secondary"
                                aria-label="scrollable tabs"
                                variant="scrollable"
                                scrollButtons
                                allowScrollButtonsMobile
                            >
                                
                                <StyledTab icon={<AnalyticsIcon fontSize='inherit'/>} iconPosition="start" value={1} label="Dataset" />
                                <StyledTab icon={<MenuBookIcon fontSize='inherit'/>} iconPosition="start" value={2} label="Studies" />
                                <StyledTab icon={<ForumIcon fontSize='inherit'/>} iconPosition="start" value={3} label="Discussions" />
                                <StyledTab icon={<HelpCenterIcon fontSize='inherit'/>} iconPosition="start" value={4} label="Metadata" />
                                {
                                    isAuthor() &&
                                    <StyledTab icon={<SettingsIcon fontSize='inherit'/>} iconPosition="start" value={5} label="Settings"/>
                                }
                            </StyledTabs>
                        </Box>
                    </div>
                </div>
                {value === 1 &&
                    <ResData
                        DataSetFile = {datasetFile}
                        DatasetDetails = {researchGetRes?.data.dataset_details}
                        Url = {researchGetRes?.data.research_url}
                    />
                }
                {value === 2 &&
                <>
                    <Fade in={value === 2}>
                        <div>
                            <ResStudies
                                DataSetFile = {datasetFile}
                                DatasetDetails = {researchGetRes?.data.dataset_details}
                                User = {processed?.user?._id}
                                Parent = {id}
                                IsAuthor = {isAuthor()}
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
                        <ResMeta/>
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
                    <AlertTitle>Status Code: {researchGetRes?.code}</AlertTitle>
                    This research does not exist. Please check the URL thoroughly or notify us if this is a mistake.
                </Alert>
            </Grow>
        )
    }else if(processed === "Request failed with status code 500"){
        return(
            <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                <Alert variant="outlined" severity="error">{status500}</Alert>
            </Grow>
        )
    }else if(researchGetRes?.code === 'RESEARCH_GET_FAIL'){
        return(
            <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                <Alert variant="outlined" severity="error">
                    <AlertTitle>Research Fetch Failed</AlertTitle>
                    {researchGetRes?.message}
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