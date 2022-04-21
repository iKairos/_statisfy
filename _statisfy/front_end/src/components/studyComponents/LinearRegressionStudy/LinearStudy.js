import { Button, CircularProgress, Typography } from "@mui/material";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import HelpIcon from '@mui/icons-material/Help';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ArticleIcon from '@mui/icons-material/Article';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DownloadIcon from '@mui/icons-material/Download';
import CalculateIcon from '@mui/icons-material/Calculate';
import ResultCards from "../../newDashBoard/ResultCards";
import { useState } from "react";
import { Scatter } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Title,
  } from 'chart.js';
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash"


import QueryStatsIcon from '@mui/icons-material/QueryStats';

import Computation from "../Computation";
import { getStudyDataset} from "../../../actions/datasetActions";
import StudyDetails from "../studyDetails";
import LinearConfiguration from "./LinearConfiguration";
import BarCor from "../../newDashBoard/bar";
import CorrelationDegree from "../../CorrelationDegree";



ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, Title);






export default function LinearStudy(props){
    const [studyPage, setStudyPage] = useState(1);
    const blackListedVariables = ['SSxy', 'SSx', 'SSy', 'Numerator', 'Denominator']

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
    console.log(studyDatasetFile)
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `${props.data[7][0]} vs. ${props.data[7][1]} Graph`,
                fullSize: true,
                font: {
                    size: 18
                }
            },
            legend: {
                position: 'bottom'
            }
        },
        scales: {
          y: {
            title:{
                display: true,
                text: props.data[7][1]
            },
            ticks: {
                display: false,
            },
            grid: {
                display: false,
            }
          },
          x: {
            title:{
                display: true,
                text: props.data[7][0]
            },
            ticks: {
                display: false
            },
            grid: {
                display: false,

            }
          }
        },
      };

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getStudyDataset(`${props.data[0]}_${props.data[11]}`));
    }, []);
  return(
        <div className ="Study">
            <div className = "Study_header">
                <h4>{props.data[1]} | {props.data[5]}</h4>
                <h6>{props.data[2]}</h6>
            </div>
            <div className="Study_tabs_container">
                <div className = "Study_tabs">
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
                            <Tab value={1} label="Preprocessing" icon={<QueryStatsIcon fontSize="medium"/>}> </Tab>
                            <Tab value={2} label="Configurations" icon={<CalculateIcon fontSize="medium"/>} />
                            <Tab value={3} label="Performance" icon={<AutoGraphIcon fontSize="medium"/>} />
                            <Tab value={4} label="Model" icon={<ArticleIcon fontSize="medium"/>} />
                        </Tabs>
                    </Box>
                </div>
            </div>
                
            <div className = "Study_content">
                {studyPage === 1 &&
                    <div className = "Study_content_details">
                        <StudyDetails
                            data = {datasetFile?.data.map(row => {
                                return _.pick(row, props.data[7]);
                            })}
                            studyData = {studyDatasetFile?.data}
                            details = {props.details}
                            changes = {props.data[10]}
                        />
                    </div>
                }
                {studyPage === 2 &&
                    <div className = "Study_content_computation">
                        <LinearConfiguration configs={props.data[12]}/>
                    </div>
                }
                {studyPage === 3 &&
                    <div className = "Study_content_graphs">
                        <div className = "Study_cards_container">       
                            {
                                props.data[8].map(([var_name, var_val]) => 
                                    <ResultCards
                                        value = {var_val.toFixed(4)}
                                        variable = {var_name}
                                    />
                                )
                            }
                        </div>
                    </div>
                }
                {studyPage === 4 &&
                    <div className = "Study_content_interpretation">
                        
                    </div>
                }
            </div>
            
        </div>

  );  
}