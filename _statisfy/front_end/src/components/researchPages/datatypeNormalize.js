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
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CleaningOptions from "../newDashBoard/CleaningOptions";
import { Bar, Doughnut } from "react-chartjs-2";
import React from 'react';
import { iqrTooltip } from "../../constants/stringConstants";
import {CategoryScale , 
    Chart as ChartJS,
    LinearScale,
    BarElement,
    Title,
    Tooltip as tp,
    Legend,
    DoughnutController,
    ArcElement
} from 'chart.js'; 

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    DoughnutController,
    Title,
    tp,
    Legend,
    ArcElement
);

export default function DataTypeNormalize(props){
    const matches = useMediaQuery('(min-width:900px)');
    const [modify, setModify] = useState(false);
    const [normalize, setNormalize] = useState(false);

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

    const handleNormalize = (e) => {
        setNormalize(e.target.checked);
        const current_option = []
        
        props.options.forEach(option => {
            const o = option;
            if(o.column === props.details.column){
                o['normalize'] = e.target.checked;
            }

            current_option.push(o);
        })

        props.setOptions(
            current_option
        )
    }

    const [datatype, setDataType] = useState("Nominal");

    const handleDataType = (event) => {
      setDataType(event.target.value);
    };

    return(
        <div className="Datatype_container">
            <div className="Datatype_header">
                <Typography variant="h5">{props.details.column}</Typography>
                
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
                
                {
                        props.details.type === "numerical" && 
                        <Bar
                            data={{
                                datasets: [
                                    {
                                        data: props.details.vis.map(i => i[1]),
                                        label: 'Frequency',
                                        barPercentage: 1.0,
                                        categoryPercentage: 1.0,
                                        backgroundColor: 'rgba(167, 66, 197, 0.2)',
                                        borderColor: 'rgba(167, 66, 197, 1)',
                                        borderWidth: 0.5
                                    },
                                ],
                                labels: props.details.vis.map(i => i[0])
                            }}

                            options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            display: false,
                                        }
                                    },
                                    scales: {
                                        x: {
                                            ticks: {
                                                display: false,
                                            },
                                            grid: {
                                                display: false,
                                                drawBorder: false,
                                            }
                                        },
                                        y: {
                                            ticks: {
                                                display: false
                                            },
                                            grid: {
                                                display: false,
                                                drawBorder: false,
                                            }
                                        },
                                    },
                                    
                                }
                            }
                        />
                    }

                    {
                        props.details.type === "object" && 
                        <Doughnut
                            data={{
                                datasets: [
                                  {
                                    data: Object.keys(props.details.vis).map((e, i) => props.details.vis[e]),
                                    label: 'Frequency',
                                    borderWidth: 8,
                                    backgroundColor: 'rgba(167, 66, 197, 0.2)',
                                    borderColor: 'rgba(167, 66, 197, 1)',
                                    borderWidth: 0.5
                                  }
                                ],
                                labels: Object.keys(props.details.vis).map((e) => e)
                              }}

                              options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        display: false,
                                    }
                                },
                              }}
                        />
                    }
            </div>
            <div className="Datatype_info">
                <div className="Datatype_info_var">
                    
                    <Typography sx={{fontWeight:"550"}}>Distribution</Typography>
                    <Typography>{props.details.distribution}</Typography>
                    <Typography sx={{fontWeight:"550"}}>Data Type</Typography>
                    <Typography>{props.details.type}</Typography>
                    
                    <Dialog disableEscapeKeyDown open={modifyDataType} onClose={handleCloseDataType}>
                        <DialogTitle>Modify {props.details.column}</DialogTitle>
                        <DialogContent>
                            <Typography>Data Distribution</Typography>
                            <FormControlLabel control={<Switch onChange={handleNormalize} color="secondary"/>} label="Normalize" />

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
                            <CleaningOptions CleanOptions={props.options} CallbackColumnOptions={props.setOptions} Variable={props.details.column}/>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseDataType} color="secondary">Cancel</Button>
                        <Button onClick={handleCloseDataType} color="secondary">Apply Changes</Button>
                        </DialogActions>
                    </Dialog>

                    <Typography sx={{fontWeight:"550"}}>Mean</Typography>
                    <Typography>{props.details.mean}</Typography>
                    <Typography sx={{fontWeight:"550"}}>Median</Typography>
                    <Typography>{props.details.median}</Typography>
                    <Typography sx={{fontWeight:"550"}}>Null Values</Typography>
                    <Typography>{props.details.null_count}</Typography>
                    <Typography sx={{fontWeight:"550"}}>
                        Outliers (IQR method)
                        <Tooltip
                            title={iqrTooltip}
                            placement="bottom"
                            arrow
                            color='secondary'
                            >
                            <HelpOutlineIcon fontSize='small' color='secondary'/>
                        </Tooltip>
                    </Typography>
                    <Typography>{props.details.outliers}</Typography>
                </div>

                
                
            </div>
        </div>
    ); 
}