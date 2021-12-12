import "../../StyleSheets/resdatafolder/resdata.css"


import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import TableChartIcon from '@mui/icons-material/TableChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CalculateIcon from '@mui/icons-material/Calculate';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from "react";
import { Alert, AlertTitle, Fade, Grow, Skeleton } from "@mui/material";

import { DisplayTable } from "../../components/DisplayTable";
import { DataColumns } from "./dataColumns";




//<span className ="text_topic">{researchGetRes?.data.test_type}</span>

export default function ResData(props){
    
    const [contentPage, setContentPage] = useState(1);

    const nextContent = function(){
        setContentPage(contentPage+1);
    };
    const prevContent = function(){
        setContentPage(contentPage-1);
    };
    const switchContentPage = (event, newValue) => {
        setContentPage(newValue);
    };

    return(
        <div className="resData_body_container">
            <div className="resData_body_heading">
                <p className ="text_label">dataset.csv (5.1kb) </p>
            </div>

            <div className="resData_body_tabs">
                <button
                    className="resData_arrow"
                    onClick={prevContent}
                    disabled = {contentPage === 1 ? true : false}
                >
                    <ArrowBackIosNewIcon/>
                </button>
                <Box sx = {{ 
                    minWidth: 100,
                    width: '1fr'
                    }}>
                    <Tabs
                        value={contentPage}
                        onChange={switchContentPage}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="scrollable tabs"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab value={1} label="Description" icon={<TableChartIcon/>}/>
                        <Tab value={2} label="Data" icon={<TimelineIcon/>} />
                        <Tab value={3} label="Columns" icon={<CalculateIcon/>} />
                        <Tab value={4} label="Details" icon={<DoneAllIcon/>} />
                    </Tabs>
                </Box>
                <button
                    className="resData_arrow"
                    onClick={nextContent}
                    disabled = {contentPage === 4 ? true : false}
                >
                    <ArrowForwardIosIcon/>
                </button>
            </div>
            <div className = "resData_body_content">
            {contentPage === 1 &&
                
                    <div className = "resData_dataset">
                        <div className = "resData_dataset_heading">
                            Description
                        </div>
                        <div className = "resData_dataset_desc">
                            <p className = "text_topic"> Context</p>
                            <p className = " text_content">
                                This Dataset ChuChu
                            </p>
                            <p className = "text_topic"> Content</p>
                            <p className = " text_content">
                                This Dataset ChuChu
                            </p>
                            <p className = "text_topic"> Acknowledgements</p>
                            <p className = " text_content">
                                This Dataset ChuChu
                            </p>
                        </div>
                    </div>
            }

            {contentPage === 2 &&
                <div className = "resData_dataset">
                    <div className = "resData_dataset_table">
                        <div className = "resData_dataset_table_heading">
                            dataset_name.csv (5.43 kB)
                        </div>
                        {typeof props.DataSetFile !== 'undefined' ? 
                            <DisplayTable 
                                data={props.DataSetFile.data} 
                                Header={true} 
                                rowNumber={15}
                                checked={false}
                            /> : null
                        }
                    </div>
                </div>
            }
            {contentPage === 3 &&
                <div className = "resData_dataset">
                    <div className = "resData_dataset_table">
                        <div className = "resData_dataset_table_heading">
                            Columns
                        </div>
                        {typeof props.DataSetFile !== 'undefined' ? 
                            <DataColumns
                                data={props.DataSetFile.data} 
                                Header={true} 
                                rowNumber={10}
                                checked={true}
                            /> : null
                        }
                    </div>
                </div>
            }
            </div>
            
        </div>
    );
}