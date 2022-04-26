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
import { Line } from 'react-chartjs-2';
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

import { getStudyDataset} from "../../../actions/datasetActions";
import StudyDetails from "../studyDetails";
import LinearConfiguration from "./LinearConfiguration";
import LinearModel from "./LinearModel";

//ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, Title);

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

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Cost History',
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
                text: props.data['columns'][1]
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
                text: props.data['columns'][0]
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
        dispatch(getStudyDataset(props.data['study_dataset']));
    }, []);
  return(
        <div className ="Study">
            <div className = "Study_header">
                <h4>{props.data['study_name']} | {props.data['test_type']}</h4>
                <h6>{props.data['study_description']}</h6>
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
                                return _.pick(row, props.data['columns']);
                            })}
                            studyData = {studyDatasetFile?.data}
                            details = {props.details}
                            changes = {props.data['changes']}
                        />
                    </div>
                }
                {studyPage === 2 &&
                    <div className = "Study_content_computation">
                        <LinearConfiguration configs={props.data['configurations']}/>
                    </div>
                }
                {studyPage === 3 &&
                    <div className = "Study_content_graphs">
                        <div className = "Study_cards_container">       
                            {
                                props.data['variables'].map(([var_name, var_val]) => 
                                    <ResultCards
                                        value = {var_val.toFixed(4)}
                                        variable = {var_name}
                                    />
                                )
                            }
                        </div>
                        <Line data={{
                                labels: props.data['graphing']['cost_history'].map(data => data['x']),
                                datasets: [
                                    {
                                        label: 'Cost History',
                                        data: props.data['graphing']['cost_history'].map(data => data['y'].toExponential()),
                                        borderColor: 'rgba(167, 66, 197, 1)',
                                        lineTension: 0,
                                        pointRadius: 0
                                    },
                                ],
                        }} options={{
                            scales: {
                                y: {
                                ticks: {
                                    callback: (val) => (val.toExponential())
                                }
                              }
                            }
                          }}/> 

                        <Line data={{
                                labels: props.data['graphing']['gradient_history'].map(data => data['x'].toFixed(2)),
                                datasets: [
                                    {
                                        label: 'Gradient History',
                                        data: props.data['graphing']['gradient_history'].map(data => data['y']),
                                        borderColor: 'rgba(167, 66, 197, 1)',
                                        lineTension: 0,
                                        pointRadius: 0
                                    },
                                ],
                        }}/> 
                    </div>
                }
                {studyPage === 4 &&
                    <div className = "Study_content_graphs">
                        <LinearModel/>
                    </div>
                }
            </div>
            
        </div>

  );  
}