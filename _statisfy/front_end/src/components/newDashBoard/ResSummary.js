import { Backdrop, Button, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router";
import { researchSuccess, researchSuccessTitle } from "../../constants/stringConstants";
import  "../../StyleSheets/NewCSSFiles/UserProfileFolder/ResearchList.css";
import { Divider } from "@mui/material";

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
    }
})

export default function ResSummary(props){
    const ButtonClasses = buttonStyles();
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
       <div className="ResearchList_Page3">
           <div className="ResearchList_Page3_header">
                <CheckCircleOutlineOutlinedIcon fontSize="large" className={ButtonClasses.icon} />
                <h5  className='ResearchText_title'>
                    Summary
                </h5>

                <h6  className='ResearchText_content'>
                    Make sure to check everything before saving your dataset! 😉
                </h6>
           </div>
           
           <div className = "ResearchList_Page3_body">
                <h6 className="ResearchText_instruction_title">
                    <TitleIcon fontSize="small" className={ButtonClasses.icon}/> Title
                </h6>
                <h6 className="ResearchText_instruction">
                    {props.Title}
                </h6>

                <h6 className="ResearchText_instruction_title">
                    <DescriptionIcon fontSize="small" className={ButtonClasses.icon}/> Description
                </h6>
                <h6 className="ResearchText_instruction">
                    {props.Description}
                </h6>

                <h6 className="ResearchText_instruction_title">
                    <AccountBoxIcon fontSize="small" className={ButtonClasses.icon}/>Author
                </h6>
                <h6 className="ResearchText_instruction">
                    {props.Author}
                </h6>

                <h6 className="ResearchText_instruction_title">
                    <FiberManualRecordOutlinedIcon fontSize="small" className={ButtonClasses.icon}/>Delimiter
                </h6>
                <h6 className="ResearchText_instruction">
                    {props.Delimiter}
                </h6>
            
                
            </div>
            <Divider/>
            <div className = "ResearchList_Page3_body">
            <h6 className="ResearchText_instruction_title">
                    <InsertDriveFileOutlinedIcon fontSize="small" className={ButtonClasses.icon}/>File Name
                </h6>
                <h6 className="ResearchText_instruction">
                    {props.FileDetails ? props.FileDetails?.name : ""}
                </h6>

                <h6 className="ResearchText_instruction_title">
                    <UploadFileOutlinedIcon fontSize="small" className={ButtonClasses.icon}/>File Size
                </h6>
                <h6 className="ResearchText_instruction">
                    {typeof props.DatasetDetails?.size !== 'undefined' ? `${props.DatasetDetails?.size} datapoints`: ""}
                </h6>

                <h6 className="ResearchText_instruction_title">
                    <ViewColumnOutlinedIcon fontSize="small" className={ButtonClasses.icon}/>Columns
                </h6>
                <h6 className="ResearchText_instruction">
                    {typeof props.DatasetDetails?.columns !== 'undefined' ? `${props.DatasetDetails?.columns} columns`: ""}
                </h6>

                <h6 className="ResearchText_instruction_title">
                    <TableRowsOutlinedIcon fontSize="small" className={ButtonClasses.icon}/>Rows
                </h6>
                <h6 className="ResearchText_instruction">
                    {typeof props.DatasetDetails?.rows !== 'undefined' ? `${props.DatasetDetails?.rows} rows`: ""}
                </h6>
            </div>


            

           <div className="resSummary_header">
            <Button 
                className={ButtonClasses.btn}
                onClick={saveResearch}
                sx={{width:"15rem"}}
                variant="filled"
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