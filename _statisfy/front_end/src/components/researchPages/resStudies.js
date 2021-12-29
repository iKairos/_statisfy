import "../../StyleSheets/resstudyfolder/resstudy.css"


import Navigator from "../navigator";

import Button from '@mui/material/Button';
import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Skeleton, Stepper, Step, StepLabel, Typography } from "@mui/material";
import { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { status500, studyStepsString } from "../../constants/stringConstants";
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
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Backdrop from '@mui/material/Backdrop';
import clsx from 'clsx';

import AllCards from "../AllCards";
import StudyCard from "../StudyCard";
import Study from "../study";
import Checkbox from "../Checkbox";
import { DataColumns } from "./dataColumns";
import { useDispatch, useSelector } from "react-redux";
import { Alert, CircularProgress, Fade, IconButton, Snackbar } from "@mui/material";
import { DisplayTable, MemoizedTable } from "../DisplayTable";
import { getStudy, saveStudy } from "../../actions/researchAction";

import StatImg from '../../images/statisticsHeader.png'
import MLImg from '../../images/mlHeader.png'
import ToolCard from "../newDashBoard/ToolCard";

//<span className ="text_topic">{researchGetRes?.data.test_type}</span>

export default function ResStudies(props){

    // main study variables
    const [studyName, setStudyName] = useState();
    const [studyDesc, setStudyDesc] = useState();
    const [studyMethod, setStudyMethod] = useState();
    const [studyColumns, setStudyColumns] = useState([]);
    const [tool, setTool] = useState();

    const [isAdding, setAdding] = useState(false);
    const [showActive, setShowActive] = useState(1);
    const [selected, setSelected] = useState(false);
    const [sort, setSort] = useState(1);
    const [ascending, setAscending] = useState(true);
    const [methodChosen, setMethodChosen] = useState();
    const [tags, setTags] = useState([]);
    const [error, setError] = useState();
    const [isOpenErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);


    const [openFilter, setFilter] = React.useState(false);
    const handleFilter = () => {
        setFilter(false);
    };
    const toggleFilter = () => {
        setFilter(!openFilter);
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

    const handleSort = (value) => {
       setSort(value)
    };

    const handleAdding = (value) => {
        setAdding(value)
     };

     const handleSelected = function(value) {
        setSelected(value)
     };

    const handleAscending = (value) => {
        setAscending(value)
     };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
        }

        setOpen(false);
    };
    const handleTool = function(value){
        setTool(value)
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenErrorSnackbar(false);
      };

    const handleSubmit = () => {
        if(typeof studyName === 'undefined' || typeof methodChosen === 'undefined' || typeof tool === 'undefined' || studyColumns.length === 0 || typeof studyDesc === 'undefined'){
            setError("Please fill out all required fields.");
            setOpenErrorSnackbar(true);
            return;
        }

        setError("");

        handleAdding(false);

        const formData = new FormData();
        formData.append("study_name", studyName);
        formData.append("research_id", researchGetRes.data._id);
        formData.append("created_by", props.User);
        formData.append("test_type", methodChosen);
        formData.append("created_at", new Date(Date.now()).toISOString().replace(/T/, ' ').replace(/\..+/, ''));
        formData.append("columns", studyColumns);
        formData.append("study_description", studyDesc);

        dispatch(saveStudy(formData));
    }

    const callbackSetSelectedRows = (ids) => {
        const selectedIDs = new Set(ids);
        const selectedColumns = [];

        selectedIDs.forEach(id => {
            selectedColumns.push(datasetDetails.details[id].column)
        });

        setStudyColumns(selectedColumns)
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
        } else if (event.key === 'Escape') {
        setOpen(false);
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
        setShowActive(showActive + 1);
    }
    const prevScreen = () => {
        setShowActive(showActive - 1);
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
                        :(
                        <div className="resStudy_body_add">
                            <Button 
                                color="secondary" 
                                className="resStudy_body_add_button"
                                onClick={()=>handleAdding(true)}
                            >
                                <AddIcon className="AddIcon"/>
                                add new study
                            </Button>
                            <Stack direction="row" spacing={2} className="Sort">
                                <div>
                                    <Button
                                        ref={anchorRef}
                                        id="composition-button"
                                        aria-controls={open ? 'composition-menu' : undefined}
                                        aria-expanded={open ? 'true' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleToggle}
                                        color="secondary"
                                    >
                                    Sort
                                    <SortIcon/>
                                    </Button>
                                    <Popper
                                        open={open}
                                        anchorEl={anchorRef.current}
                                        role={undefined}
                                        placement="bottom-start"
                                        transition
                                        disablePortal
                                    >
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin:
                                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                                        }}
                                        >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList
                                                autoFocusItem={open}
                                                id="composition-menu"
                                                aria-labelledby="composition-button"
                                                onKeyDown={handleListKeyDown}
                                            >
                                                <MenuItem 
                                                    onClick={ sort === 1
                                                        ? ()=>handleAscending(!ascending)
                                                        :()=>handleSort(1)}
                                                    sx={ sort === 1
                                                        ? {
                                                        width: "10rem",
                                                        color: "#a742c5"}
                                                        :{
                                                            width: "10rem",
                                                            color: "#23272a"
                                                        } 
                                                    }
                                                    
                                                >
                                                    Name
                                                    {sort === 1 
                                                        ?  (ascending 
                                                            ? <ArrowUpwardIcon/>
                                                            : <ArrowDownwardIcon/>)
                                                        :  null
                                                    }
                                                </MenuItem>
                                                <MenuItem 
                                                    onClick={ sort === 2
                                                        ? ()=>handleAscending(!ascending)
                                                        :()=>handleSort(2)}
                                                    sx={ sort === 2
                                                        ? {
                                                        width: "10rem",
                                                        color: "#a742c5"}
                                                        :{
                                                            width: "10rem",
                                                            color: "#23272a"
                                                        } 
                                                    }
                                                >
                                                    Date Created
                                                    {sort === 2 
                                                        ?  (ascending 
                                                            ? <ArrowUpwardIcon/>
                                                            : <ArrowDownwardIcon/>)
                                                        :  null
                                                    }
                                                </MenuItem>
                                                <MenuItem 
                                                    onClick={ sort === 3
                                                        ? ()=>handleAscending(!ascending)
                                                        :()=>handleSort(3)}
                                                    sx={ sort === 3
                                                        ? {
                                                        width: "10rem",
                                                        color: "#a742c5"}
                                                        :{
                                                            width: "10rem",
                                                            color: "#23272a"
                                                        } 
                                                    }
                                                >
                                                    Last Changed
                                                    {sort === 3 
                                                        ?  (ascending 
                                                            ? <ArrowUpwardIcon/>
                                                            : <ArrowDownwardIcon/>)
                                                        :  null
                                                    }
                                                </MenuItem>
                                            
                                            </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                        </Grow>
                                    )}
                                    </Popper>
                                </div>
                            </Stack>
                        </div>
                        )
                    }
                    </>

                )
            
            }
            
                
            {selected
            ?(
                <Fade in={selected}>
                    <div>
                        <Study data={getStudyRes.data.filter(i => i[0] === selected)[0]}/>
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
                                        fullWidth
                                    />
                                </div>
                                <div style={{paddingTop:"1rem"}}>
                                    <TextField
                                        id="outlined-textarea"
                                        label="Description"
                                        placeholder="Add description"
                                        multiline
                                        rows={4}
                                        color = "secondary"
                                        onChange={e => setStudyDesc(e.target.value)}
                                        fullWidth
                                    />
                                </div>
                            
                            </Box>
                        }
                        {showActive === 2 &&
                            <Box className = "StudyTitle">
                                <Typography>Select Tool:</Typography>
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
                                    <>
                                        <div className="filterContainer">
                                            <Typography>Select Statistical Method :</Typography>
                                            <IconButton onClick={toggleFilter}><FilterAltSharpIcon/></IconButton>
                                        </div>
                                        
                                        <Backdrop
                                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                            open={openFilter}
                                        >   
                                            
                                        <div className = "resStudy_statfilter">
                                            <IconButton 
                                                onClick={handleFilter}
                                                sx={{ position:"absolute", right: 0, top: 0}}
                                            >
                                                <CloseSharpIcon/>
                                            </IconButton>
                                            <Checkbox callbackFunction={callbackCheckbox}/>
                                        </div>
                                            
                                        </Backdrop>
                                        <AllCards tags={tags} display={displayMethodChosen} chosen={methodChosen}/>
                                    </>
                                
                                }


                               
                            </Box>
                        }
                        {showActive === 3 &&
                        <>
                            {typeof datasetDetails !== 'undefined' ? 
                                <MemoizedTable
                                    data={datasetDetails.details} 
                                    Header={true} 
                                    rowNumber={15}
                                    checked={true}
                                    callbackSetSelectedRows={callbackSetSelectedRows}
                                /> : <CircularProgress color="info" thickness={2.5} size={30}/>
                            }

                            <Button
                                onClick={handleSubmit}
                                color="secondary"
                            >
                            Compute
                            </Button>
                        </>
                            
                        
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