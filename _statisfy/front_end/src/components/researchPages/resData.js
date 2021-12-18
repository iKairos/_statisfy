import "../../StyleSheets/resdatafolder/resdata.css"


import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';

import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import TimelineIcon from '@mui/icons-material/Timeline';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DetailsIcon from '@mui/icons-material/Details';
import DescriptionIcon from '@mui/icons-material/Description';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from "react";

import { DisplayTable } from "../../components/DisplayTable";
import { DataColumns } from "./dataColumns";
import { formatBytes } from '../../utils';
import { useDispatch, useSelector } from "react-redux";
import { processDataset } from "../../actions/datasetActions";



//<span className ="text_topic">{researchGetRes?.data.test_type}</span>

export default function ResData(props){
    
    const [contentPage, setContentPage] = useState(1);

    const dispatch = useDispatch();

    const nextContent = function(){
        setContentPage(contentPage+1);
    };
    const prevContent = function(){
        setContentPage(contentPage-1);
    };
    const switchContentPage = (event, newValue) => {
        setContentPage(newValue);
    };

    const fileDetailsSelector = useSelector((state) => 
        state.datasetDetails
    );
    const {datasetDetails} = fileDetailsSelector;

    return(
        <div className="resData_body_container">
            <div className="resData_body_heading">
                <span className ="text_topic">Dataset</span>
                <p className ="text_label">{props.DataSetFile ? `${props.DataSetFile?.filename.slice(9,)} (${formatBytes(props.DataSetFile?.filesize)})` : <CircularProgress color="info" thickness={2.5} size={30}/>} </p>
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
                        <Tab value={1} label="Description" icon={<DescriptionIcon/>}/>
                        <Tab value={2} label="Data" icon={<TimelineIcon/>} />
                        <Tab value={3} label="Columns" icon={<ViewColumnIcon/>} />
                        <Tab value={4} label="Details" icon={<DetailsIcon/>} />
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
                        {props.DataSetFile ? `${props.DataSetFile?.filename.slice(9,)} (${formatBytes(props.DataSetFile?.filesize)})` : <CircularProgress color="info" thickness={2.5} size={30}/>}
                        </div>
                        {typeof props.DataSetFile !== 'undefined' ? 
                            <DisplayTable 
                                data={props.DataSetFile.data} 
                                Header={true} 
                                rowNumber={15}
                                checked={false}
                            /> : <CircularProgress color="info" thickness={2.5} size={30}/>
                        }
                    </div>
                </div>
            }
            {contentPage === 3 &&
                <div className = "resData_dataset">
                    <div className = "resData_dataset_table">
                        <div className = "resData_dataset_table_heading">
                            Column Data
                        </div>
                        {typeof datasetDetails !== 'undefined' ? 
                            <DisplayTable 
                                data={datasetDetails.details} 
                                Header={true} 
                                rowNumber={15}
                                checked={false}
                            /> : <CircularProgress color="info" thickness={2.5} size={30}/>
                        }
                    </div>
                </div>
            }
            </div>
            
        </div>
    );
}