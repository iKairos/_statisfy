import "../../StyleSheets/resdatafolder/resdata.css"


import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { Typography } from "@mui/material";
import { CircularProgress } from '@mui/material';

import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import TimelineIcon from '@mui/icons-material/Timeline';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DetailsIcon from '@mui/icons-material/Details';
import DescriptionIcon from '@mui/icons-material/Description';


import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import ViewColumnOutlinedIcon from '@mui/icons-material/ViewColumnOutlined';
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from "react";

import { DisplayTable, MemoizedTable } from "../../components/DisplayTable";
import { DataColumns } from "./dataColumns";
import { formatBytes } from '../../utils';
import { useDispatch, useSelector } from "react-redux";
import { processDataset } from "../../actions/datasetActions";

import ColumnGraphs, { MemoizedColumnGraphs } from "./columnGraphs";

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
                        <Typography variant="button" className = "resData_dataset_heading">
                            Dataset Description
                        </Typography>
                        <div className = "resData_dataset_desc">
                            <Typography variant="h6"> Context</Typography>
                            <p className = " text_content">
                                This Dataset ChuChu
                            </p>
                            <Typography variant="h6"> Content</Typography>
                            <p className = " text_content">
                                This Dataset ChuChu
                            </p>
                            <Typography variant="h6"> Acknowledgements</Typography>
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
                            <MemoizedTable 
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
                <div className = "resData_container">
                    {
                        typeof datasetDetails !== "undefined" ? (
                            datasetDetails.details.map( data => {
                                return <MemoizedColumnGraphs size={datasetDetails.rows} data={data}/>
                            })
                        ) : <CircularProgress color="info" thickness={2.5} size={30}/>
                    }
                </div>
            }
            {contentPage === 4 &&
                <div className = "resData_dataset">
                    <Typography variant="button" className = "resData_dataset_heading">
                        Dataset Details
                    </Typography>
                    <div className = "resData_details">
                        <Typography  variant="button" ><InsertDriveFileOutlinedIcon/>File Name</Typography>
                        <Typography variant="subtitle2" >{props.DataSetFile ? `${props.DataSetFile?.filename.slice(9,)}` : <CircularProgress color="info" thickness={2.5} size={30}/>}</Typography>

                        <Typography variant="button" ><UploadFileOutlinedIcon />File Size</Typography>
                        <Typography variant="subtitle2" >{props.DataSetFile && formatBytes(props.DataSetFile?.filesize)}</Typography>

                        <Typography variant="button" ><ViewColumnOutlinedIcon />Columns</Typography>
                        <Typography variant="subtitle2" >{typeof datasetDetails?.columns !== 'undefined' ? `${datasetDetails?.columns} columns`: ""}</Typography>

                        <Typography variant="button" ><TableRowsOutlinedIcon />Rows</Typography>
                        <Typography variant="subtitle2">{typeof datasetDetails?.rows !== 'undefined' ? `${datasetDetails?.rows} rows`: ""}</Typography>
                    </div>
                </div>
            }
            </div>
        </div>
    );
}