import "../StyleSheets/studyfolder/study.css"
import { Button, CircularProgress } from "@mui/material";
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

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);


export default function Study(props){
    const [studyPage, setStudyPage] = useState(1);
    const [colData, setColData] = useState();

    const dispatch = useDispatch()
    
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
            label: 'Datapoints',
            data: datasetFile.data.map(row => {
                var filter = _.pick(row, props.data[7]);
                return {x: filter[props.data[7][0]], y: filter[props.data[7][1]]}
            }),
            backgroundColor: 'rgba(255, 99, 132, 1)',
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
           
            <div className = "Study_tabs">
                <button
                    className="resData_arrow"
                    onClick={prevStudy}
                    disabled = {studyPage === 1 ? true : false}
                >
                    <ArrowBackIosNewIcon/>
                </button>
                <Box sx = {{ 
                    minWidth: 100,
                    width: '1fr'
                    }}>
                    <Tabs
                        value={studyPage}
                        onChange={switchStudyPage}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="scrollable tabs"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab value={1} label="Details" icon={<HelpIcon/>}/>
                        <Tab value={2} label="Graphs" icon={<AutoGraphIcon/>}/>
                        <Tab value={3} label="Results" icon={<CheckCircleIcon/>}/>
                        <Tab value={4} label="Interpretation" icon={<ArticleIcon/>}/>
                    </Tabs>
                </Box>
                <button
                    className="resData_arrow"
                    onClick={nextStudy}
                    disabled = {studyPage === 4 ? true : false}
                >
                    <ArrowForwardIosIcon/>
                </button>

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
                        <Scatter data={pearsonDataChart} options={options}/>
                    </div>
                }
                {studyPage === 3 &&
                    <div className = "Study_content_results">
                        Results
                    </div>
                }
                {studyPage === 4 &&
                    <div className = "Study_content_interpretation">
                        Interpretation
                    </div>
                }
            </div>
            
        </div>
    ); 
}