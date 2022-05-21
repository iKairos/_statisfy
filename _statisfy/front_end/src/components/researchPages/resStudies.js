//import "../../StyleSheets/resstudyfolder/resstudy.css"
import "../../StyleSheets/NewCSSFiles/StudyFolder/StudySection.css"


import Navigator from "../navigator";

import Button from '@mui/material/Button';
import * as React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Skeleton, Stepper, Step, StepLabel, Typography } from "@mui/material";
import { useState } from "react";
import { status500, studyStepsString, studySuccess, studySuccessTitle } from "../../constants/stringConstants";
import { makeStyles } from "@mui/styles";


import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CloseIcon from '@mui/icons-material/Close';
import ScienceIcon from '@mui/icons-material/Science';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SummarizeIcon from '@mui/icons-material/Summarize';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import DoNotDisturbOutlinedIcon from '@mui/icons-material/DoNotDisturbOutlined';


import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Backdrop from '@mui/material/Backdrop';
import clsx from 'clsx';

import AllCards from "../AllCards";
import StatisticalChoices from "./resStudiesSelections/statisticalChoices";
import MachineLearningChoices from "./resStudiesSelections/machineLearningChoices";
import StudyCard from "../StudyCard";
import Study from "../study";
import { StatisticalSelection } from "./resStudiesSelections/statisticalSelection";
import { MachineLearningSelection } from "./resStudiesSelections/machineLearningSelection";

import Checkbox from "../Checkbox";
import { DataColumns } from "./dataColumns";
import { useDispatch, useSelector } from "react-redux";
import { Alert, CircularProgress, Fade, IconButton, Snackbar } from "@mui/material";

import { getStudy, saveStudy } from "../../actions/researchAction";

import { Sorter } from "../sorter";
import StatImg from '../../images/statisticsHeader.png'
import MLImg from '../../images/mlHeader.png'
import ToolCard from "../newDashBoard/ToolCard";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import _ from "lodash";
//<span className ="text_topic">{researchGetRes?.data.test_type}</span>

const ButtonStyles = makeStyles ({
    btn:{
      borderRadius: '0.5rem',
      width:'fit-content',
      height:'2.5rem',
      color:'#7051b8',
      backgroundColor:'white',
      fontWeight:'700',
      paddingLeft:'0.5rem',
      paddingRight:'0.5rem',
      fontFamily:'Poppins',
      border:'1px solid #7051b8',
    },
    btn3:{
        borderRadius: '0.5rem',
        width:'10rem',
        height:'2.5rem',
        color:'#7051b8',
        backgroundColor:'white',
        fontWeight:'700',
        paddingLeft:'0.5rem',
        paddingRight:'0.5rem',
        fontFamily:'Poppins',
        border:'1px solid #7051b8',
    },
    tabs:{
        textColor:'white'
    },
    icons:{
        color: '#7051b8'
    },
    textField:{
        color: '#7051b8',
    },
    root: {
        
        fontFamily:'Poppins',
        "& label.Mui-focused": {
          color: '#7051b8',
          fontFamily:'Poppins',
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: '#7051b8',
          fontFamily:'Poppins',
        },
        "& .MuiInput-underline:before": {
            fontFamily:'Poppins',
        },
        
    },
    alert:{
        backgroundColor:'white',
        border:'1px solid #7051b8',
        fontFamily:'Poppins'
    }
  })


export default function ResStudies(props){
    const ButtonClasses = ButtonStyles();

    // main study variables
    const [studyName, setStudyName] = useState("");
    const [studyDesc, setStudyDesc] = useState("");
    const [studyMethod, setStudyMethod] = useState();
    const [studyColumns, setStudyColumns] = useState([]);
    const [tool, setTool] = useState("");
    const [label, setLabel] = useState("");

    const [isAdding, setAdding] = useState(true);
    const [showActive, setShowActive] = useState(1);
    const [selected, setSelected] = useState(false);
    const [methodChosen, setMethodChosen] = useState("");
    const [tags, setTags] = useState([]);
    const [error, setError] = useState();
    const [isOpenErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    const [callbackColumnsCleanOptions, setCallbackColumnsCleanOptions] = useState([]);
    const [callbackTestSize, setCallbackTestSize] = useState(30);
    const [callbackIteration, setCallbackIteration] = useState(1000);
    const [callbackLearningRate, setCallbackLearningRate] = useState(0.05);
    

    const [open, setOpen] = React.useState(false);

    const [backdropOpen, setBackdropOpen] = useState(false);
    const handleBackdropClose = () => {
        setBackdropOpen(false);
    };
    const handleBackdropToggle = () => {
        setBackdropOpen(!open);
    };

    const anchorRef = React.useRef(null);

    const [purpose, setPurpose] = React.useState("");
    const handlePurpose = (event) => {
        setPurpose(event.target.value);
    };


 
    const dispatch = useDispatch();

    const dataSelector = useSelector((state) => 
        state.researchGet
    );
    const { researchGetRes } = dataSelector;

    const studyDetailsSelector = useSelector((state) => 
        state.getStudyRes
    );
    const { getStudyRes } = studyDetailsSelector;

    const saveStudySelector = useSelector((state) => 
        state.saveStudy
    );
    const { loading, saveStudyRes } = saveStudySelector;

    const callbackCheckbox = (checked) => {
        setTags(checked);
    }

    const displayMethodChosen = (choice) =>{
        setMethodChosen(choice);
    }


    const handleAdding = (value) => {
        setAdding(value);
     };

     const handleSelected = function(value) {
        setSelected(value);
        setAdding(false);
     };


    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
        }

        setOpen(false);
    };
    const handleTool = function(value){
        setTool(value);
        setStudyColumns([]);
        setPurpose("");
    }

    const handleCloseSnackbar = (event, reason) => {
        setOpenErrorSnackbar(false);
      };

    const handleSubmit = () => {
        if(methodChosen.length === 0){
            setError("Please select a method for your analysis. You can either pick the recommended methods for your selection or pick anything that you think might suit your needs.");
            setOpenErrorSnackbar(true);
            return;
        }

        if((methodChosen === "Linear Regression" && label === "" ) || methodChosen === "Logistic Regression" && label === ""){
            setError("A linear regression model needs a label or a variable to predict. Please select a variable to predict.");
            setOpenErrorSnackbar(true);
            return;
        }

        setError("");

        handleBackdropToggle();

        const formData = new FormData();
        formData.append("study_name", studyName);
        formData.append("research_id", researchGetRes.data._id);
        formData.append("created_by", props.User);
        formData.append("test_type", methodChosen);
        formData.append("created_at", new Date(Date.now()).toISOString().replace(/T/, ' ').replace(/\..+/, ''));
        formData.append("columns", studyColumns);
        formData.append("study_description", studyDesc);
        formData.append("options", callbackColumnsCleanOptions);
        formData.append("label", label);
        formData.append("testSize", callbackTestSize);
        formData.append("iterations", callbackIteration);
        formData.append("learningRate", callbackLearningRate);
        
        const dataObject = {
            'study_name': studyName,
            'research_id': researchGetRes.data._id,
            'created_by': props.User,
            'test_type': methodChosen,
            'created_at': new Date(Date.now()).toISOString(),
            'columns': studyColumns,
            'study_description': studyDesc,
            'options': callbackColumnsCleanOptions,
            'label': label,
            'testSize': callbackTestSize,
            'iterations': callbackIteration,
            'learningRate': callbackLearningRate
        };

        dispatch(saveStudy(dataObject));

        while(typeof saveStudyRes !== 'undefined'){
            if(saveStudyRes?.code === "STUDY_ADD_FAIL"){
                setOpenErrorSnackbar(true);
                setError(saveStudyRes?.error);
            }

            return;
        }
    }

    const callbackSetSelectedRows = (ids) => {
        const selectedIDs = new Set(ids);
        const selectedColumns = [];

        selectedIDs.forEach(id => {
            selectedColumns.push(props.DatasetDetails.details[id].column)
        });

        setCallbackColumnsCleanOptions(selectedColumns.map(col => 
            {
              return {
                'column': col,
                'normalize': false,
                'null_option': {
                  'method': 'nothing',
                  'replace_by': 'mean'
                },
                'outlier_option': {
                  'method': 'nothing',
                  'replace_by': 'mean'
                }
              }
            }  
          ));

        setStudyColumns(selectedColumns);

        if(selectedColumns.length === 1){
            setTags([purpose, "One Variable"]);
        }else if(selectedColumns.length === 2){
            setTags([purpose, "Two Variables"]);
        }else if(selectedColumns.length >= 3){
            setTags([purpose, "Multiple Variables"]);
        }else{
            setTags([...tags]);
        }

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

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        const formData = new FormData()
        formData.append("research_id", researchGetRes.data._id)

        dispatch(getStudy(formData))
        
        if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const useStyles = makeStyles(() => ({
        root: {
            backgroundColor: '#b5b5b5',
            color: '#ffffff',
            padding: 1,
            borderRadius: '50%',

        },
        active: {
            backgroundColor: '#7051b8',
            color: '#ffffff',
        },
        completed: {
            backgroundColor: '#e7e7e7',
            color: '#7051b8',
        },

    }));

    const CustomStepIcon = (props) => {
        const classes = useStyles();
        const { active, completed } = props;
    
        const stepIcons = {
          1: <ScienceIcon />,
          2: <FileUploadIcon />,
          3: <SummarizeIcon />
        };

        return (
          <div
            className={clsx(classes.root, {
              [classes.active]: active,
              [classes.completed]: completed,
            })}
          >
            {stepIcons[String(props.icon)]}
          </div>
        );
    };
    const nextScreen = () => {

        if(showActive === 1){
            if(studyName.length === 0 || studyDesc.length === 0){
                setError("Please name and describe your study.");
                setOpenErrorSnackbar(true);
                return;
            }
        }else if(showActive === 2){
            if(tool?.length === 0 || typeof tool === "undefined"){
                setError("Please select an analysis tool for your study.");
                setOpenErrorSnackbar(true);
                return;
            }

            if(purpose.length === 0){
                setError("Please select a purpose for your study.");
                setOpenErrorSnackbar(true);
                return;
            }

            if(studyColumns.length === 0){
                setError("Please select a column to analyze.");
                setOpenErrorSnackbar(true);
                return;
            }
        }else if(showActive === 3){
            if(methodChosen.length === 0){
                setError("Please select a method for your analysis. You can either pick the recommended methods for your selection or pick anything that you think might suit your needs.");
                setOpenErrorSnackbar(true);
                return;
            }
        }

        setShowActive(showActive + 1);
    }
    const prevScreen = () => {
        setShowActive(showActive - 1);
    }
    const history = useHistory();

    if(saveStudyRes?.code === "STUDY_ADD_SUCCESS"){
        history.push({
            pathname: `/dashboard/${props.Parent}`,
            state: {
                message: {
                    'title': studySuccessTitle,
                    'body': studySuccess
                },
                openSnackbar: true
            }
        });
        history.go(0);
        return;
    }

    return(
        <div className = "StudySection">
            {
                error &&
                <Snackbar 
                    open={isOpenErrorSnackbar} 
                    onClose={handleCloseSnackbar}
                    action={action}
                >
                    <Alert severity="error" variant="filled">
                        {error}
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
            <div className="StudySection_header">
                {props.IsAuthor?(
                    <div className="resStudy_body_add">
                        <Button 
                            color="secondary"
                            onClick={()=>handleAdding(true)}
                            className={ButtonClasses.btn}
                        >
                            <AddIcon className={ButtonClasses.icons}/>
                            add new study
                        </Button>
                    </div>
                ):(
                    <div className="resStudy_body_add">
                        <Button 
                            color="secondary" 
                            className="resStudy_body_add_button"
                            disabled
                        >
                            <DoNotDisturbOutlinedIcon className="AddIcon"/>
                            only authors can add studies
                        </Button>
                    </div>
                )}
            </div>

            
            <div className = "StudySection_body">
                <div className = "StudySection_body_list">
                    <div className = "StudySection_body_list_header"> 
                        <h5 className="StudyText_listHeader"> STUDY LIST</h5>
                    </div>
                    {
                        typeof getStudyRes !== 'undefined' ? getStudyRes.data?.map((i) => {
                            return (
                                <StudyCard
                                    HandleSelected = {handleSelected}
                                    title={i['study_name']}
                                    method={i['test_type']}
                                    description={i['study_description']}
                                    id={i['_id']}
                                    parent={i['research_id']}
                                    isAuthor={props.IsAuthor}
                                />
                            )
                        }) : <CircularProgress color="secondary" thickness={2.5} size={30}/>
                    }
                </div>
                <div className = "StudySection_body_study">
                    {isAdding 
                    ?(
                        <div className = "StudySection_body_study_content">
                             <h5 className="StudyText_newStudyTitle">Create New Study</h5>
                                <Stepper activeStep={showActive-1} alternativeLabel>
                                    {studyStepsString.map((label) => (
                                        <Step key={label}>
                                            <StepLabel StepIconComponent={CustomStepIcon} >
                                                <p className="StudyText_cardDetails">{label}</p>
                                            </StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                                <Backdrop
                                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                    open={open}
                                >
                                    <CircularProgress color="inherit" />
                                </Backdrop>
                                {showActive === 1 &&
                                    <Box
                                    component="form"
                                    noValidate
                                    autoComplete="off"
                                    className = "StudyTitle"
                                    >
                                       <div style={{paddingTop:"1rem"}}>
                                            <h6 className="StudyText_newStudyLabel">
                                                Study Title
                                            </h6>
                                            <TextField
                                                id="outlined-textarea"
                                                hiddenLabel
                                                placeholder="Add new title"
                                                multiline
                                                rows={2}
                                                color = "secondary"
                                                onChange={e => setStudyName(e.target.value)}
                                                value={studyName}
                                                fullWidth
                                                variant="standard"
                                                className={ButtonClasses.root}
                                            />
                                       </div>
                                       
                                        <div style={{paddingTop:"1rem"}}>
                                            <h6 className="StudyText_newStudyLabel">
                                                Study Description
                                            </h6>
                                            <TextField
                                                id="outlined-textarea"
                                                hiddenLabel
                                                placeholder="Add description"
                                                multiline
                                                rows={4}
                                                color = "secondary"
                                                onChange={e => setStudyDesc(e.target.value)}
                                                value={studyDesc}
                                                fullWidth
                                                variant="standard"
                                                className={ButtonClasses.root}
                                            />
                                        </div>
                                        
                                    
                                    </Box>
                                }
                                {showActive === 2 &&
                                    <Box className = "StudySection_tools">
                                        <Alert 
                                            icon={tool !== "" 
                                                ? <CheckCircleOutlineOutlinedIcon className={ButtonClasses.icons}/> 
                                                : <InfoOutlinedIcon className={ButtonClasses.icons}/>} 
                                            className={ButtonClasses.alert} 
                                            sx={{marginBottom:"1rem"}}>
                                            Select your preferred tool
                                        </Alert>
                                        
                                        <div className = "StudySection_tools_cards">
                                            <ToolCard
                                                Title = "Statistical Tool"
                                                Desc = "this is statistical tool"
                                                ToolSelected = {tool}
                                                HandleTool = {handleTool}
                                                ToolLabel = "Statistical Method"
                                                img = {StatImg}
                                            />
                                            <ToolCard
                                                Title = "Machine Learning Tool"
                                                Desc = " this is Machine Learning Tool"
                                                ToolSelected = {tool}
                                                HandleTool = {handleTool}
                                                ToolLabel = "Machine Learning"
                                                img = {MLImg}
                                            />
                                        </div>
                                        {tool === "Statistical Method" &&
                                            <StatisticalSelection
                                                purpose = {purpose}
                                                handlePurpose = {handlePurpose}
                                                setTags = {setTags}
                                                datasetDetails = {props.DatasetDetails}
                                                callbackSetSelectedRows = {callbackSetSelectedRows}
                                                studyColumns = {studyColumns}
                                                callbackColumnsCleanOptions = {callbackColumnsCleanOptions}
                                                setCallbackColumnsCleanOptions = {setCallbackColumnsCleanOptions}
                                                
                                            />
                                        }
                                        {tool === "Machine Learning" &&
                                            <MachineLearningSelection
                                                purpose = {purpose}
                                                handlePurpose = {handlePurpose}
                                                setTags = {setTags}
                                                datasetDetails = {props.DatasetDetails}
                                                callbackSetSelectedRows = {callbackSetSelectedRows}
                                                studyColumns = {studyColumns}
                                                callbackColumnsCleanOptions = {callbackColumnsCleanOptions}
                                                setCallbackColumnsCleanOptions = {setCallbackColumnsCleanOptions}
                                                setLabel = {setLabel}
                                                label = {label}        
                                            />
                                        }
    
                                        
                                    </Box>
                                }
                                {showActive === 3 &&
                                    <div className="ToolChoices">
                                        {tool === "Statistical Method" 
                                            ? <StatisticalChoices tags={tags} display={displayMethodChosen} chosen={methodChosen}/>
                                            : <MachineLearningChoices tags={tags} display={displayMethodChosen} chosen={methodChosen}
                                                callbackTestSize = {callbackTestSize}
                                                setCallbackTestSize = {setCallbackTestSize}
                                                callbackIteration = {callbackIteration}
                                                setCallbackIteration = {setCallbackIteration}
                                                callbackLearningRate = {callbackLearningRate}
                                                setCallbackLearningRate = {setCallbackLearningRate}
                                            />
                                        }
                                        {loading ?(
                                            <CircularProgress  className={ButtonClasses.icons} thickness={2.5} size={30}/>

                                        ):(
                                            <Button
                                                onClick={handleSubmit}
                                                className={ButtonClasses.btn3}
                                                sx={{
                                                    margin:'1rem',
                                                    alignSelf:'center',
                                                }}
                                            >
                                            Compute
                                            </Button>
                                        )
                                        }
                                    </div>
                                    
                                
                                
                                }
                                
                                <Navigator
                                    NextScreen={nextScreen}
                                    PrevScreen={prevScreen}
                                    ActiveStep = {showActive -1}
                                    prevDisabled={true}
                                />
                            
                            </div>
                    )
                    :(<>
                        {selected &&
                            (
                                <Study 
                                    data={getStudyRes?.data.filter(i => i['_id'] === selected)[0]} 
                                    details={props.DatasetDetails}
                                />     
                            )
                        }
                    
                    </>)
                    }
                    
                    

                </div>
            </div>
            
        </div>
        
    );
}