import "../../StyleSheets/resstudyfolder/resstudy.css"
import { Button, Tooltip, IconButton} from "@mui/material";
import { Typography, Divider, useMediaQuery,   } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from "react";

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import CleaningOptions from "../newDashBoard/CleaningOptions";
import { Bar, Doughnut } from "react-chartjs-2";
import React from 'react';

export default function DataTypeNormalize(props){
    const matches = useMediaQuery('(min-width:900px)');
    const [modify, setModify] = useState(false);

    const handleModify = () =>{
        setModify(!modify);
    }


    const [modifyDataType, setModifyDataType] = useState(false);
    const handleOpenDataType = () =>{
        setModifyDataType(true);
    }
    const handleCloseDataType = (event, reason) =>{
        if (reason !== 'backdropClick') {
            setModifyDataType(false);
        }
    }

    

    const [datatype, setDataType] = useState("Nominal");

    const handleDataType = (event) => {
      setDataType(event.target.value);
    };

    return(
        <div className="Datatype_container">
            <div className="Datatype_header">
                <Typography variant="h5">Variable Names</Typography>
                
                <IconButton 
                    sx={{position:"absolute", right:"0", top:"0", margin:"0.5rem"}} 
                    color="secondary" 
                    variant="outlined"
                    size="medium"
                    onClick={handleOpenDataType}
                >
                    <SettingsIcon/>
                </IconButton>
            </div>
            <div className="Datatype_graph">
                <Typography>Distribution Table</Typography>
                1
            </div>
            <div className="Datatype_info">
                <div className="Datatype_info_var">
                    
                    <Typography sx={{fontWeight:"550"}}>Distribution</Typography>
                    <Typography>Normal Distribution</Typography>
                    <Typography sx={{fontWeight:"550"}}>Data Type</Typography>
                    <Typography>{datatype}</Typography>
                    
                    <Dialog disableEscapeKeyDown open={modifyDataType} onClose={handleCloseDataType}>
                        <DialogTitle>Modify Variable</DialogTitle>
                        <DialogContent>
                            <Typography>Data Distribution</Typography>
                            <FormControlLabel control={<Switch defaultChecked color="secondary"/>} label="Normalize" />

                            <Typography>Modify Data Type</Typography>
                            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                <FormControl sx={{marginTop:"1rem", marginBottom:"2rem", minWidth: "100%" }}>
                                    <InputLabel id="demo-dialog-select-label" color="secondary">Data Type</InputLabel>
                                    <Select
                                        labelId="demo-dialog-select-label"
                                        id="demo-dialog-select"
                                        value={datatype}
                                        onChange={handleDataType}
                                        input={<OutlinedInput label="Data Type" />}
                                        color="secondary"
                                    >
                                        <MenuItem value="Nominal">Nominal</MenuItem>
                                        <MenuItem value="Ordinal">Ordinal</MenuItem>
                                        <MenuItem value="Interval">Interval</MenuItem>
                                        <MenuItem value="Ratio">Ratio</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <Typography> Clean data</Typography>
                            <CleaningOptions/>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseDataType} color="secondary">Cancel</Button>
                        <Button onClick={handleCloseDataType} color="secondary">Apply Changes</Button>
                        </DialogActions>
                    </Dialog>

                    <Typography sx={{fontWeight:"550"}}>Mean</Typography>
                    <Typography>1.5</Typography>
                    <Typography sx={{fontWeight:"550"}}>Median</Typography>
                    <Typography>1.5</Typography>
                    <Typography sx={{fontWeight:"550"}}>Mode</Typography>
                    <Typography>1.5</Typography>
                </div>

                
                
            </div>
        </div>
    ); 
}