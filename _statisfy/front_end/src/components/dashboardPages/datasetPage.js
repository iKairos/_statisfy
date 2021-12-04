import { DisplayTable } from "../DisplayTable";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import "../../StyleSheets/datapagefolder/datapage.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Alert, AlertTitle, Collapse, IconButton, Tooltip, Skeleton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

export default function DataSetPage(props){

    const [tabNumber, setTab] = useState(1);
    const [show, setShow] = useState(true);
    const [checkedCols, setCheckedCols] = useState([]);
    const [display, setDisplay] = useState(false);
    const [isUploading, setUploading] = useState(true);

    const switchPage = (page)=>{
        setTab(page);
    }
    const displayContent = () =>{
        setUploading(false);
        setDisplay(true);
    }
    const uploadNew = () =>{
        setUploading(true);
        setDisplay(false);
    }
    
    const onCheck = (e) => {
        if(e.target.checked){
            setCheckedCols([...checkedCols, e.target.name]);
        }else{
            setCheckedCols(checkedCols.filter((i) => i !== e.target.name));
        }
        
    }

    return(
        <div className="datapage">
            <div className="datapage_container">
                <div className="datapage_navigator">
                    <div className={tabNumber === 1 ? "datapage_navigator_active" : "datapage_navigator_inactive"} onClick= {()=> switchPage(1)}>
                        Upload
                    </div>
                    <div className={tabNumber === 2 ? "datapage_navigator_active" : "datapage_navigator_inactive"} onClick= {()=> switchPage(2)}>
                        Columns
                    </div>
                    <div className={tabNumber === 3 ? "datapage_navigator_active" : "datapage_navigator_inactive"} onClick= {()=> switchPage(3)}>
                        Cleaning
                    </div>
                </div>
                {tabNumber === 1 &&
                    <div className="datapage_content">
                        <div className="data_upload_cont">
                            <Collapse in={show}>
                                <Alert variant="outlined" severity="error">
                                <AlertTitle>Error</AlertTitle>
                                <b>Code:</b> {props.DatasetDetails?.code} <br/>
                                <b>Message:</b> {props.DatasetDetails?.error}
                                <hr/>
                                Dataset errors should be resolved before uploading. Errors can occur when the dataset is not in the correct format as required by the system.
                                </Alert>
                            </Collapse>
                        </div>
                        <div className="datapage_upload_cont">
                            
                            <label className="datapage_upload">
                                <input className="datapage_upload_input" type="file" name="file" accept=".csv" 
                                onChange={(e) => props.ChangeHandler(e)} 
                                onClick={displayContent}/>
                                Upload
                            </label>
                            <span>
                                <b>Set Delimiter </b>
                                <Tooltip
                                    title="A delimiter determines the partitioning of every data per column in a dataset. 
                                    It is an indicator of separation between data points.
                                    The default delimiter for CSV files is a comma ','."
                                    placement="right"
                                    arrow
                                >
                                    <IconButton>
                                        <FontAwesomeIcon icon={faQuestionCircle} style={{color:"#6DB65B", fontSize: 17}}/>
                                    </IconButton>
                                </Tooltip>
                            </span>
                            <input className = "datapage_drop_input"></input>
                            {
                                props.DatasetDetails?.error &&
                                <>
                                    <button className="datapage_error" onClick={() => setShow(!show)}>
                                        Error {show ? <FaAngleDown/> : <FaAngleUp/>}
                                    </button>
                                    {
                                    props.DatasetDetails?.error && 
                                    <Collapse in={show}>
                                        <Alert variant="outlined" severity="error">
                                            <AlertTitle>Error</AlertTitle>
                                            <b>Code:</b> {props.DatasetDetails?.code} <br/>
                                            <b>Message:</b> {props.DatasetDetails?.error}
                                            <hr/>
                                            Dataset errors should be resolved before uploading. Errors can occur when the dataset is not in the correct format as required by the system.
                                        </Alert>
                                    </Collapse>
                                    }
                                </>
                            }
                            {display? (
                                <div className="datapage_details">
                                    <span className="data_span">File Name</span>
                                    {<p className="data_span">{props.FileDetails ? props.FileDetails?.name : ""}</p>}
                                    <span className="data_span">File Size</span>
                                    {<p className="data_span">{props.FileDetails ? `${props.FileDetails?.size / 1000} kB`: ""}</p>}
                                    <span className="data_span">Size</span>
                                    {!props.Loading ? <p className="data_span">{typeof props.DatasetDetails?.size !== 'undefined' ? `${props.DatasetDetails?.size} datapoints`: ""}</p> : <Skeleton variant="text" width={500} height={40}/>}
                                    <span className="data_span">Columns</span>
                                    {!props.Loading ? <p className="data_span">{typeof props.DatasetDetails?.columns !== 'undefined' ? `${props.DatasetDetails?.columns} columns`: ""}</p> : <Skeleton variant="text" width={500} height={40}/>}
                                    <span className="data_span">Rows</span>
                                    {!props.Loading ? <p className="data_span">{typeof props.DatasetDetails?.rows !== 'undefined' ? `${props.DatasetDetails?.rows} rows`: ""}</p> : <Skeleton variant="text" width={500} height={40}/>}
                                </div> 
                            ):null}
                            
                            
                        </div>

                        {props.DatasetDetails?.error ? null : <DisplayTable data={props.DataArray}/>}
                    </div>
                }
                
                {tabNumber === 2 &&
                    <div className="datapage_content">
                        <div className="datapage_upload_cont">
                            {
                                props.DatasetDetails?.error &&
                                <>
                                <button className="datapage_error" onClick={() => setShow(!show)}>
                                Error {show ? <FaAngleDown/> : <FaAngleUp/>} 
                                </button>
                                {
                                props.DatasetDetails?.error && 
                                <Collapse in={show}>
                                    <Alert variant="outlined" severity="error">
                                        <AlertTitle>Error</AlertTitle>
                                        <b>Code:</b> {props.DatasetDetails?.code} <br/>
                                        <b>Message:</b> {props.DatasetDetails?.error}
                                        <hr/>
                                        Dataset errors should be resolved before uploading. Errors can occur when the dataset is not in the correct format as required by the system.
                                    </Alert>
                                </Collapse>
                                }
                                </>
                            } 
                        </div>
                        <table className="column_table">
                            <thead>
                                <tr>
                                    <th className="column_table_header">
                                        <input type="checkbox" className="datapage_checkbox"></input>
                                        Selected
                                    </th>
                                    <th className="column_table_header">Column</th>
                                    <th className="column_table_header">Data</th>
                                    <th className="column_table_header">Mean</th>
                                    <th className="column_table_header">St.Dev</th>
                                    <th className="column_table_header">Median</th>
                                    <th className="column_table_header">Max</th>
                                    <th className="column_table_header">Min</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.DatasetDetails ? 
                                    props.DatasetDetails?.details?.map((i) => (
                                        <>
                                            <tr>
                                                <td>
                                                    <input name={i['column']} type="checkbox" className="datapage_checkbox" onChange={props.CallbackColumns(checkedCols)} 
                                                    onClick={(e) => onCheck(e)}/>
                                                </td>
                                                <td><p>{i['column']}</p></td>
                                                <td>
                                                    <p>
                                                        <span style={
                                                            {
                                                                'color': 'green'
                                                            }
                                                        }>
                                                            {
                                                                (((props.DatasetDetails.rows-i['null_count'])/props.DatasetDetails.rows)*100).toFixed(2)
                                                            }% valid
                                                        </span>
                                                        <br></br>
                                                        <span style={
                                                            {
                                                                'color': ((i['null_count'] / props.DatasetDetails.rows)*100).toFixed(2) >= 60 ? 'red' : 'black'
                                                            }
                                                        }>
                                                            {
                                                                ((i['null_count'] / props.DatasetDetails.rows)*100).toFixed(2)
                                                            }% missing
                                                        </span>
                                                    </p>
                                                </td>
                                                <td><p>{typeof i['mean'] === 'number' ? i['mean'].toFixed(2) : i['mean']}</p></td>
                                                <td><p>{typeof i['std'] === 'number' ? i['std'].toFixed(2) : i['std']}</p></td>
                                                <td><p>{typeof i['median'] === 'number' ? i['median'].toFixed(2) : i['std']}</p></td>
                                                <td><p>{i['max']}</p></td>
                                                <td><p>{i['min']}</p></td>
                                            </tr>
                                            
                                        </>
                                    )) : <Spinner animation="border" variant="primary" />
                                }
                            </tbody>
                        </table>
                    </div>
                }
                {tabNumber===3 &&
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