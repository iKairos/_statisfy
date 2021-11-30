import { DisplayTable } from "../DisplayTable";
import { useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import "../../StyleSheets/datapagefolder/datapage.css";

export default function DataSetPage(props){

    const [tabNumber, setTab] = useState(1);

    const switchPage = (page)=>{
        setTab(page);
    }
    
    return(
        <div className="datapage">
            <div className="datapage_container">
                <div className="datapage_navigator">
                    <div className={tabNumber === 1 ? "datapage_navigator_active" : "datapage_navigator_inactive"} onClick= {()=> switchPage(1)}>
                        Upload
                    </div>
                    <div className={tabNumber === 2 ? "datapage_navigator_active" : "datapage_navigator_inactive"} onClick= {()=> switchPage(2)}>
                        Details
                    </div>
                    <div className={tabNumber === 3 ? "datapage_navigator_active" : "datapage_navigator_inactive"} onClick= {()=> switchPage(3)}>
                        Columns
                    </div>
                    <div className={tabNumber === 4 ? "datapage_navigator_active" : "datapage_navigator_inactive"} onClick= {()=> switchPage(4)}>
                        Cleaning
                    </div>
                </div>
                {tabNumber === 1 &&
                    <div className="datapage_content">
                        {props.Error && <Alert variant='danger'>{props.Error}</Alert>} 
                        <input type="file" name="file" accept=".csv" onChange={(e) => props.ChangeHandler(e)} />
                        <DisplayTable data={props.DataArray}/>
                    </div>
                }
                {tabNumber === 2 &&
                    <div className="datapage_content">
                    { props.DatasetDetails ?
                        (
                            <div className="data_cells_left">
                                <span className="data_span">File Name</span>
                                {<p className="data_span">{props.FileDetails?.name}</p>}
                                <span className="data_span">File Size</span>
                                {<p className="data_span">{props.FileDetails?.size / 1000} kB</p>}
                                <span className="data_span">Size</span>
                                {<p className="data_span">{props.DatasetDetails?.size} datapoints</p>}
                                <span className="data_span">Columns</span>
                                {<p className="data_span">{props.DatasetDetails?.columns} columns</p>}
                                <span className="data_span">Rows</span>
                                {<p className="data_span">{props.DatasetDetails?.rows} rows</p>}
                            </div>
                        ) : <Spinner animation="border" variant="primary" />
                    }
                    </div>
                }
                {tabNumber === 3 &&
                    <div className="datapage_content">
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
                                    props.DatasetDetails?.details?.map((i) => (
                                        <>
                                            <tr>
                                                    <td><input type="checkbox" className="checkbox_child"/></td>
                                                    <td><p>{i['column']}</p></td>
                                                    <td><p>{i['null_count']} | {((i['null_count'] / props.DatasetDetails.rows)*100).toFixed(2)}% missing</p></td>
                                                    <td><p>{typeof i['mean'] === 'number' ? i['mean'].toFixed(2) : i['mean']}</p></td>
                                                    <td><p>{typeof i['std'] === 'number' ? i['std'].toFixed(2) : i['std']}</p></td>
                                                    <td><p>{typeof i['median'] === 'number' ? i['median'].toFixed(2) : i['std']}</p></td>
                                                </tr>
                                            
                                        </>
                                    )) : <Spinner animation="border" variant="primary" />
                                }
                            </tbody>
                        </table>
                    </div>
                }
                {tabNumber===4 &&
                    <div className="datapage_content">
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
                            props.DatasetDetails?.details?.map((i) => (
                            <>
                                <tr>
                                    <td><p>{i['column']}</p></td>
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
        </div>
       
     ); 
 }