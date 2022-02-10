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
                <Typography variant="h5">Variable Name</Typography>
                
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
                        <DialogContent><Typography variant="h5"> Variable Name</Typography></DialogContent>
                        
                        <DialogTitle>Normality</DialogTitle>
                        <DialogContent>
                            <Typography>The distribution for the variable *redacted* is already normal</Typography>
                            <Button 
                                variant ="outlined" 
                                color ="secondary" 
                                onClick={handleModify}
                                disabled={true}
                                sx={{width:"10rem"}}
                            >
                                Normalize
                            </Button>
                        </DialogContent>
                        
                        <DialogTitle>Modify Data Type</DialogTitle>
                        <DialogContent>
                        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                                <InputLabel id="demo-dialog-select-label">Data Type</InputLabel>
                                <Select
                                    labelId="demo-dialog-select-label"
                                    id="demo-dialog-select"
                                    value={datatype}
                                    onChange={handleDataType}
                                    input={<OutlinedInput label="Data Type" />}
                                >
                                    <MenuItem value="Nominal">Nominal</MenuItem>
                                    <MenuItem value="Ordinal">Ordinal</MenuItem>
                                    <MenuItem value="Interval">Interval</MenuItem>
                                    <MenuItem value="Ratio">Ratio</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseDataType}>Cancel</Button>
                        <Button onClick={handleCloseDataType}>Apply Changes</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                
            </div>
        </div>
    ); 
}