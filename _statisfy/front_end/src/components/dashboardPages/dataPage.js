import { DisplayTable } from "../DisplayTable";
import { useState } from "react";
import { Alert, Spinner } from "react-bootstrap";

export default function DataPage(props){

    const [uploadTab, setTab] = useState("left");

    const switchUploadPage = (page)=>{
        setTab(page);
    }

    const [displayTab, setDisplayTab] = useState("left");

    const switchDisplayPage = (page)=>{
        setDisplayTab(page);
    }
    
    return(

        <div className = "data">
            <div className="data_container_display">
                <div className="data_container">
                    {props.Error && <Alert variant='danger'>{props.Error}</Alert>}  
                    <div className="data_tabs_header">
                        <div className = {uploadTab === "left" ? "data_tabs" : "data_tabs_inactive"} onClick= {()=> switchUploadPage("left")}>
                            Upload
                        </div>
                        <div className = {uploadTab === "right" ? "data_tabs" : "data_tabs_inactive"} onClick= {()=> switchUploadPage("right")}>
                            Clean Data
                        </div>
                    </div>
                    <div>
                        {uploadTab === "left"?
                            <div className="data_content">
                                <input type="file" name="file" accept=".csv" onChange={(e) => props.ChangeHandler(e)} />
                                
                            </div> :
                            <div className="data_content">
                            
                            <button className="upload_btn"> Clean</button>
                            </div>
                        }
                        
                    </div>
                </div>
                <div className="data_container">
                    <div className="data_tabs_header">
                        <div className = {displayTab === "left" ? "data_tabs" : "data_tabs_inactive"} onClick= {()=> switchDisplayPage("left")}>
                            Dataset
                        </div>
                        <div className = {displayTab === "right" ? "data_tabs" : "data_tabs_inactive"} onClick= {()=> switchDisplayPage("right")}>
                            Columns
                        </div>
                    </div>
                    <div>
                        {displayTab === "left" ?
                            <div className="data_cells">
                                { props.DatasetDetails ?
                                    (
                                        <>
                                            <span className="data_span">Size</span>
                                            {<p className="data_span">{props.DatasetDetails?.size} datapoints</p>}
                                            <span className="data_span">Columns</span>
                                            {<p className="data_span">{props.DatasetDetails?.columns} columns</p>}
                                            <span className="data_span">Rows</span>
                                            {<p className="data_span">{props.DatasetDetails?.rows} rows</p>}
                                            <span className="data_span">Mean</span>
                                            <p className="data_span">1</p>
                                        </>
                                    ) : <Spinner animation="border" variant="primary" />
                                }
                            </div> :
                            displayTab === "right" ? 
                            <div className="data_cells">
                                {
                                    props.DatasetDetails ? 
                                    props.DatasetDetails?.null_count?.map((i) => (
                                        <>
                                            <span className="data_span">{i[0]} missing data</span>
                                            <p className="data_span">{i[1]}</p>
                                        </>
                                    )) : <Spinner animation="border" variant="primary" />
                                }
                            </div>: null
                        }
                        
                    </div>
                </div>
            </div>

            <div className="data_container_table">
                <div className="data_header">
                    Data
                </div>
                <div className="data_table">
                    <DisplayTable data={props.DataArray}/>
                </div>

            </div>
            
        </div>
     ); 
 }