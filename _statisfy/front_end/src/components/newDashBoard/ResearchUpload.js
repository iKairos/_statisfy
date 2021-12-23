import * as React from 'react';
import { useRef, useState } from "react";
import { Alert, AlertTitle, Collapse, Tooltip, CircularProgress, Fade, Slide } from '@mui/material';
import { instDataPage, tooltipDataset, tooltipDelimiter } from "../../constants/stringConstants";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TableChartIcon from '@mui/icons-material/TableChart';
import { formatBytes } from '../../utils';
import { DisplayTable } from "../DisplayTable";
import { Button } from '@mui/material';


import "../../StyleSheets/resuploadfolder/resupload.css";


export default function ResearchUpload(props) {
    const [header, setHeader] = useState(true);
    const containerRef = useRef(null);
    const [show, setShow] = useState(true);
    

  return (
    <div className="resUpload_content">
        <div className="resUpload_upload_cont">
            <Alert variant="outlined" severity="info" color="secondary">
                <AlertTitle><strong>Instructions:</strong></AlertTitle>
                {
                    instDataPage.map((i) => (
                        <><b>{i[0]}.</b> {i[1]} <br/></>
                    ))
                }
            </Alert>
        </div>
        <div className="resUpload_upload_cont">
            <span>
                <b>Upload a dataset </b>
                <Tooltip
                    title={tooltipDataset}
                    placement="right"
                    arrow
                >
                    <HelpOutlineIcon fontSize='inherit' color='info'/>
                </Tooltip><br/>
                
                <label className="resUpload_upload">
                    <input className="resUpload_upload_input" type="file" name="file" accept=".csv" 
                    onChange={(e) => props.ChangeHandler(e)} 
                    />
                    Upload
                </label> 
            </span>
            <br/>
            <span>
                <b>Set Delimiter </b>
                <Tooltip
                    title={tooltipDelimiter}
                    placement="right"
                    arrow
                    color='secondary'
                >
                    <HelpOutlineIcon fontSize='inherit' color='info'/>
                </Tooltip>
            </span>
            <input className = "resUpload_drop_input" onChange={(e) => props.CallbackDelimiter(e.target.value)}></input>
            
            {props.Display? (
                !props.Loading ? (
                <div ref={containerRef} style={{overflow:"hidden"}}>
                    <Slide direction="down" in ={!props.Loading} container={containerRef.current} {...(!props.Loading ? { timeout: 1200 } : {})}>
                        <div className="datapage_details">
                                <>
                                    <span className="data_span">File Name</span>
                                    {<p className="data_span">{props.FileDetails ? props.FileDetails?.name : ""}</p>}
                                    <span className="data_span">File Size</span>
                                    {<p className="data_span">{props.FileDetails ? formatBytes(props.FileDetails?.size): ""}</p>}
                                    <span className="data_span">Size</span>
                                    <p className="data_span">{typeof props.DatasetDetails?.size !== 'undefined' ? `${props.DatasetDetails?.size} datapoints`: ""}</p>
                                    <span className="data_span">Columns</span>
                                    <p className="data_span">{typeof props.DatasetDetails?.columns !== 'undefined' ? `${props.DatasetDetails?.columns} columns`: ""}</p>
                                    <span className="data_span">Rows</span>
                                    <p className="data_span">{typeof props.DatasetDetails?.rows !== 'undefined' ? `${props.DatasetDetails?.rows} rows`: ""}</p>
                                </>
                        </div> 
                    </Slide>
                </div>
                ): <CircularProgress color="info" thickness={2.5} size={30}/>
            ):null}
        </div>

        {
            props.DatasetDetails?.error || props.Error ? (
            <div className = "resUpload_upload_cont">
                <button className="resUpload_error" onClick={() => setShow(!show)}>
                    Error {show ? <FaAngleDown/> : <FaAngleUp/>}
                </button>
                <Collapse in={show}>
                    <Alert variant="outlined" severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {
                            props.DatasetDetails?.error ? (
                                <>
                                    <b>Code:</b> {props.DatasetDetails?.code} <br/>
                                    <b>Message:</b> {props.DatasetDetails?.error}
                                </>
                            ) : props.Error ? (
                                <>
                                    <b>Code:</b> {props.Error.code} <br/>
                                    <b>Message:</b> {props.Error.message}
                                </>
                            ):null
                        }
                        <hr/>
                        Dataset errors should be resolved before uploading. Errors can occur when the dataset is not in the correct format as required by the system.
                    </Alert>
                </Collapse>
            </div>
            ) : null
        }

        {props.DatasetDetails?.error ? null : 
            <>
            <div className = "resUpload_upload_dispTable">
                <div className = "resUpload_upload_dummy">
                    
                    <DisplayTable 
                        data={props.DataArray}
                        Header = {header}
                        rowNumber = {10}
                    />
                </div>
            </div>
        


            </>
        }
    </div>
  );
}
