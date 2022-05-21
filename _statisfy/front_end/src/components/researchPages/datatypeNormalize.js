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
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
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



const theme = createTheme({
    palette: {
      primary: {
        main: '#7051b8',
      },
      secondary: {
        main: '#7051b8',
      },
    },
  });

  const ButtonStyles = makeStyles ({
    btn:{
      borderRadius: '0.5rem',
      width:'fit-content',
      height:'2.5rem',
      color:'#7051b8',
      backgroundColor:'white',
      fontWeight:'700',
      paddingLeft:'0.5rem',
      paddingRight:'0.5rem',
      fontFamily:'Poppins',
      border:'1px solid #7051b8',
    },
    icons:{
        color: '#7051b8'
    },
    inputText:{
        fontFamily:'Poppins',
    }
  })

export default function DataTypeNormalize(props){
    const ButtonClasses = ButtonStyles();    
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
            <ThemeProvider theme={theme}>
            <div className="Datatype_header">
                
                <Typography variant="h6" className={ButtonClasses.inputText}>{props.details.column}</Typography>
                <div style={{display:"flex", flexDirection:"row", position:"absolute", right:"0", top:"0", margin:"0.5rem"}}>
                   {props.tool === "ml"
                   &&
                   <>
                    {props.label === props.details.column
                        ?
                        <Button
                            onClick={()=>{props.handleLabel("")}}
                            variant="contained"
                            color="secondary"
                            className={ButtonClasses.inputText}
                        >
                        Dependent
                        </Button>
                        :
                        <Button
                            onClick={()=>{props.handleLabel(props.details.column)}}
                            variant="outlined"
                            color="secondary"
                            className={ButtonClasses.inputText}
                        >
                        Independent
                        </Button>
                    }
                    
                    </>
                   }
                    <IconButton 
                        color="secondary" 
                        variant="outlined"
                        size="medium"
                        onClick={handleOpenDataType}
                    >
                        <SettingsIcon/>
                    </IconButton>
                </div>
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
                                        backgroundColor: 'rgba(100, 87, 196, 1)',
                                        borderColor: 'white',
                                        borderWidth: 0.5,
                                        borderRadius: 10,
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
                                    borderWidth: 10,
                                    borderRadius: 30,
                                    backgroundColor: Object.keys(props.details.vis).length === 3 ? ['rgba(53, 113, 148, 1)','rgba(100, 87, 196, 1)', 'rgba(230, 150, 232, 1)'] : ['rgba(53, 113, 148, 1)', 'rgba(100, 87, 196, 1)'],

                                  }
                                ],
                                labels: Object.keys(props.details.vis).map((e) => e)
                              }}

                              options={{
                                maintainAspectRatio: false,
                                responsive: true,
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                                cutout: '75%',
                              }}
                        />
                    }
            </div>
            <div className="Datatype_info">
                <div className="Datatype_info_var">
                    
                    <Typography className={ButtonClasses.inputText}>Distribution</Typography>
                    <Typography className={ButtonClasses.inputText}>{props.details.distribution}</Typography>
                    <Typography className={ButtonClasses.inputText}>Data Type</Typography>
                    <Typography className={ButtonClasses.inputText}>{props.details.type}</Typography>
                    
                    <Dialog disableEscapeKeyDown open={modifyDataType} onClose={handleCloseDataType}>
                        <DialogTitle className={ButtonClasses.inputText}>Modify {props.details.column}</DialogTitle>
                        <DialogContent>
                            <Typography className={ButtonClasses.inputText}>Data Distribution</Typography>
                            <FormControlLabel control={<Switch onChange={handleNormalize} color="secondary" />} label="Normalize" />

                            <Typography className={ButtonClasses.inputText}>Modify Data Type</Typography>
                            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                <FormControl sx={{marginTop:"1rem", marginBottom:"2rem", minWidth: "100%" }}>
                                    <InputLabel id="demo-dialog-select-label" color="secondary" className={ButtonClasses.inputText}>Data Type</InputLabel>
                                    <Select
                                        labelId="demo-dialog-select-label"
                                        id="demo-dialog-select"
                                        value={datatype}
                                        onChange={handleDataType}
                                        input={<OutlinedInput label="Data Type" />}
                                        color="secondary"
                                        className={ButtonClasses.inputText}
                                    >
                                        <MenuItem className={ButtonClasses.inputText} value="Nominal">Nominal</MenuItem>
                                        <MenuItem className={ButtonClasses.inputText} value="Ordinal">Ordinal</MenuItem>
                                        <MenuItem className={ButtonClasses.inputText} value="Interval">Interval</MenuItem>
                                        <MenuItem className={ButtonClasses.inputText} value="Ratio">Ratio</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <Typography className={ButtonClasses.inputText}> Clean data</Typography>
                            <CleaningOptions className={ButtonClasses.inputText} CleanOptions={props.options} CallbackColumnOptions={props.setOptions} Variable={props.details.column}/>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseDataType} color="secondary" className={ButtonClasses.inputText}>Cancel</Button>
                        <Button onClick={handleCloseDataType} color="secondary" className={ButtonClasses.inputText}>Apply Changes</Button>
                        </DialogActions>
                    </Dialog>

                    <Typography className={ButtonClasses.inputText}>Mean</Typography>
                    <Typography className={ButtonClasses.inputText}>{props.details.mean}</Typography>
                    <Typography className={ButtonClasses.inputText}>Median</Typography>
                    <Typography className={ButtonClasses.inputText}>{props.details.median}</Typography>
                    <Typography className={ButtonClasses.inputText}>Null Values</Typography>
                    <Typography className={ButtonClasses.inputText}>{props.details.null_count}</Typography>
                    <Typography className={ButtonClasses.inputText}>
                        Outliers 
                        <Tooltip
                            title={iqrTooltip}
                            placement="bottom"
                            arrow
                            color='secondary'
                            >
                            <HelpOutlineIcon fontSize='small' color='secondary'/>
                        </Tooltip>
                    </Typography>
                    <Typography className={ButtonClasses.inputText}>{props.details.outliers}</Typography>
                    <Typography className={ButtonClasses.inputText}>Skew</Typography>
                    <Typography className={ButtonClasses.inputText}>{props.details.skew}</Typography>
                    <Typography className={ButtonClasses.inputText}>Kurtosis</Typography>
                    <Typography className={ButtonClasses.inputText}>{props.details.kurtosis}</Typography>
                </div>

                
                
            </div>
            </ThemeProvider>
           
        </div>
    ); 
}