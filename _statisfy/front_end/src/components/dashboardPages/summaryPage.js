import { Backdrop, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router";
import "../../StyleSheets/summaryfolder/summarypage.css";

export default function SummaryPage(props){
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
                message: "Research successfully created! You may now view and customize your research."
            }
        });
        history.go(0);
        return;
    }
    return(
       <div className="summary">
           <div className="summary_container">
                <div className="summary_header">
                    <h3>Summary</h3>
                    <p> Before proceeding, please check all details.</p>
                </div>
                <div className="summary_body">
                    <div className="summary_body_res">
                        <span className="summary_body_res_span">Title:</span>
                        <p >{props.Title}</p>
                        <span className="summary_body_res_span">Description:</span>
                        <p >{props.Description}</p>
                        <span className="summary_body_res_span">Author:</span>
                        <p >{props.Author}</p>
                        <span className="summary_body_res_span">Tool:</span>
                        <p >{props.Tool} Tool</p>
                        <span className="summary_body_res_span">Method:</span>
                        <p >{props.MethodChosen}</p>
                        <span className="summary_body_res_span">Delimiter:</span>
                        <p >"{props.Delimiter}"</p>
                    </div>
                    <div className = "summary_body_file">
                        <span className = "summary_body_file_content">File Name</span>
                        {<p className = "summary_body_file_content">{props.FileDetails ? props.FileDetails?.name : ""}</p>}
                        <span className = "summary_body_file_content">Size</span>
                        {<p className = "summary_body_file_content">{typeof props.DatasetDetails?.size !== 'undefined' ? `${props.DatasetDetails?.size} datapoints`: ""}</p>}
                        <span className = "summary_body_file_content">Columns</span>
                        {<p className = "summary_body_file_content">{typeof props.DatasetDetails?.columns !== 'undefined' ? `${props.DatasetDetails?.columns} columns`: ""}</p>}
                        <span className = "summary_body_file_content">Rows</span>
                        {<p className = "summary_body_file_content">{typeof props.DatasetDetails?.rows !== 'undefined' ? `${props.DatasetDetails?.rows} rows`: ""}</p>}
                        <span className = "summary_body_file_content">Columns Selected</span>
                        <div className = "summary_body_columns">
                            
                            {props.Columns.map(i => {
                                return (<p>{i} </p>
                                )
                            })}
                        </div>
                    
                    
                    </div>
                    <div className="summary_button_cont">
                        <button className="summary_button" onClick={saveResearch}>Create Research</button>
                    </div>
                    
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={open}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>
                
           </div>
       </div>
     ); 
 }