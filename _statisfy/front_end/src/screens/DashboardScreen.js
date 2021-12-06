import TitlePage from "../components/dashboardPages/titlepage";
import ToolPage from "../components/dashboardPages/toolPage";
import DataSetPage from "../components/dashboardPages/datasetPage";
import StatPage from "../components/dashboardPages/statPage";
import SummaryPage from "../components/dashboardPages/summaryPage";
import Navigator from "../components/navigator";
import "../StyleSheets/dashboard.css";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { processUserToken } from "../actions/userActions";
import { processDataset } from "../actions/datasetActions";
import { saveResearch } from "../actions/researchAction";
import { Fade, Skeleton, Stepper, Step, StepLabel, Grow, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ScienceIcon from '@mui/icons-material/Science';
import InsightsIcon from '@mui/icons-material/Insights';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SummarizeIcon from '@mui/icons-material/Summarize';
import clsx from 'clsx';
import { status500, stepsString } from "../constants/stringConstants";
import Stack from '@mui/material/Stack';

export default function DashboardScreen(props){
    // ======= FUNCTION-WIDE VARIABLES ======= //
    
    // Research details variables
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState();
    const [columns, setColumns] = useState([]);
    const [tool, setTool] = useState();
    const [delimiter, setDelimiter] = useState(',');

    // Utils variables
    const [_error, setError] = useState({});
    const [tags, setTags] = useState([]);
    const [methodChosen, setMethodChosen] = useState();
    const [showActive, setShowActive] = useState(1);
    const [display, setDisplay] = useState(false);

    // File handling variables
    const [dataArray, setDataArray] = useState();

    // ======= TOKEN HANDLING ======= //
    const dispatch = useDispatch();
    const dataSelector = useSelector((state) => 
        state.decodedUserToken
    );
    const { error, processed } = dataSelector;

    if(props.token && processed?.code === "TOKEN_FAIL"){
        localStorage.removeItem('token');
    }

    // ======= RESEARCH_SAVE ======= //
    const researchSaveSelector = useSelector((state) => 
        state.researchSave
    );
    const {researchSaveRes} = researchSaveSelector;

    // ======= HANDLERS ======= //
    const setToolChosen = (choice) =>{
        setTool(choice);
    }

    const displayMethodChosen = (choice) =>{
        setMethodChosen(choice);
    }

    const nextScreen = () => {
        if(title?.length == 0 || description?.length == 0 || typeof title === 'undefined' || typeof description === 'undefined'){
            setError({
                'titlePage': "Please fill in all the details to continue."
            });
            return;
        }

        if(title.length > 200 || description.length > 250){
            return;
        }

        if(typeof tool === 'undefined' && showActive === 2){
            setError({
                'toolPage': 'Please select a tool before proceeding.'
            })
            return;
        }

        if(typeof file === 'undefined' && showActive === 3){
            setError({
                'datasetPage': {
                    'code': 'DATASET_IS_NULL',
                    'message': 'Please upload a file before proceeding.'
                }
            });
            return;
        }
        
        if(typeof methodChosen === 'undefined' && showActive === 4){
            setError({
                'statPage': 'Please select a statistical tool before proceeding.'
            });
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
            setError({
                'titlePage': 'Title should not exceed 200 characters.'
            });
            return;
        }else{
            setError({
                'titlePage': undefined
            });
        }
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);

        if(description.length > 250){
            setError({
                'titlePage': 'Description should not exceed 200 characters.'
            });
            return;
        }else{
            setError({
                'titlePage': undefined
            });
        }
    }

    const handleCreateResearch = () => {
        dispatch(saveResearch({
            'research_name': title,
            'research_description': description,
            'dataset': 'temp[TO BE FIXED]',
            'test_type': methodChosen,
            'columns': columns,
            'delimiter': delimiter,
            'author': processed?.user._id
        }));
    }

    // ======= CALLBACKS ======= //
    const callbackCheckbox = (checked) => {
        setTags(checked);
    }

    const callbackColumns = (columns) => {
        setColumns(columns);
    }

    const callbackDelimiter = (delimiter) => {
        setDelimiter(delimiter);
    }

    // ======= FILE UPLOAD MECHANISM ======= //
    const fileDetailsSelector = useSelector((state) => 
        state.datasetDetails
    );
    const {loading, datasetDetails} = fileDetailsSelector;

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

            dispatch(processDataset(formData,delimiter));

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

    const useStyles = makeStyles(() => ({
        root: {
            backgroundColor: '#b5b5b5',
            color: '#23272a',
            padding: 8,
            borderRadius: '50%'
        },
        active: {
            backgroundColor: '#23272A',
            color: '#DF9AFF',
        },
        completed: {
            backgroundColor: '#b5b5b5',
            color: '#A742C5',
        },
      }));
    
      const CustomStepIcon = (props) => {
        const classes = useStyles();
        const { active, completed } = props;
    
        const stepIcons = {
          1: <ScienceIcon />,
          2: <InsightsIcon />,
          3: <FileUploadIcon />,
          4: <AnalyticsIcon />,
          5: <SummarizeIcon />,
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

    // ======= DISPATCH ON RENDER ======= //
    useEffect(() => {
        dispatch(processUserToken(props.token));
    }, [])

    if(processed?.code === 'TOKEN_SUCCESS'){
        return(
            <div className = "overall_div">
                <Fade in={true} {...(true ? { timeout: 1200 } : {})}>
                    <div className="stepper_cont">
                        <Stepper activeStep={showActive-1} alternativeLabel>
                            {stepsString.map((label) => (
                                <Step key={label}>
                                    <StepLabel StepIconComponent={CustomStepIcon}>
                                        <div className="stepper_div">{label}</div>
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </div>
                </Fade>
                
                
                {
                    showActive === 1 &&
                    <Fade in={showActive === 1}>
                        <div className = "component_div">
                            <TitlePage
                                Title = {title}
                                HandleTitle = {handleTitle}
                                Error = {_error.titlePage}
                                Description = {description}
                                HandleDescription = {handleDescription}
                            />
                            
                        </div>
                    </Fade>
                }
                {
                    showActive === 2 && 
                    <Fade in={showActive === 2}>
                        <div className = "component_div">
                            <ToolPage
                                Error = {_error.toolPage}
                                SetToolChosen = {setToolChosen}
                            />
                        </div>
                    </Fade>
                }
                { showActive === 3 &&
                    <Fade in={showActive === 3}>
                         <div className = "component_div">
                            <DataSetPage
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
                    </Fade>
                }
                { showActive === 4 &&
                    <Fade in={showActive === 4}>
                         <div className = "component_div">
                            <StatPage
                                CallbackCheckbox = {callbackCheckbox}
                                MethodChosen = {methodChosen}
                                Tags = {tags}
                                DisplayMethodChosen = {displayMethodChosen}
                                Error = {_error.statPage}
                            />
                        </div>
                    </Fade>
                }
                {
                    showActive === 5 && 
                    <Fade in={showActive === 5}>
                         <div className = "component_div">
                            <SummaryPage

                                Title = {title}
                                Description = {description}
                                Tool = {tool}
                                Columns={columns}
                                MethodChosen = {methodChosen}
                                FileDetails = { file ? {
                                    'name': file.name,
                                    'size': file.size
                                } : undefined}
                                DatasetDetails = {datasetDetails}
                                SaveResearchHandler = {handleCreateResearch}
                                Delimiter = {delimiter}
                                Author = {processed?.user.username}

                            />
                        </div>
                    </Fade>
                }
                
                <Navigator
                    NextScreen={nextScreen}
                    PrevScreen={prevScreen}
                    ActiveStep = {showActive -1}
                    prevDisabled={true}
                />
            </div>
        );
    }else if(processed?.code === 'TOKEN_FAIL'){
        return(
            <Redirect to={{pathname: "/signIn", message: "You need to log in to access this page. Please log in first or create an account using the Sign Up page."}}></Redirect>
        )
    }else if(typeof processed === "string"){
        return(
            <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                <Alert variant="outlined" severity="error">{status500}</Alert>
            </Grow>
        )
    }else{
        return(
            <Stack spacing={1}>
                <Skeleton variant="text" width={200} height={40} animation="wave"/>
                <Skeleton variant="text" width={300} height={40} animation="wave"/>
                <Skeleton variant="text" width={400} height={40} animation="wave"/>
                <Skeleton variant="text" width={500} height={40} animation="wave"/>
                <Skeleton variant="rectangular" width={500} height={350} animation="wave" />
            </Stack>
        );
    }
}