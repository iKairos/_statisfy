import { Button, CircularProgress, Typography } from "@mui/material";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import HelpIcon from '@mui/icons-material/Help';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ArticleIcon from '@mui/icons-material/Article';
import DownloadIcon from '@mui/icons-material/Download';
import CalculateIcon from '@mui/icons-material/Calculate';
import { useState } from "react";
import { Scatter } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash"


import QueryStatsIcon from '@mui/icons-material/QueryStats';

import Computation from "./Computation";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import StudyDetails from "./studyDetails";
import ResultCards from "../newDashBoard/ResultCards";
import { getStudyDataset } from "../../actions/datasetActions";

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


export default function GenericStudy(props){
    const ButtonClasses = ButtonStyles();    
    const [studyPage, setStudyPage] = useState(1);

    const switchStudyPage = (event, newValue) => {
        setStudyPage(newValue);
    };

    const nextStudy = function(){
        setStudyPage(studyPage+1);
    };
    const prevStudy = function(){
        setStudyPage(studyPage-1);
    };

    const filedataSelector = useSelector((state) =>
        state.datasetFile
    );

    const {datasetFile} = filedataSelector; 

    const studyDataSelector = useSelector((state) =>
        state.studyDatasetFile
    );

    const {studyDatasetFile} = studyDataSelector; 

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getStudyDataset(props.data['study_dataset']));
    }, []);
  return(
        <div className ="Study">
            <div className = "Study_header">
                <h4 className = {ButtonClasses.inputText}>{props.data['study_name']} | {props.data['test_type']}</h4>
                <h6 className = {ButtonClasses.inputText}>{props.data['study_description']}</h6>
            </div>
            <div className="Study_tabs_container">
                <div className = "Study_tabs">
                    <ThemeProvider theme = {theme}>
                        <Box sx = {{ 
                            minWidth: 100,
                            width: '1fr',
                        }}>
                            <Tabs
                                value={studyPage}
                                onChange={switchStudyPage}
                                textColor="secondary"
                                indicatorColor="secondary"
                                aria-label="scrollable tabs"
                                variant="scrollable"
                                scrollButtons="auto"
                                sx = {{ 
                                }}
                            >
                                <Tab className={ButtonClasses.inputText} value={1} label="Preprocessing" icon={<QueryStatsIcon fontSize="medium"/>}> </Tab>
                                <Tab className={ButtonClasses.inputText} value={3} label="Results" icon={<AutoGraphIcon fontSize="medium"/>} />
                            </Tabs>
                        </Box>
                    </ThemeProvider>
                    
                </div>
            </div>
                
            <div className = "Study_content">
                {studyPage === 1 &&
                    <div className = "Study_content_details">
                        <StudyDetails
                            data = {datasetFile?.data.map(row => {
                                return _.pick(row, props.data['columns']);
                            })}
                            studyData = {studyDatasetFile?.data}
                            details = {props.details}
                            changes = {props.data['changes']}
                        />
                    </div>
                }
                {studyPage === 3 &&
                    <div className = "Study_content_graphs">
                        <div className = "Study_cards_container">       
                            {
                                props.data['variables'].map(([var_name, var_val]) => {
                                    return (
                                        <ResultCards
                                            value = {var_val.toFixed(4)}
                                            variable = {var_name}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>
            
        </div>

  );  
}