import * as React from 'react';
import { useRef, useState } from "react";
import { Alert, AlertTitle, Collapse, Tooltip, CircularProgress, Fade, Slide } from '@mui/material';
import { instDataPage, tooltipDataCleaning, tooltipDataset, tooltipDelimiter } from "../../constants/stringConstants";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TableChartIcon from '@mui/icons-material/TableChart';
import { formatBytes } from '../../utils';
import { DisplayTable } from "../DisplayTable";
import { Typography, TextField, Button} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


import "../../StyleSheets/resuploadfolder/resupload.css";


export default function ResearchUpload(props) {
    const [header, setHeader] = useState(true);
    const containerRef = useRef(null);
    const [show, setShow] = useState(true);
    
    const [nullCleaning, setCleaning] = useState('nothing');
    const handleCleaning = (event) => {
        setCleaning(event.target.value);
    };

    const [outlierCleaning, setOutlier] = useState('nothing');
    const handleOutlier = (event) => {
        setOutlier(event.target.value);
    };

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
            <div className="resUpload_delimeter">
                <Typography>Set delimeter for your dataset</Typography>
                <TextField
                    placeholder="Delimeter"
                    defaultValue=","
                    onChange={(e) => props.CallbackDelimiter(e.target.value)}
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            <Tooltip
                                title={tooltipDelimiter}
                                placement="bottom"
                                arrow
                                color='secondary'
                                >
                                <HelpOutlineIcon fontSize='medium' color='secondary'/>
                            </Tooltip>
                        </InputAdornment>
                    ),
                    }}
                    variant="standard"
                    sx={{display:"flex", justifyContent:"center"}}
                />
            </div>
        </div>

        
        <div className="resUpload_upload_cont">
            <div className="resUpload_outerCont">
                <div className="resUpload_innerCont">
                    <div className="resUpload_upload_title">
                        <Typography>Upload a dataset</Typography>
                        <Tooltip
                            title={tooltipDataset}
                            placement="right"
                            arrow
                        >
                            <HelpOutlineIcon  fontSize='medium' color='secondary'/>
                        </Tooltip>
                    </div>
                    
                    <label className="resUpload_upload">
                        <input className="resUpload_upload_input" type="file" name="file" accept=".csv" 
                        onChange={(e) => props.ChangeHandler(e)} 
                        />
                        <FileUploadIcon color = "secondary"/>
                        
                    </label> 
                </div>
                <div className="resUpload_detailsCont">
                    <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                        <Typography variant='button'>File Name : </Typography>
                        <Typography variant='body2'>{props.FileDetails ? props.FileDetails?.name : ""} </Typography>
                    </div>

                    <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                        <Typography variant='button'>File Size : </Typography>
                        <Typography variant='body2'>{props.FileDetails ? formatBytes(props.FileDetails?.size): ""} </Typography>
                    </div>

                    <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                        <Typography variant='button'>Columns : </Typography>
                        <Typography variant='body2'>{typeof props.DatasetDetails?.columns !== 'undefined' ? `${props.DatasetDetails?.columns} columns`: ""} </Typography>
                    </div>

                    <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                        <Typography variant='button'>Initial Rows : </Typography>
                        <Typography variant='body2'>{typeof props.DatasetDetails?.rows !== 'undefined' ? `${props.DatasetDetails?.rows} rows`: ""} </Typography>
                    </div>

                    

                    <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                        <Typography variant='button'>Initial Datapoints : </Typography>
                        <Typography variant='body2'>{typeof props.DatasetDetails?.size !== 'undefined' ? `${props.DatasetDetails?.size} datapoints`: ""}</Typography>
                    </div>
                    
                </div>
            </div>
            
        </div>
        {
            props.DatasetDetails?.error || props.Error ? (
            <div className = "resUpload_upload_cont">
                <Button variant="contained" color="error" sx={{marginBottom:"0.5rem"}} onClick={() => setShow(!show)}>
                    Error {show ? <KeyboardArrowDownIcon sx={{paddingLeft:"0.5rem", fontSize:"2rem"}}/> : <ErrorOutlineIcon sx={{paddingLeft:"0.5rem", fontSize:"2rem"}}/>}
                </Button>
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
            
            <div className = "resUpload_upload_dispTable">
                <div className = "resUpload_upload_dummy">
                    
                    <DisplayTable 
                        data={props.DataArray}
                        Header = {header}
                        rowNumber = {10}
                    />
                </div>
            </div>
        }
        
        {props.DatasetDetails?.error|| props.Error ? null : 
         <div className="resUpload_upload_cont">
            <div className="resUpload_cleaning_title">
                <Typography>Clean your dataset</Typography>
                <Tooltip
                    title={tooltipDataCleaning}
                    placement="right"
                    arrow
                    color='secondary'
                    >
                    <HelpOutlineIcon fontSize='medium' color='secondary'/>
                </Tooltip>
            </div>
            
            <div className="resUpload_cleaning">
                <FormControl component="fieldset">
                    <FormLabel component="legend" color="secondary">Null Values</FormLabel>
                    <RadioGroup
                        aria-label="gender"
                        name="controlled-radio-buttons-group"
                        value={nullCleaning}
                        onChange={handleCleaning}
                        color="secondary"
                    >
                        <FormControlLabel value="delete" control={<Radio />} label="Delete Rows" color="secondary" />
                        <FormControlLabel value="replace" control={<Radio />} label="Replace Value"  color="secondary"/>
                        <FormControlLabel value="nothing" control={<Radio />} label="Do Nothing" color="secondary"/>
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset">
                    <FormLabel component="legend" color="secondary">Outliers</FormLabel>
                    <RadioGroup
                        aria-label="gender"
                        name="controlled-radio-buttons-group"
                        value={outlierCleaning}
                        onChange={handleOutlier}
                        color="secondary"
                    >
                        <FormControlLabel value="delete" control={<Radio />} label="Delete Rows" color="secondary" />
                        <FormControlLabel value="nothing" control={<Radio />} label="Do Nothing" color="secondary"/>
                    </RadioGroup>
                </FormControl>
            </div>
            <Button 
                color="secondary" 
                variant="outlined" 
                sx={{marginTop:"1rem"}}
                
            >Clean Data</Button>
        </div>
        }
    </div>
  );
}
