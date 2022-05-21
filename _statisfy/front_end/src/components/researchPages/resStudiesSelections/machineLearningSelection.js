

import { Alert, FormControl, MenuItem, Select, InputLabel, CircularProgress, Typography } from "@mui/material";
import {MemoizedTable } from "../../DisplayTable";
import DataTypeNormalize from "../datatypeNormalize";
import { useState } from "react";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';


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
    tabs:{
        textColor:'white'
    },
    icons:{
        color: '#7051b8'
    },
    textField:{
        color: '#7051b8',
    },
    alert:{
        backgroundColor:'white',
        border:'1px solid #7051b8',
        fontFamily:'Poppins'
    },
    root: {
        
        fontFamily:'Poppins',
        "& label.Mui-focused": {
          color: '#7051b8',
          fontFamily:'Poppins',
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: '#7051b8',
          fontFamily:'Poppins',
        },
        "& .MuiInput-underline:before": {
            fontFamily:'Poppins',
        },
        
    },
    inputText:{
        fontFamily:'Poppins',
    }
  })
export const MachineLearningSelection = (props) => {
    const ButtonClasses = ButtonStyles();    
    const handleLabel = (choice) => {
        props.setLabel(choice);
    };
    
    return (
        <div className="resList_column">
            <div style={{paddingBottom:"1rem"}}>
                <Alert 
                    icon={props.purpose !== "" 
                        ? <CheckCircleOutlineOutlinedIcon className={ButtonClasses.icons} /> 
                        : <InfoOutlinedIcon className={ButtonClasses.icons} />} 
                    className={ButtonClasses.alert} 
                    sx={{marginBottom:"1rem"}}
                >
                    Select the machine learning category
                </Alert>
                <FormControl sx={{ width:"100%"}}>
                    <ThemeProvider theme={theme}>
                        <InputLabel id="demo-simple-select-helper-label" 
                            className={ButtonClasses.inputText}
                        >
                                
                            Machine Learning Purpose
                            
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="purposeSelector"
                            value={props.purpose}
                            label="Purpose of Analysis"
                            onChange={props.handlePurpose}
                            variant="standard"
                            className={ButtonClasses.inputText}
                        >
                        <MenuItem className={ButtonClasses.inputText} value="Clustering" onClick={(event) => props.setTags([event.target.innerText])}>Clustering</MenuItem>
                        <MenuItem className={ButtonClasses.inputText} value="Classification" onClick={(event) => props.setTags([event.target.innerText])}>Classification</MenuItem>
                        <MenuItem className={ButtonClasses.inputText} value="Regression" onClick={(event) => props.setTags([event.target.innerText])}>Regression</MenuItem>
                        </Select>
                    </ThemeProvider>
                    
                </FormControl>

            </div>
            {typeof props.datasetDetails !== 'undefined' ? 
                <Alert 
                    icon={props.studyColumns.length !== 0 
                        ? <CheckCircleOutlineOutlinedIcon className={ButtonClasses.icons} /> 
                        : <InfoOutlinedIcon className={ButtonClasses.icons} />} 
                    className={ButtonClasses.alert} 
                    sx={{marginBottom:"1rem", marginTop:"2rem"}}
                >
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
                <Alert 
                    icon={props.studyColumns.length !== 0 
                        ? <CheckCircleOutlineOutlinedIcon className={ButtonClasses.icons}/> 
                        : <InfoOutlinedIcon className={ButtonClasses.icons}/>} 
                    className={ButtonClasses.alert}  
                    sx={{marginBottom:"1rem", marginTop:"2rem"}}
                >
                    <div style={{display:"flex", flexDirection:"row", gap:"0.5rem"}}>
                        Configure variables as necessary. You can also select a label variable (optional).
                    
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
                
                        return <DataTypeNormalize tool="ml" handleLabel={handleLabel} label={props.label} details={data} options={props.callbackColumnsCleanOptions} setOptions={props.setCallbackColumnsCleanOptions}/>;
                    })
                }
            </div>
        </div>
    
    );
};