import  "../../StyleSheets/NewCSSFiles/UserProfileFolder/ResearchList.css";
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
import { Fade, Skeleton, Stepper, Step, StepLabel, Grow, Alert, Typography, CircularProgress, Snackbar, IconButton, Divider } from "@mui/material";

import clsx from 'clsx';
import { status500, stepsString } from "../../constants/stringConstants";
import { processUserToken } from "../../actions/userActions";
import { processDataset } from "../../actions/datasetActions";
import { getResearch, getResearches, saveResearch } from "../../actions/researchAction";
import createHistory from 'history/createBrowserHistory';
import CloseIcon from '@mui/icons-material/Close';

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
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DoNotDisturbOutlinedIcon from '@mui/icons-material/DoNotDisturbOutlined';

import Navigator from "../../components/navigator";
import ToolCard from "./ToolCard";
import ResearchUpload from "./ResearchUpload";
import ResSummary from "./ResSummary";
import ResCard from "../researchPages/resCard";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { makeStyles } from "@mui/styles";
const buttonStyles = makeStyles ({
    field:{
      backgroundColor: "black",
      borderRadius: '0.25rem'
    },
    btn:{
      borderRadius: '1.5rem',
      width:'15rem',
      height:'2.5rem',
      color:'white',
      fontWeight:'500',
      backgroundColor: '#7051b8'
    },
    icon:{
        color:'#7051b8',
    }
})

export default function ResearchList(props){
    const ButtonClasses = buttonStyles();
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
    const [callbackNullCleaning, setCallbackNullCleaning] = useState('nothing');
    const [callbackNullReplace, setCallbackNullReplace] = useState('mean');
    const [callbackOutlierCleaning, setCallbackOutlierCleaning] = useState('nothing');
    const [callbackOutlierReplace, setCallbackOutlierReplace] = useState('mean');
    const [callbackSelectedCleanColumns, setCallbackSelectedCleanColumns] = useState([]);
    const [callbackColumnsCleanOptions, setCallbackColumnsCleanOptions] = useState([]);

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
        formData.append('created_at', new Date(Date.now()).toISOString());
        formData.append('dataset', file);
        formData.append('null_cleaning', callbackNullCleaning);
        formData.append('null_replace', callbackNullReplace);
        formData.append('outlier_cleaning', callbackOutlierCleaning);
        formData.append('outlier_repalce', callbackOutlierReplace);
 
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

            if(e.target.files[0].size >= 50000000){
                setError({
                    'datasetPage': {
                        'code': 'FILE_TOO_BIG',
                        'message': "File is too big for the server to handle. Your file should be at least less than 50 MB."
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

            setCallbackColumnsCleanOptions([]);
            setCallbackSelectedCleanColumns([]);

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

    const researchesGetSelector = useSelector((state) => 
        state.researchesGet
    )

    const {researchesGetRes} = researchesGetSelector;

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

    const location = useLocation();
    const [message, setMessage] = useState();

    const handleCloseSnackbar = () => {
        setOpenErrorSnackbar(false);
    }

    const [isOpenSnackbar, setOpenErrorSnackbar] = useState(false);

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

    React.useEffect(() => {
        if(props.id){
            dispatch(getResearches(props.id));
        }else{
            dispatch(getResearches(processed?.user._id));
        }
        
        if(location.state){
            setMessage(location.state.message);
            setOpenErrorSnackbar(location.state.openSnackbar)
        }

        const history = createHistory();
        history.replace();
    }, [location]);

    return(
            <div className = "ResearchList">
                <div className = "ResearchList_header">
                    <h5 className="ResearchText_header">
                        DATASET LIST
                    </h5>
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
                    
                        
                        {isAdding
                        ?(
                            <div className = "ResearchList_header_buttons">
                                <Button 
                                    color="secondary" 
                                    className={ButtonClasses.icon}
                                    onClick={()=>handleAdding(false)}
                                >
                                    <ArrowBackIosNewIcon/>
                                    Back 
                                </Button>
                            </div>
                        )
                        :(
                            <div className = "ResearchList_header_buttons">
                                {
                                    props.editable ? 
                                    <IconButton 
                                        color="secondary" 
                                        
                                        onClick={()=>handleAdding(true)}
                                    >
                                        <AddIcon className={ButtonClasses.icon}/>
                                    </IconButton>
                                    :
                                    <IconButton 
                                        color="secondary" 
                                        disabled
                                        onClick={()=>handleAdding(true)}
                                    >
                                        <AddIcon className={ButtonClasses.icon}/>
                                    </IconButton>
                                }
                            </div>
                        )
                        }
                </div>
                
                    {isAdding
                    ? (
                        <div className="ResearchList_content">
                        <Stepper activeStep={showActive-1} alternativeLabel>
                            {stepsString.map((label) => (
                                <Step key={label}>
                                    <StepLabel StepIconComponent={CustomStepIcon} >
                                        <div className="stepper_div">{label}</div>
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            className = "StudyTitle"
                        >
                            {showActive === 1 &&
                                <div className="ResearchList_Page1">
                                    {_error.titlePage && (
                                        <Grow in={_error.titlePage} {...(_error.titlePage ? { timeout: 1000 } : {})}>
                                            <Alert variant="filled" severity="error">{_error.titlePage}</Alert>
                                        </Grow>
                                    )}

                                    <div className="ResearchList_Page1_header">
                                        <DriveFileRenameOutlineIcon fontSize="large" className={ButtonClasses.icon}/>
                                        <h5 className="ResearchText_title">
                                            Describe Your Dataset
                                        </h5>

                                        <h6 className="ResearchText_content">
                                            Assign a name and description for your dataset for others to know them better! 🧠
                                        </h6>
                                    </div>
                                    <Divider/>
                                    <h5 className="ResearchText_subHeader">
                                        Research Title
                                    </h5>
                                    <TextField
                                        required
                                        id="outlined-textarea"
                                        hiddenLabel
                                        placeholder="Add new title"
                                        defaultValue={title}
                                        multiline
                                        rows={2}
                                        color = "secondary"
                                        fullWidth
                                        onChange={(e) => handleTitle(e)}
                                        variant="filled"
                                        InputProps={{disableUnderline: true}}
                                    />
                                    <h5 className="ResearchText_subHeader">
                                        Research Description
                                    </h5>
                                    <TextField
                                        required
                                        id="outlined-textarea"
                                        hiddenLabel
                                        variant="filled"
                                        defaultValue={description}
                                        placeholder="Add description"
                                        multiline
                                        rows={6}
                                        color = "secondary"
                                        fullWidth
                                        onChange={(e) => handleDescription(e)}
                                        InputProps={{disableUnderline: true}}
                                    />
                                </div>
                            }
                            {showActive === 2 && 
                                <div className = "resList_upload">
                                    <ResearchUpload
                                         CallbackColumns = {callbackColumns}
                                         CallbackDelimiter = {callbackDelimiter}
                                         CallbackNullCleaning = {setCallbackNullCleaning}
                                         CallbackNullReplace = {setCallbackNullReplace}
                                         CallbackOutlierCleaning = {setCallbackOutlierCleaning}
                                         CallbackOutlierReplace = {setCallbackOutlierReplace}
                                         CallbackSelectedCleanColumns = {setCallbackSelectedCleanColumns}
                                         SelectedColumns = {callbackSelectedCleanColumns}
                                         CallbackColumnOptions = {setCallbackColumnsCleanOptions}
                                         CleanOptions = {callbackColumnsCleanOptions}
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
                                        DataArray = {dataArray}
                                        DatasetDetails = {datasetDetails}
                                        SaveResearchHandler = {handleCreateResearch}
                                        Delimiter = {delimiter}
                                        ResearchRes = {researchSaveRes}
                                        Author = {processed?.user.username}
                                        NullCleaning = {callbackNullCleaning}
                                        NullReplace = {callbackNullReplace}
                                        OutlierCleaning = {callbackOutlierCleaning}
                                        OutlierReplace = {callbackOutlierReplace}
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
                        </div>
                    ): (
                        <Fade in={true} {...(true ? { timeout: 500 } : {})}>
                            <div className="ResearchList_List">
                            {
                                typeof researchesGetRes?.researches !== 'undefined' ? (
                                    researchesGetRes?.researches.map(res => {
                                        return <ResCard
                                            title = {res.research_name}
                                            description = {res.research_description}
                                            created_at = {res.created_at}
                                            _id = {res._id}
                                            HandleSelected = {handleSelected}
                                            editable={props.editable}
                                        />
                                    })
                                ) :  <CircularProgress color="secondary" thickness={2.5} size={30}/>
                            }
                            </div>
                        </Fade>
                    )
                    }
               


            </div>
            
            
          
    ); 
}