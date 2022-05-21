import * as React from 'react';
import { useRef, useState } from "react";
import { Alert, AlertTitle, Collapse, Tooltip, CircularProgress, Fade, Slide, Snackbar, Divider } from '@mui/material';
import { instDataPage, tooltipDataCleaning, tooltipDataset, tooltipDelimiter } from "../../constants/stringConstants";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloseIcon from '@mui/icons-material/Close';
import { formatBytes } from '../../utils';
import { DisplayTable } from "../DisplayTable";
import { Typography, TextField, Button, Backdrop, IconButton} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import _ from "lodash";


import CleaningOptions from './CleaningOptions';


import { DataColumns } from '../researchPages/dataColumns';

import  "../../StyleSheets/NewCSSFiles/UserProfileFolder/ResearchList.css";
import { makeStyles } from "@mui/styles";

const buttonStyles = makeStyles ({
    field:{
      backgroundColor: "black",
      borderRadius: '0.25rem'
    },
    btn:{
      borderRadius: '1.5rem',
      width:'15rem',
      height:'2.5rem',
      color:'white',
      fontWeight:'500',
      backgroundColor: '#7051b8'
    },
    icon:{
        color:'#7051b8',
        borderColor:'#7051b8'
    }
})





export default function ResearchUpload(props) {

    const ButtonClasses = buttonStyles();

    const [header, setHeader] = useState(true);
    const containerRef = useRef(null);
    const [show, setShow] = useState(true);
    const [openCleaning, setOpenCleaning] = useState(false);
    const handleOpenCleaning = () => {
        setOpenCleaning(true);
    };
    const handleCloseCleaning = () => {
        setOpenCleaning(false);
    };
    const handleCloseSnackbar = () => {
        setShow(false);
    }
    
    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
    );

  return (
    <div className="ResearchList_Page3">
        <div className="ResearchList_Page3_header">
                <DownloadForOfflineOutlinedIcon fontSize="large" className={ButtonClasses.icon}/>
                <h5 className='ResearchText_title'>
                    Dataset 
                </h5>

                <h6 className='ResearchText_content'>
                    Upload your data and save it in the cloud to conduct some analysis! ✅
                </h6>
        </div>

        
        
        <div className="ResearchList_Page2_instruction">
            <Alert variant="outlined" severity="info" className={ButtonClasses.icon}>
                <AlertTitle><p className='ResearchText_instruction_title'>Instructions:</p></AlertTitle>
                {
                    instDataPage.map((i) => (
                        <>
                        <p className='ResearchText_instruction_title'>
                            {i[0]}. {i[1]}
                        </p>
                        <br/>
                        </>
                    ))
                }
            </Alert>
        </div>

        <div className="ResearchList_Page2_Section">
            <div className = "ResearchList_Page2_delimeter">
                <h6 className="ResearchText_delimeter">
                    Set delimeter
                    <Tooltip
                        title={tooltipDelimiter}
                        placement="bottom"
                        arrow
                        color='secondary'
                        >
                        <HelpOutlineIcon fontSize='medium' className={ButtonClasses.icon} sx={{fontSize:"large"}}/>
                    </Tooltip>
                </h6>
                <TextField
                    placeholder="Delimeter"
                    defaultValue=","
                    onChange={(e) => props.CallbackDelimiter(e.target.value)}
                    InputProps={{
                        disableUnderline: true
                    }}
                    variant="filled"
                    sx={{display:"flex", textAlign:"center"}}
                    size="small"
                />
            </div>
            <div className = "ResearchList_Page2_upload">
                <h6 className="ResearchText_delimeter">
                    Upload a dataset 
                    <Tooltip
                        title={tooltipDataset}
                        placement="right"
                        arrow
                    >
                        <HelpOutlineIcon  fontSize='medium' className={ButtonClasses.icon} sx={{fontSize:"large"}}/>
                    </Tooltip>
                </h6>
                    
                <label className="ResearchList_Page2_upload_button">
                    <input className="ResearchList_Page2_upload_input" type="file" name="file" accept=".csv" 
                    onChange={(e) => props.ChangeHandler(e)} 
                    />
                    <FileUploadIcon className={ButtonClasses.icon}/>
                    
                </label> 
            </div>
            
            
        </div>
        <div className="ResearchList_Page2_details">
            <h6 className="ResearchText_delimeter">
                File Name : {props.FileDetails ? props.FileDetails?.name : ""}
            </h6>
            <h6 className="ResearchText_delimeter">
                File Size : {props.FileDetails ? formatBytes(props.FileDetails?.size): ""}
            </h6>
            <h6 className="ResearchText_delimeter">
                Columns : {typeof props.DatasetDetails?.columns !== 'undefined' ? `${props.DatasetDetails?.columns} columns`: ""}
            </h6>
            <h6 className="ResearchText_delimeter">
                Rows : {typeof props.DatasetDetails?.rows !== 'undefined' ? `${props.DatasetDetails?.rows} rows`: ""}
            </h6>
            <h6 className="ResearchText_delimeter">
                Datapoints : {typeof props.DatasetDetails?.size !== 'undefined' ? `${props.DatasetDetails?.size} datapoints`: ""}
            </h6>
        </div>

        {props.DatasetDetails?.error ? null : 
            
            <div className = "ResearchList_Page2_table">
                <div className = "ResearchList_Page2_table_dummy">
                    
                    <DisplayTable 
                        data={props.DataArray}
                        Header = {header}
                        rowNumber = {10}
                    />
                </div>
            </div>
        }
       
        
        {
            <Snackbar
                open={typeof props.DatasetDetails?.error !== 'undefined' || typeof props.Error !== 'undefined'} 
                onClose={typeof props.DatasetDetails?.error !== 'undefined' || typeof props.Error !== 'undefined'}
            >
                <Alert severity="error" variant="filled">
                    {props.DatasetDetails?.error ? props.DatasetDetails?.error : props.Error ? props.Error.message : null}
                </Alert>
            </Snackbar>
        }
        
        
        
       
    </div>
  );
}
