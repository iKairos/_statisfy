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
import BarCor from "../../newDashBoard/bar";
import CorrelationDegree from "../../CorrelationDegree";
import ResultCards from "../../newDashBoard/ResultCards";



ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, Title);






export default function CorrelationStudy(props){
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
                text: `${props.data['columns'][0]} vs. ${props.data['columns'][1]} Graph`,
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
                            <Tab value={2} label="Computation" icon={<CalculateIcon fontSize="medium"/>} />
                            <Tab value={3} label="Results" icon={<AutoGraphIcon fontSize="medium"/>} />
                            <Tab value={4} label="Interpretation" icon={<ArticleIcon fontSize="medium"/>} />
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
                        <Computation method={props.data['test_type']} variables={props.data['variables']}/>
                    </div>
                }
                {studyPage === 3 &&
                        <div className = "Study_content_graphs">
                            {
                                props.data['variables'].map(([var_name, var_val]) => {
                                return(
                                    <>
                                    {var_name === "R Coefficient"
                                        ?(<BarCor value = {var_val}/>)
                                        :null
                                    }
                                    </>
                                ) 
                                })
                            }
                        <div className = "Study_cards_container">       
                            {
                                props.data['variables'].map(([var_name, var_val]) => {
                                    if(blackListedVariables.includes(var_name)){
                                        return null;
                                    }
                                    
                                    return (
                                        <ResultCards
                                            value = {var_val.toFixed(4)}
                                            variable = {var_name}
                                        />
                                    )
                                })
                            }
                        </div>
                        <Scatter data={{
                            label: props.data['columns'],
                            datasets: [
                            {
                                label: `(${props.data['columns'][0]},${props.data['columns'][1]})`,
                                data: studyDatasetFile?.data.map(row => {
                                    return {x: row[props.data['columns'][0]], y: row[props.data['columns'][1]]}
                                }),
                                backgroundColor: 'rgba(167, 66, 197, 1)',
                            },
                            ],
                        }} options={options}/> 
                    </div>
                }
                {studyPage === 4 &&
                    <div className = "Study_content_interpretation">
                        {
                            props.data['variables'].map(([var_name, var_val]) => {
                               return(
                                   <>
                                   {var_name === "R Coefficient"
                                    ?(
                                    <CorrelationDegree value = {var_val}/>)
                                    :null
                                   }
                                   </>
                               ) 
                            })
                        }
                        <div className = "Study_content_text">
                            <Typography>INTERPRETATION</Typography>
                            {
                                props.data['interpretations'].map(i => {
                                    return <p>{i}</p>
                                })
                            }
                            
                            <Button color="secondary"><DownloadIcon/>Generate PDF</Button>
                        </div>
                    </div>
                }
            </div>
            
        </div>

  );  
}