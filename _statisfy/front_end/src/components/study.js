import "../StyleSheets/studyfolder/study.css"
import { Button } from "@mui/material";
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
   // const attributes = props.attribute
    return(
        <div className ="Study">
            <div className = "Study_header">
                <h4>Study Title</h4>
                <h6>Statistical Method</h6>
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
                        <h6>Variables</h6>
                    </div>
                }
                {studyPage === 2 &&
                    <div className = "Study_content_graphs">
                        Graphs
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