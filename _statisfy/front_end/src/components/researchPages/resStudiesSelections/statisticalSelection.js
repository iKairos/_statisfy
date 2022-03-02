

import { Alert, FormControl, MenuItem, Select, InputLabel, CircularProgress, Typography } from "@mui/material";
import {MemoizedTable } from "../../DisplayTable";
import DataTypeNormalize from "../datatypeNormalize";

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

export const StatisticalSelection = (props) => {

    return (
        <div className="resList_column">
            <div style={{paddingBottom:"1rem"}}>
                <Alert icon={props.purpose !== "" ? <CheckCircleOutlineOutlinedIcon/> : <InfoOutlinedIcon/>} color="secondary" sx={{marginBottom:"1rem"}}>
                    Select the purpose of the analysis
                </Alert>
                <FormControl sx={{ width:"100%"}}>
                    <InputLabel id="demo-simple-select-helper-label" color = "secondary">Purpose of Analysis</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="purposeSelector"
                    value={props.purpose}
                    label="Purpose of Analysis"
                    onChange={props.handlePurpose}
                    color = "secondary"
                    >
                    <MenuItem value="Relationship" onClick={(event) => props.setTags([event.target.innerText])}>Relationship</MenuItem>
                    <MenuItem value="Significant Differences" onClick={(event) => props.setTags([event.target.innerText])}>Significant Differences</MenuItem>
                    <MenuItem value="Univariate Analysis" onClick={(event) => props.setTags([event.target.innerText])}>Univariate Analysis</MenuItem>
                    </Select>
                </FormControl>

            </div>
            {typeof props.datasetDetails !== 'undefined' ? 
                <Alert icon={props.studyColumns.length !== 0 ? <CheckCircleOutlineOutlinedIcon/> : <InfoOutlinedIcon/>} color="secondary" sx={{marginBottom:"1rem", marginTop:"2rem"}}>
                    <div style={{display:"flex", flexDirection:"row", gap:"0.5rem"}}>
                        Select variables to be processed 
                        {props.studyColumns.length !==0 
                        ? <Typography variant="inherit">(Selected Variables: {props.studyColumns.length})</Typography> 
                        : null}
                    </div>
                    
                    
                </Alert>
                :null
            }
            {typeof props.datasetDetails !== 'undefined' ? 
                <MemoizedTable
                    data={props.datasetDetails.details} 
                    Header={true} 
                    rowNumber={10}
                    checked={true}
                    callbackSetSelectedRows={props.callbackSetSelectedRows}
                /> : <CircularProgress color="info" thickness={2.5} size={30}/>
            }


            {props.studyColumns.length !== 0 ? 
                <Alert icon={props.studyColumns.length !== 0 ? <CheckCircleOutlineOutlinedIcon/> : <InfoOutlinedIcon/>} color="secondary" sx={{marginBottom:"1rem", marginTop:"2rem"}}>
                    <div style={{display:"flex", flexDirection:"row", gap:"0.5rem"}}>
                        Configure variables as necessary.
                    
                    </div>
                    
                    
                </Alert>
                :null
            }

            <div className="Datatype">
                {
                    props.studyColumns.map(col => {
                        var data = {};
                
                        props.datasetDetails?.details?.forEach(deets => {
                            if(deets.column === col){
                                data = deets;
                                return;
                            }
                        })
                
                        return <DataTypeNormalize tool="stats" details={data} options={props.callbackColumnsCleanOptions} setOptions={props.setCallbackColumnsCleanOptions}/>;
                    })
                }
            </div>
        </div>
    
    );
};