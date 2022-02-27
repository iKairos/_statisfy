import { Backdrop, Button, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router";
import { researchSuccess, researchSuccessTitle } from "../../constants/stringConstants";
import "../../StyleSheets/ressummaryfolder/ressummary.css";

import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';

import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import ViewColumnOutlinedIcon from '@mui/icons-material/ViewColumnOutlined';
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

import { DisplayTable } from "../DisplayTable";

export default function ResSummary(props){
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    const saveResearch = () => {
        handleToggle();
        props.SaveResearchHandler();
    }
    
    if(props.ResearchRes?.code === "RESEARCH_SAVE_SUCCESS"){
        history.push({
            pathname: `/dashboard/${props.ResearchRes?.uuid}`,
            state: {
                message: {
                    'title': researchSuccessTitle,
                    'body': researchSuccess
                },
                openSnackbar: true
            }
        });
        history.go(0);
        return;
    }
    return(
       <div className="resSummary">
           <div className="resSummary_header">
                <CheckCircleOutlineOutlinedIcon fontSize="large" color="secondary"/>
                <Typography variant="h5">
                    Summary
                </Typography>

                <Typography variant="subtitle2" className="resSummary_data">
                    Make sure to check everything before saving your dataset! 😉
                </Typography>
           </div>
           
           <div className = "resSummary_body">
               <Typography variant="button" className="resSummary_category"><TitleIcon fontSize="small" color="secondary"/> Title</Typography>
               <Typography variant="subtitle2" className="resSummary_data">{props.Title}</Typography>

                <div className="resSummary_desc">
                <Typography variant="button" className="resSummary_category"><DescriptionIcon fontSize="small" color="secondary"/> Description</Typography>
                </div>
               
               <Typography variant="subtitle2" className="resSummary_data">{props.Description}</Typography>

               <Typography variant="button" className="resSummary_category"><AccountBoxIcon fontSize="small" color="secondary"/>Author</Typography>
               <Typography variant="subtitle2" className="resSummary_data">{props.Author}</Typography>

               <Typography variant="button" className="resSummary_category"><FiberManualRecordOutlinedIcon fontSize="small" color="secondary"/>Delimiter</Typography>
               <Typography variant="subtitle2" className="resSummary_data">{props.Delimiter}</Typography>

            </div>

            <div className = "resSummary_body">
                <Typography variant="button" className="resSummary_category"><FiberManualRecordOutlinedIcon fontSize="small" color="secondary"/>Missing Data Handling</Typography>
                <Typography variant="subtitle2" className="resSummary_data">
                    {
                        props.NullCleaning === "replace" ?
                        `Replace with ${props.NullReplace}`
                        : props.NullCleaning
                    }
                </Typography>

                <Typography variant="button" className="resSummary_category"><FiberManualRecordOutlinedIcon fontSize="small" color="secondary"/>Outlier Handling</Typography>
                <Typography variant="subtitle2" className="resSummary_data">
                    {
                        props.OutlierCleaning === "replace" ? 
                        `Replace with ${props.OutlierReplace}`
                        : props.OutlierCleaning
                    }
                </Typography>
            </div>

            <div className = "resSummary_body">
               
               <Typography  variant="button" className="resSummary_category"><InsertDriveFileOutlinedIcon color="secondary"/>File Name</Typography>
               <Typography variant="subtitle2" className="resSummary_data">{props.FileDetails ? props.FileDetails?.name : ""}</Typography>

               <Typography variant="button" className="resSummary_category"><UploadFileOutlinedIcon color="secondary"/>File Size</Typography>
               <Typography variant="subtitle2" className="resSummary_data">{typeof props.DatasetDetails?.size !== 'undefined' ? `${props.DatasetDetails?.size} datapoints`: ""}</Typography>

               <Typography variant="button" className="resSummary_category"><ViewColumnOutlinedIcon color="secondary"/>Columns</Typography>
               <Typography variant="subtitle2" className="resSummary_data">{typeof props.DatasetDetails?.columns !== 'undefined' ? `${props.DatasetDetails?.columns} columns`: ""}</Typography>

               <Typography variant="button" className="resSummary_category"><TableRowsOutlinedIcon color="secondary"/>Rows</Typography>
               <Typography variant="subtitle2" className="resSummary_data">{typeof props.DatasetDetails?.rows !== 'undefined' ? `${props.DatasetDetails?.rows} rows`: ""}</Typography>
           
           </div>

           <div className="resSummary_header">
            <Button 
                className="resSummary_button"
                onClick={saveResearch}
                color = "secondary"
                sx={{width:"15rem"}}
                variant="outlined"
            >Create Research
            </Button>
            </div>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <div>
                    <h3>We are uploading the dataset. Please wait for a while...</h3> <br/>
                    <CircularProgress color="inherit" />
                </div>
            </Backdrop>           
       </div>
     ); 
 }