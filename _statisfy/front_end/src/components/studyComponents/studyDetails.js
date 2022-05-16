

import "../../StyleSheets/StudyDetailsFolder/studyDetails.css";
import { MemoizedTable } from "../DisplayTable";
import { Button, CircularProgress, Skeleton} from "@mui/material";
import { Bar, Doughnut } from "react-chartjs-2";
import { Typography } from "@mui/material";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataObjectIcon from '@mui/icons-material/DataObject';
import * as React from 'react';
import { useState } from "react";
import ButtonGroup from '@mui/material/ButtonGroup';
import { Tabs, Tab, Box, Divider} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";


import {CategoryScale , 
    Chart as ChartJS,
    LinearScale,
    BarElement,
    Title,
    Tooltip as tp,
    Legend,
    DoughnutController,
    ArcElement
} from 'chart.js'; 
import { useSelector } from "react-redux";
import { MemoizedColumnGraphs } from "../researchPages/columnGraphs";
import VariableGraph from "../researchPages/variableGraph";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    DoughnutController,
    Title,
    tp,
    Legend,
    ArcElement
);


const theme = createTheme({
    palette: {
      primary: {
        main: '#7051b8',
      },
      secondary: {
        main: '#7051b8',
      },
    },
  });

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
    tabs:{
        textColor:'white'
    },
    icons:{
        color: '#7051b8'
    },
    textField:{
        color: '#7051b8',
    },
    alert:{
        backgroundColor:'white',
        border:'1px solid #7051b8',
        fontFamily:'Poppins'
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
    inputText:{
        fontFamily:'Poppins',
    }
  })

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid #b5b5b5`,
    '&:before': {
      display: 'none',
    },
    marginBottom: `0.5rem`,
    borderRadius: `0.5rem`,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? '#eeeeee'
        : '#eeeeee',
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ExpandMoreIcon sx={{ fontSize: '0.9rem', color:"white"}} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? '#eeeeee'
        : '#eeeeee',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(180deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
    borderRadius: `0.5rem`
}));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor:
      theme.palette.mode === 'dark'
        ? '#ffffff'
        : '#ffffff',
    borderTop: `1px solid #b5b5b5`,
    borderBottomLeftRadius: `0.5rem`,
    borderBottomRightRadius: `0.5rem`
}));

export default function StudyDetails(props){
    const ButtonClasses = ButtonStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [variable, setVariable] = useState(props.changes[0].column);
    const [variable1, setVariable1] = useState(props.changes[0].column);

    const handleVariable = (varName) => {
        setVariable(varName);
    }

    const fileDetailsSelector = useSelector((state) => 
        state.datasetDetails
    );
    const {datasetDetails} = fileDetailsSelector;

  return(
    <div className="StudyDetails">
        <Typography variant="h6" className={ButtonClasses.inputText}><DataObjectIcon/> Data Preprocessing Results</Typography>
        
        <div className="StudyDetails_section">
            <ThemeProvider theme={theme}>
                <Box sx={{ width:"100%", bgcolor: 'background.paper' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        textColor="secondary"
                        indicatorColor="secondary"
                        className = {ButtonClasses.inputText}
                        
                    >
                        <Tab label="Dataset" />
                        <Tab label="Variables" />
                        <Tab label="Changes" />
                    </Tabs>
                </Box>
            </ThemeProvider>
            
            {value === 0 &&
                <div className = "StudyDetails_Dataset">
                    <div className="Study_details_row">
                        <Typography variant="h6" className = {ButtonClasses.inputText}>Initial Data</Typography>
                        <Typography variant="h6" className = {ButtonClasses.inputText}>Processed Data</Typography>
                        {typeof props.data !== 'undefined' ? 
                            <MemoizedTable
                                data= {props.data}
                                Header={true} 
                                rowNumber={5}
                                checked={false}
                            /> : 
                            <div>
                                <Skeleton variant="text" height={50} animation="wave"/>
                                <Skeleton variant="text" height={50} animation="wave"/>
                                <Skeleton variant="text" height={50} animation="wave"/>
                                <Skeleton variant="text" height={50} animation="wave"/>
                                <Skeleton variant="text" height={50} animation="wave"/>
                                <Skeleton variant="text" height={50} animation="wave"/>
                                <Skeleton variant="text" height={50} animation="wave"/>
                                <Skeleton variant="text" height={50} animation="wave"/>
                            </div>
                        }

                        {typeof props.studyData !== 'undefined' ? 
                            <MemoizedTable
                                data= {props.studyData}
                                Header={true} 
                                rowNumber={5}
                                checked={false}
                            /> : 
                            <div>
                                <Skeleton variant="text" height={50} animation="wave"/>
                                <Skeleton variant="text" height={50} animation="wave"/>
                                <Skeleton variant="text" height={50} animation="wave"/>
                                <Skeleton variant="text" height={50} animation="wave"/>
                                <Skeleton variant="text" height={50} animation="wave"/>
                                <Skeleton variant="text" height={50} animation="wave"/>
                                <Skeleton variant="text" height={50} animation="wave"/>
                                <Skeleton variant="text" height={50} animation="wave"/>
                            </div>
                        }
                    </div>
                    <Typography className = {ButtonClasses.inputText}>Number of Rows: {props.details.rows} <DoubleArrowIcon/> {props.studyData?.length}</Typography>
                    <Typography className = {ButtonClasses.inputText}>Data Distribution: Not normal <DoubleArrowIcon/> __placeholder__ </Typography>
                </div>
            }
            {value === 1 &&
                <div className = "StudyDetails_Variables">
                    <div className="StudyDetails_Variables_Selection">
                    <ThemeProvider theme={theme}>
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical contained button group"
                        variant="text"
                        color="secondary"
                        disableElevation
                        className = {ButtonClasses.inputText}
                    >
                        {props.changes.map(change => {
                            return(
                                <Button className = {ButtonClasses.inputText} onClick={()=> setVariable1(change.column)}>{change.column}</Button>
                        )})}
                    </ButtonGroup>

                    </ThemeProvider>
                    
                    
                    </div>  
                    <Divider orientation="vertical" flexItem  style={{height:'100%'}}/>
                    <div className="StudyDetails_Variables_Container">
                        {
                        typeof props.details !== "undefined" ? (
                            props.details.details.filter(data => data.column == variable1).map( data => {
                                return <MemoizedColumnGraphs size={props.details.rows} data={data}/>
                            })
                        ) : <CircularProgress color="info" thickness={2.5} size={30}/>
                        }
                    </div>
                </div>
            
            }

            {value === 2 &&
                <div className = "StudyDetails_Variables">
                    <div className="StudyDetails_Variables_Selection">
                        <ThemeProvider theme={theme}>
                            <ButtonGroup
                                orientation="vertical"
                                aria-label="vertical contained button group"
                                variant="text"
                                color="secondary"
                                disableElevation
                                className = {ButtonClasses.inputText}
                            >
                                {props.changes.map((change, index) => {
                                    return(
                                        <Button  className = {ButtonClasses.inputText} onClick={()=> setVariable(change.column)}>{change.column}</Button>
                                )})}
                            </ButtonGroup>

                        </ThemeProvider>
                        
                    </div>  
                    <Divider orientation="vertical" flexItem  style={{height:'100%'}}/>
                    <div className="StudyDetails_Variables_Container">

                        <Typography  className = {ButtonClasses.inputText} variant="overline" >{variable}</Typography>

                        <div className="Study_details_row">
                            <Typography  className = {ButtonClasses.inputText} variant="h6">Initial Data Distribution</Typography>
                            <Typography  className = {ButtonClasses.inputText} variant="h6">Processed Data Distribution</Typography>
                            <div className="Study_details_graph">
                                    {
                                        typeof props.details !== "undefined" ? (
                                            props.details.details.filter(data => data.column == variable).map( data => {
                                                return <VariableGraph data={data}/>
                                            })
                                        ) : <CircularProgress color="secondary" thickness={2.5} size={30}/>
                                    }
                            </div>

                            <div className="Study_details_graph">
                                <p>graph here</p>
                            </div>

                        </div>

                        <div className="Study_details_changes_grid">
                            <div className = "Study_details_changes_category">
                                <Typography className = {ButtonClasses.inputText}>Null Values Deleted: </Typography>
                                <Typography className = {ButtonClasses.inputText}>Null Values Replaced :</Typography>
                                <Typography className = {ButtonClasses.inputText}>Outliers Deleted: </Typography>
                                <Typography className = {ButtonClasses.inputText}>Outliers Replaced: </Typography>
                                
                            </div>

                            <div className = "Study_details_changes_results">
                                <Typography className = {ButtonClasses.inputText}>{props.changes.filter(data => data.column == variable)[0].null_deleted} row(s)</Typography>
                                <Typography className = {ButtonClasses.inputText}>{props.changes.filter(data => data.column == variable)[0].null_replaced} row(s)</Typography>
                                <Typography className = {ButtonClasses.inputText}>{props.changes.filter(data => data.column == variable)[0].outlier_deleted} row(s)</Typography>
                                <Typography className = {ButtonClasses.inputText}>{props.changes.filter(data => data.column == variable)[0].outlier_replaced} row(s)</Typography>

                            </div>

                        </div>
                    </div>
                </div>
            
            }
        </div>
    </div>
  );  
}