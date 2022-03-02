import "../../StyleSheets/resstudyfolder/resstudy.css"


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

export default function ResStudies(props){

    // main study variables
    const [studyName, setStudyName] = useState("");
    const [studyDesc, setStudyDesc] = useState("");
    const [studyMethod, setStudyMethod] = useState();
    const [studyColumns, setStudyColumns] = useState([]);
    const [tool, setTool] = useState("");

    const [isAdding, setAdding] = useState(false);
    const [showActive, setShowActive] = useState(1);
    const [selected, setSelected] = useState(false);
    const [methodChosen, setMethodChosen] = useState("");
    const [tags, setTags] = useState([]);
    const [error, setError] = useState();
    const [isOpenErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    const [callbackColumnsCleanOptions, setCallbackColumnsCleanOptions] = useState([]);

    

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

    const fileDetailsSelector = useSelector((state) => 
        state.datasetDetails
    );
    const { datasetDetails } = fileDetailsSelector;

    const studyDetailsSelector = useSelector((state) => 
        state.getStudyRes
    );
    const { getStudyRes } = studyDetailsSelector;

    const saveStudySelector = useSelector((state) => 
        state.saveStudy
    );
    const { saveStudyRes } = saveStudySelector;

    const callbackCheckbox = (checked) => {
        setTags(checked);
    }

    const displayMethodChosen = (choice) =>{
        setMethodChosen(choice);
    }


    const handleAdding = (value) => {
        setAdding(value)
     };

     const handleSelected = function(value) {
        setSelected(value)
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
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenErrorSnackbar(false);
      };

    const handleSubmit = () => {
        if(methodChosen.length === 0){
            setError("Please select a method for your analysis. You can either pick the recommended methods for your selection or pick anything that you think might suit your needs.");
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

        const dataObject = {
            'study_name': studyName,
            'research_id': researchGetRes.data._id,
            'created_by': props.User,
            'test_type': methodChosen,
            'created_at': new Date(Date.now()).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            'columns': studyColumns,
            'study_description': studyDesc,
            'options': callbackColumnsCleanOptions
        };

        dispatch(saveStudy(dataObject));

        if(saveStudyRes?.code === "STUDY_WRONG_VAR_COUNT"){
            setError(saveStudyRes?.error);
            setOpenErrorSnackbar(true);
            return;
        }else if(saveStudyRes?.code === "STUDY_DATA_HAS_NULL"){
            setError(saveStudyRes?.error);
            setOpenErrorSnackbar(true);
            return;
        }
    }

    const callbackSetSelectedRows = (ids) => {
        const selectedIDs = new Set(ids);
        const selectedColumns = [];

        selectedIDs.forEach(id => {
            selectedColumns.push(datasetDetails.details[id].column)
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
            backgroundColor: '#A742C5',
            color: '#ffffff',
        },
        completed: {
            backgroundColor: '#e7e7e7',
            color: '#A742C5',
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
        
        <div className="resStudy_body_container">
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
            {selected
                ?(
                    <div className="resStudy_body_add">
                        <Button 
                            color="secondary" 
                            className="resStudy_body_add_button"
                            onClick={()=>handleSelected(false)}
                        >
                            <ArrowBackIosNewIcon/>
                            Back to List
                        </Button>
                    </div>
                )
                :(
                    <>
                    {isAdding
                        ?(
                            <div className="resStudy_body_add">
                                <Button 
                                    color="secondary" 
                                    className="resStudy_body_add_button"
                                    onClick={()=>handleAdding(false)}
                                >
                                    <ArrowBackIosNewIcon/>
                                    Back to List
                                </Button>
                            </div>
                        )
                        : props.IsAuthor ?
                        <div className="resStudy_body_add">
                            <Button 
                                color="secondary" 
                                className="resStudy_body_add_button"
                                onClick={()=>handleAdding(true)}
                            >
                                <AddIcon className="AddIcon"/>
                                add new study
                            </Button>
                            <Sorter/>
                        </div>
                        : 
                        <div className="resStudy_body_add">
                            <Button 
                                color="secondary" 
                                className="resStudy_body_add_button"
                                onClick={()=>handleAdding(true)}
                                disabled
                            >
                                <AddIcon className="AddIcon"/>
                                cannot add study
                            </Button>
                        <Sorter/>
                    </div>
                    }
                    </>

                )
            
            }
            
                
            {selected
            ?(
                <Fade in={selected}>
                    <div>
                        <Study data={getStudyRes.data.filter(i => i[0] === selected)[0]} details={datasetDetails}/>
                    </div>
                </Fade>
            )
            :(
                <>
                {isAdding
                    ? (
                        
                    <div className = "resStudy_body_content">
                        <Stepper activeStep={showActive-1} alternativeLabel>
                            {studyStepsString.map((label) => (
                                <Step key={label}>
                                    <StepLabel StepIconComponent={CustomStepIcon} >
                                        <div className="stepper_div">{label}</div>
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
                                <div>
                                    <TextField
                                        id="outlined-textarea"
                                        label="Study Title"
                                        placeholder="Add new title"
                                        multiline
                                        rows={2}
                                        color = "secondary"
                                        onChange={e => setStudyName(e.target.value)}
                                        value={studyName}
                                        fullWidth
                                    />
                                </div>
                                <div style={{paddingTop:"1rem"}}>
                                    <TextField
                                        id="outlined-textarea"
                                        label="Study Description"
                                        placeholder="Add description"
                                        multiline
                                        rows={4}
                                        color = "secondary"
                                        onChange={e => setStudyDesc(e.target.value)}
                                        value={studyDesc}
                                        fullWidth
                                    />
                                </div>
                                
                            
                            </Box>
                        }
                        {showActive === 2 &&
                            <Box className = "StudyTitle">
                                <Alert icon={tool !== "" ? <CheckCircleOutlineOutlinedIcon/> : <InfoOutlinedIcon/>} color="secondary" sx={{marginBottom:"1rem"}}>
                                    Select your preferred tool
                                </Alert>
                                
                                <div className="resList_tools">
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
                                        datasetDetails = {datasetDetails}
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
                                        datasetDetails = {datasetDetails}
                                        callbackSetSelectedRows = {callbackSetSelectedRows}
                                        studyColumns = {studyColumns}
                                        callbackColumnsCleanOptions = {callbackColumnsCleanOptions}
                                        setCallbackColumnsCleanOptions = {setCallbackColumnsCleanOptions}
                                        
                                    />
                                }

                                
                            </Box>
                        }
                        {showActive === 3 &&
                            <div className="ToolChoices">
                                {tool === "Statistical Method" 
                                    ? <StatisticalChoices tags={tags} display={displayMethodChosen} chosen={methodChosen}/>
                                    : <MachineLearningChoices tags={tags} display={displayMethodChosen} chosen={methodChosen}/>
                                }
                            </div>
                            
                           
                           
                        }
                         {showActive === 3 &&
                            <Button
                                onClick={handleSubmit}
                                color="secondary"
                            >
                            Compute
                            </Button>
                         }
                        
                        <Navigator
                            NextScreen={nextScreen}
                            PrevScreen={prevScreen}
                            ActiveStep = {showActive -1}
                            prevDisabled={true}
                        />
                    
                    </div>)
                    : (
                        <div className = "resStudy_body_content">
                            <div className = "resStudy_body_study">
                                {
                                    typeof getStudyRes !== 'undefined' ? getStudyRes.data?.map((i) => {
                                        return (
                                            <StudyCard
                                                HandleSelected = {handleSelected}
                                                title={i[1]}
                                                method={i[5]}
                                                description={i[2]}
                                                id={i[0]}
                                                parent={i[3]}
                                            />
                                        )
                                    }) : <CircularProgress color="info" thickness={2.5} size={30}/>
                                }
                            </div>
                        </div>
                    )
                }
                </>
            )}
        </div>
    );
}