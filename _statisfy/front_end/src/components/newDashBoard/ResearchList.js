import  "../../StyleSheets/researchlistfolder/researchlist.css"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';

import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Fade, Skeleton, Stepper, Step, StepLabel, Grow, Alert, Typography, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from 'clsx';
import { status500, stepsString } from "../../constants/stringConstants";
import { processUserToken } from "../../actions/userActions";
import { processDataset } from "../../actions/datasetActions";
import { getResearch, saveResearch } from "../../actions/researchAction";


import ScienceIcon from '@mui/icons-material/Science';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import StatImg from '../../images/statisticsHeader.png'
import MLImg from '../../images/mlHeader.png'

import Navigator from "../../components/navigator";
import ToolCard from "./ToolCard";
import ResearchUpload from "./ResearchUpload";
import ResSummary from "./ResSummary";
import ResCard from "../researchPages/resCard";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function ResearchList(props){
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [showActive, setShowActive] = useState(1);
    const [isAdding, setAdding] = useState(false);
    const [sort, setSort] = useState(1);
    const [selected, setSelected] = useState(false);
    const [ascending, setAscending] = useState(true);
    const [tool, setTool] = useState();
    const [columns, setColumns] = useState([]);
    const [delimiter, setDelimiter] = useState(',');
    const [dataArray, setDataArray] = useState();
    const [display, setDisplay] = useState(false);
    const [file, setFile] = useState();
    const [_error, setError] = useState({});
    const dispatch = useDispatch();
    
    const fileDetailsSelector = useSelector((state) => 
        state.datasetDetails
    );

    const {loading, datasetDetails} = fileDetailsSelector;


    const handleTool = function(value){
        setTool(value)
    }

    const history = useHistory();

    const handleAdding = (value) => {
        handleToggle();
        setAdding(value);
        
    };
    const handleSelected = function(value) {
        history.push(`/dashboard/${value}`);
        history.go(0);
        return;
    };

    const handleSort = (value) => {
        setSort(value)
     };

    const handleAscending = (value) => {
        setAscending(value)
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const callbackColumns = (columns) => {
        setColumns(columns);
    }
    const callbackDelimiter = (delimiter) => {
        setDelimiter(delimiter);
    }

    const handleTitle = (e) => {
        setTitle(e.target.value)

        if(e.target.value.length > 200){
            setError({
                'titlePage': 'Title should not exceed 200 characters.'
            });
            return;
        }
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);

        if(e.target.value.length > 250){
            setError({
                'titlePage': 'Description should not exceed 250 characters.'
            });
            return;
        }
    }

    const handleCreateResearch = () => {
        const formData = new FormData();
        formData.append('research_name', title);
        formData.append('research_description', description);
        formData.append('delimiter', delimiter);
        formData.append('author', processed?.user._id);
        formData.append('created_at', new Date(Date.now()).toISOString().replace(/T/, ' ').replace(/\..+/, ''));
        formData.append('dataset', file);
 
        dispatch(saveResearch(formData));
    }

    const changeHandler = (e) => {
        if (e.target.files.length !== 0){
            var filename = e.target.files[0].name

            const extension = filename.split('.').pop();

            if(extension != 'csv'){
                setError({
                    'datasetPage': {
                        'code': 'EXTENSION_NOT_VALID',
                        'message': "File is not in comma-separated value (CSV) format. Please make sure you are uploading your dataset in CSV format."
                    }
                });
                return;
            }

            setError({
                'datasetPage': undefined
            });

            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                processCSV(text);
            }
            reader.readAsText(e.target.files[0]);

            const formData = new FormData();
            formData.append("file", e.target.files[0]);
            formData.append("delimiter", delimiter);

            dispatch(processDataset(formData));

            setFile(e.target.files[0])
            setDisplay(true);
        }
    }

    const processCSV = (str) => {
        const headers = str.slice(0,str.indexOf('\n')).split(delimiter);
        const rows = str.slice(str.indexOf('\n')+1).split('\n');

        var newArray = rows.map( (row, index) => {
            const values = row.split(delimiter);
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

    
    // ======= TOKEN HANDLING ======= //
    const dataSelector = useSelector((state) => 
        state.decodedUserToken
    );
    const { error, processed } = dataSelector;



    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
        } else if (event.key === 'Escape') {
        setOpen(false);
        }
    }
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
        }

        setOpen(false);
    };

    const researchSaveSelector = useSelector((state) => 
        state.researchSave
    );
    const {researchSaveRes} = researchSaveSelector;

    const researchGetSelector = useSelector((state) => 
        state.researchGet
    )

    const {researchGetRes} = researchGetSelector;

    const nextScreen = () => {
        if(title?.length == 0 || description?.length == 0 || typeof title === 'undefined' || typeof description === 'undefined' && showActive === 1){
            setError({
                'titlePage': "Please fill in all the details to continue."
            });
            return;
        } else if(title.length > 200 || description.length > 250 && showActive === 1){
            setError({
                'titlePage': 'Title should be at least 200 characters and description should be at least 250 characters.'
            });
            return;
        } else if (showActive === 1){
            setError({
                'titlePage': undefined
            });
        } else if(typeof tool === 'undefined' && showActive === 1){
            setError({
                'toolPage': 'Please select a tool before proceeding.'
            })
            return;
        }

        if(typeof file === 'undefined' && showActive === 2){
            setError({
                'datasetPage': {
                    'code': 'DATASET_IS_NULL',
                    'message': 'Please upload a file before proceeding.'
                }
            });
            return;
        }
        setShowActive(showActive + 1);
    }
    const prevScreen = () => {
        setShowActive(showActive - 1);
    }


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
   
    if(props.token && processed?.code === "TOKEN_FAIL"){
        localStorage.removeItem('token');
    }

    useEffect(() => {
        dispatch(processUserToken(props.token, 'getResearch'));
    }, [])

    return(
        <div className="resList_body_container">
            {isAdding
            ?(
                <div className="resList_body_add">
                    <Button 
                        color="secondary" 
                        className="resList_body_add_button"
                        onClick={()=>handleAdding(false)}
                    >
                        <ArrowBackIosNewIcon/>
                        Back to Research List
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
                                add new research
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

            {isAdding
                    ? (
                    <div className = "resList_body_content">
                        <div className="resList_stepper">
                            <Stepper activeStep={showActive-1} alternativeLabel>
                                {stepsString.map((label) => (
                                    <Step key={label}>
                                        <StepLabel StepIconComponent={CustomStepIcon} >
                                            <div className="stepper_div">{label}</div>
                                        </StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </div>
                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            
                            className = "StudyTitle"
                            
                        >
                            {showActive === 1 &&
                                <div className="resList_textField">
                                    {_error.titlePage && (
                                        <Grow in={_error.titlePage} {...(_error.titlePage ? { timeout: 1000 } : {})}>
                                            <Alert variant="outlined" severity="error">{_error.titlePage}</Alert>
                                        </Grow>
                                    )}
                                    <TextField
                                        id="outlined-textarea"
                                        label="Research Title"
                                        placeholder="Add new title"
                                        multiline
                                        rows={2}
                                        color = "secondary"
                                        fullWidth
                                        onChange={(e) => handleTitle(e)}
                                    />
                                    <TextField
                                        id="outlined-textarea"
                                        label="Description"
                                        placeholder="Add description"
                                        multiline
                                        rows={4}
                                        color = "secondary"
                                        fullWidth
                                        onChange={(e) => handleDescription(e)}
                                    />
                                    <Typography>
                                        Select Research Tool:
                                    </Typography>
                                    {props.Error && (
                                        <Grow in={_error.toolPage} {...(_error.toolPage ? { timeout: 1000 } : {})}>
                                            <Alert variant="outlined" severity="error">{_error.toolPage}</Alert>
                                        </Grow>
                                    )}
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
                                   

                                </div>
                            }
                            {showActive === 2 && 
                                <div className = "resList_upload">
                                    <ResearchUpload
                                         CallbackColumns = {callbackColumns}
                                         CallbackDelimiter = {callbackDelimiter}
                                         ChangeHandler = {changeHandler}
                                         DataArray = {dataArray}
                                         DatasetDetails = {datasetDetails}
                                         Display = {display}
                                         FileDetails = { file ? {
                                             'name': file.name,
                                             'size': file.size
                                         } : undefined}
                                         Error = {_error.datasetPage}
                                         Loading = {loading}
                                    />
                                </div>
                            }
                            {showActive === 3 &&
                                <div className = "resList_summary">
                                   <ResSummary
                                        Title = {title}
                                        Description = {description}
                                        Tool = {tool}
                                        FileDetails = { file ? {
                                            'name': file.name,
                                            'size': file.size
                                        } : undefined}
                                        DatasetDetails = {datasetDetails}
                                        SaveResearchHandler = {handleCreateResearch}
                                        Delimiter = {delimiter}
                                        ResearchRes = {researchSaveRes}
                                        Author = {processed?.user.username}
                                   />
                                </div>
                            }
                        </Box>


                        <Navigator
                            NextScreen={nextScreen}
                            PrevScreen={prevScreen}
                            ActiveStep = {showActive -1}
                            prevDisabled={true}
                        />
                    
                    </div>)
                    : (
                        <div className="resList_list">
                            {
                                typeof researchGetRes?.data !== 'undefined' ? (
                                    researchGetRes?.data.map(res => {
                                        return <ResCard
                                            title = {res.research_name}
                                            description = {res.research_description}
                                            tool = {res.created_at}
                                            _id = {res._id}
                                            HandleSelected = {handleSelected}
                                        />
                                    })
                                ) :  <CircularProgress color="info" thickness={2.5} size={30}/>
                            }
                        </div>
                    )
                }
            
        </div>
    ); 
}