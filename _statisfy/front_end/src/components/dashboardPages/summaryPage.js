
import "../../StyleSheets/summaryfolder/summarypage.css";

export default function SummaryPage(props){

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
                        <span className="summary_body_res_span">Tool:</span>
                        <p >{props.Tool} Tool</p>
                        <span className="summary_body_res_span">Method:</span>
                        <p >{props.MethodChosen}</p>
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
                                return (
                                <div className = "summary_body_columns_cont">
                                    <p className = "summary_body_file_content">{i}</p>
                                </div>)
                            })}
                        </div>
                    
                    
                    </div>
                    <div className="summary_button_cont">
                        <button className="summary_button" onClick={props.SaveResearchHandler}>Create Research</button>
                    </div>
                    
                </div>
                
           </div>
       </div>
     ); 
 }