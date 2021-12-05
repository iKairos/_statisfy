import { DisplayTable } from "../DisplayTable";
import { useRef, useState } from "react";
import "../../StyleSheets/datapagefolder/datapage.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Alert, AlertTitle, Collapse, Tooltip, CircularProgress, Fade, Slide } from '@mui/material';
import { instDataPage, tooltipDataset, tooltipDelimiter } from "../../constants/stringConstants";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TableChartIcon from '@mui/icons-material/TableChart';

export default function DataSetPage(props){

    const [tabNumber, setTab] = useState(1);
    const [show, setShow] = useState(true);
    const [checkedCols, setCheckedCols] = useState([]);
    const [display, setDisplay] = useState(false);
    const [isUploading, setUploading] = useState(true);
    const [header, setHeader] = useState(false);
    const containerRef = useRef(null);

    const switchPage = (page)=>{
        setTab(page);
    }
    const displayContent = () =>{
        setUploading(false);
        setDisplay(true);
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
                    <Fade in={tabNumber === 1}>
                        <div className="datapage_content">
                            <div className="data_upload_cont">
                                <Alert variant="outlined" severity="info">
                                    <AlertTitle><strong>Instructions:</strong></AlertTitle>
                                    {
                                        instDataPage.map((i) => (
                                            <><b>{i[0]}.</b> {i[1]} <br/></>
                                        ))
                                    }
                                </Alert>
                            </div>
                            <div className="datapage_upload_cont">
                                <span>
                                    <b>Upload a dataset </b>
                                    <Tooltip
                                        title={tooltipDataset}
                                        placement="right"
                                        arrow
                                    >
                                        <HelpOutlineIcon fontSize='inherit' color='info'/>
                                    </Tooltip><br/>
                                    <label className="datapage_upload">
                                        <input className="datapage_upload_input" type="file" name="file" accept=".csv" 
                                        onChange={(e) => props.ChangeHandler(e)} 
                                        onClick={displayContent}/>
                                        Upload
                                    </label> 
                                </span>
                                <br/>
                                <span>
                                    <b>Set Delimiter </b>
                                    <Tooltip
                                        title={tooltipDelimiter}
                                        placement="right"
                                        arrow
                                    >
                                        <HelpOutlineIcon fontSize='inherit' color='info'/>
                                    </Tooltip>
                                </span>
                                <input className = "datapage_drop_input" onChange={(e) => props.CallbackDelimiter(e.target.value)}></input>
                                
                                {props.Display? (
                                    !props.Loading ? (
                                    <div ref={containerRef}>
                                        <Slide direction="right" in ={!props.Loading} container={containerRef.current} {...(!props.Loading ? { timeout: 1200 } : {})}>
                                            <div className="datapage_details">
                                                    <>
                                                        <span className="data_span">File Name</span>
                                                        {<p className="data_span">{props.FileDetails ? props.FileDetails?.name : ""}</p>}
                                                        <span className="data_span">File Size</span>
                                                        {<p className="data_span">{props.FileDetails ? `${props.FileDetails?.size / 1000} kB`: ""}</p>}
                                                        <span className="data_span">Size</span>
                                                        <p className="data_span">{typeof props.DatasetDetails?.size !== 'undefined' ? `${props.DatasetDetails?.size} datapoints`: ""}</p>
                                                        <span className="data_span">Columns</span>
                                                        <p className="data_span">{typeof props.DatasetDetails?.columns !== 'undefined' ? `${props.DatasetDetails?.columns} columns`: ""}</p>
                                                        <span className="data_span">Rows</span>
                                                        <p className="data_span">{typeof props.DatasetDetails?.rows !== 'undefined' ? `${props.DatasetDetails?.rows} rows`: ""}</p>
                                                    </>
                                            </div> 
                                        </Slide>
                                    </div>
                                    ): <CircularProgress color="info" thickness={2.5} size={30}/>
                                ):null}
                            </div>
                                {
                                    props.DatasetDetails?.error || props.Error ? (
                                    <div className = "data_upload_cont">
                                        <button className="datapage_error" onClick={() => setShow(!show)}>
                                            Error {show ? <FaAngleDown/> : <FaAngleUp/>}
                                        </button>
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
                                <>
                                <div className="data_upload_cont">
                                    <Alert iconMapping={{
                                        info: <TableChartIcon/>,
                                    }}variant="outlined" severity="info">
                                        <AlertTitle><strong>Table Header:</strong></AlertTitle>
                                        <b>Do you want to set the first row as header?</b>
                                        <button className= {header? "datapage_btn_active":"datapage_btn"}
                                            onClick={() => setHeader(true)}>Yes</button>
                                        <button className= {header? "datapage_btn":"datapage_btn_active"}
                                            onClick={() => setHeader(false)}>No</button>
                                    </Alert>
                                </div>
                                <DisplayTable 
                                    data={props.DataArray}
                                    Header = {header}
                                />
                            


                                </>
                            }
                        </div>
                    </Fade>
                }
                
                {tabNumber === 2 &&
                    <Fade in={tabNumber === 2}>
                        <div className="datapage_content">
                            <div className="datapage_upload_cont">
                            {
                                props.DatasetDetails?.error || props.Error ? (
                                <div className = "data_upload_cont">
                                    <button className="datapage_error" onClick={() => setShow(!show)}>
                                        Error {show ? <FaAngleDown/> : <FaAngleUp/>}
                                    </button>
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
                                        )) : <CircularProgress color="info" thickness={2.5} size={30}/>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </Fade>
                }
                {tabNumber === 3 &&
                    <Fade in={tabNumber === 3}>
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
                                )) : <CircularProgress color="info" thickness={2.5} size={30}/>
                            }
                            </tbody>
                        </table>
                        </div>
                     </Fade>
                }
            </div>
        </div>     
     ); 
 }