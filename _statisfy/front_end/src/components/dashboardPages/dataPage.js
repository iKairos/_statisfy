import { DisplayTable } from "../DisplayTable";
import { useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import "../../StyleSheets/column/columntable.css";

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
                     
                    <div className="data_tabs_header">
                        <div className = {uploadTab === "left" ? "data_tabs" : "data_tabs_inactive"} onClick= {()=> switchUploadPage("left")}>
                            Upload
                        </div>
                        <div className = {uploadTab === "right" ? "data_tabs" : "data_tabs_inactive"} onClick= {()=> switchUploadPage("right")}>
                            Clean Data
                        </div>
                    </div>
                    
                        {uploadTab === "left"?
                            <div className="data_content">
                                {props.Error && <Alert variant='danger'>{props.Error}</Alert>} 
                                <input type="file" name="file" accept=".csv" onChange={(e) => props.ChangeHandler(e)} />
                                
                            </div> 
                            :
                            <div className="data_content_right">
                                <table className="column_table">
                                    <thead>
                                        <tr>
                                            <th className="column_table_header">Columns</th>
                                            <th className="column_table_header">Replacement Method</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.DatasetDetails ? 
                                            props.DatasetDetails?.null_count?.map((i) => (
                                            
                                                <>
                                                    <tr>
                                                        <td><p>{i[0]}</p></td>
                                                        <td>
                                                            <div className = "dropdown">
                                                                <button className="dropdown_hover">Data Replacement</button>
                                                                <div className="dropdown_menu">
                                                                    <p className="dropdown_menu_items">set to 0</p>
                                                                    <p className="dropdown_menu_items">set to mean</p>
                                                                    <p className="dropdown_menu_items">Stratified Average</p>
                                                                    <p className="dropdown_menu_items"> Regression Replacement</p>
                                                                </div>
                                                                
                                                            </div>


                                                        </td>
                                                    </tr>
                                                    
                                                </>
                                            )) : <Spinner animation="border" variant="primary" />
                                        }
                                    </tbody>
                                </table>
                            </div>
                        }
                        
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
                    
                        {displayTab === "left" ?
                            <div className="data_cells">
                                { props.DatasetDetails ?
                                    (
                                        <div className="data_cells_left">
                                            <span className="data_span">Size</span>
                                            {<p className="data_span">{props.DatasetDetails?.size} datapoints</p>}
                                            <span className="data_span">Columns</span>
                                            {<p className="data_span">{props.DatasetDetails?.columns} columns</p>}
                                            <span className="data_span">Rows</span>
                                            {<p className="data_span">{props.DatasetDetails?.rows} rows</p>}
                                            <span className="data_span">Mean</span>
                                            <p className="data_span">1</p>
                                        </div>
                                    ) : <Spinner animation="border" variant="primary" />
                                }
                            </div> :
                            displayTab === "right" ? 
                            <div className="data_cells_right">
                                <table className="column_table">
                                    <thead>
                                        <tr>
                                            <th className="column_table_header">Selected</th>
                                            <th className="column_table_header">Column</th>
                                            <th className="column_table_header">Missing Data</th>
                                            <th className="column_table_header">Mean</th>
                                            <th className="column_table_header">St.Dev</th>
                                            <th className="column_table_header">Median</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.DatasetDetails ? 
                                            props.DatasetDetails?.null_count?.map((i) => (
                                                <>
                                                    <tr>
                                                        <td><input type="checkbox" className="checkbox_child"/></td>
                                                        <td><p>{i[0]}</p></td>
                                                        <td><p>{i[1]}</p></td>
                                                        <td><p>{i[1]}</p></td>
                                                        <td><p>{i[1]}</p></td>
                                                        <td><p>{i[1]}</p></td>
                                                    </tr>
                                                    
                                                </>
                                            )) : <Spinner animation="border" variant="primary" />
                                        }
                                    </tbody>
                                </table>
                            </div>: null
                        }
                        
                   
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