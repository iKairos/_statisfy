import "../StyleSheets/studyfolder/study.css"
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
import { MemoizedTable } from "./DisplayTable";
import { height, maxHeight } from "@mui/system";
import ResultCards from "./newDashBoard/ResultCards";
import CorrelationDegree from "./CorrelationDegree";
import BarCor from "./newDashBoard/bar";
import Computation from "./studyComponents/Computation"
import StudyDetails from "./studyComponents/studyDetails"

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, Title);


export default function Study(props){
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
            }
          },
          x: {
            title:{
                display: true,
                text: props.data[7][0]
            }
          }
        },
      };

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
                            <Tab value={1} label="Details" icon={<HelpIcon fontSize="small"/>}> </Tab>
                            <Tab value={2} label="Computation" icon={<CalculateIcon fontSize="small"/>} />
                            <Tab value={3} label="Results" icon={<AutoGraphIcon fontSize="small"/>} />
                            <Tab value={4} label="Interpretation" icon={<ArticleIcon fontSize="small"/>} />
                        </Tabs>
                    </Box>
                </div>
            </div>
                
            <div className = "Study_content">
                {studyPage === 1 &&
                    <div className = "Study_content_details">
                        <StudyDetails
                            data = {datasetFile.data.map(row => {
                                return _.pick(row, props.data[7]);
                            })}

                            details = {props.details}
                            changes = {props.data[10]}
                        />
                    </div>
                }
                {studyPage === 2 &&
                    <div className = "Study_content_computation">
                        <Computation method={props.data[5]} variables={props.data[8]}/>
                    </div>
                }
                {studyPage === 3 &&
                        <div className = "Study_content_graphs">
                            {
                                props.data[8].map(([var_name, var_val]) => {
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
                                props.data[8].map(([var_name, var_val]) => {
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
                            {
                                props.data[5] === "Pearson R Correlation Test" ? 
                                    <Scatter data={{
                                        label: props.data[7],
                                        datasets: [
                                        {
                                            label: `(${props.data[7][0]},${props.data[7][1]})`,
                                            data: datasetFile?.data.map(row => {
                                                var filter = _.pick(row, props.data[7]);
                                                return {x: filter[props.data[7][0]], y: filter[props.data[7][1]]}
                                            }),
                                            backgroundColor: 'rgba(167, 66, 197, 1)',
                                        },
                                        ],
                                    }} options={options}/> 
                                : null
                            }
                    </div>
                }
                {studyPage === 4 &&
                    <div className = "Study_content_interpretation">
                        {
                            props.data[8].map(([var_name, var_val]) => {
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
                                props.data[9].map(i => {
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