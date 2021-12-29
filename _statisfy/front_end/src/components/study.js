import "../StyleSheets/studyfolder/study.css"
import { Button, CircularProgress, Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import HelpIcon from '@mui/icons-material/Help';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ArticleIcon from '@mui/icons-material/Article';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState } from "react";
import { Scatter } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
  } from 'chart.js';
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash"
import { MemoizedTable } from "./DisplayTable";
import { height, maxHeight } from "@mui/system";
import ResultCards from "./newDashBoard/ResultCards";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);


export default function Study(props){
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

    const options = {
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      };

    const pearsonDataChart = {
        labels: props.data[7],
        datasets: [
          {
            label: `(${props.data[7][0]},${props.data[7][1]})`,
            data: datasetFile.data.map(row => {
                var filter = _.pick(row, props.data[7]);
                return {x: filter[props.data[7][0]], y: filter[props.data[7][1]]}
            }),
            backgroundColor: 'rgba(167, 66, 197, 1)',
          },
        ],
      };

   // const attributes = props.attribute
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
                        height: 50
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
                                maxHeight: 100,
                                height: 50,
                                alignItems: "center"
                            }}
                        >
                            <Tab value={1} label="Details" icon={<HelpIcon/>} iconPosition="start"/>
                            <Tab value={2} label="Results" icon={<AutoGraphIcon/>} iconPosition="start"/>
                            <Tab value={3} label="Interpretation" icon={<ArticleIcon/>} iconPosition="start"/>
                        </Tabs>
                    </Box>

                </div>
            </div>
                
            <div className = "Study_content">
                {studyPage === 1 &&
                    <div className = "Study_content_details">
                        
                        <h6>DataSet</h6>
                        {typeof datasetFile !== 'undefined' ? 
                            <MemoizedTable
                                data={datasetFile.data.map(row => {
                                    return _.pick(row, props.data[7]);
                                })} 
                                Header={true} 
                                rowNumber={15}
                                checked={false}
                            /> : <CircularProgress color="info" thickness={2.5} size={30}/>
                        }
                        <h6>Variables</h6>
                    </div>
                }
                {studyPage === 2 &&
                    <div className = "Study_content_graphs">
                        <div className = "Study_cards_container">
                        {
                            props.data[8].map(([var_name, var_val]) => {
                                return (
                                    <ResultCards
                                        value = {var_val}
                                        variable = {var_name}
                                    />
                                    
                                )
                            })
                        }
                        </div>
                        <Scatter data={pearsonDataChart} options={options}/>
                    </div>
                }
                {studyPage === 3 &&
                    <div className = "Study_content_interpretation">
                        Interpretation
                    </div>
                }
            </div>
            
        </div>
    ); 
}