import { func } from "prop-types";
import { statMethods } from "../../../static/statMethods";
import Card from "../../Card";
import { useState } from "react";
import * as React from 'react';

import "../../../StyleSheets/cardfolder/card.css"
import { MemoizedColumnTable } from "./columnSelectionTable";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { makeStyles } from "@mui/styles";
import { Alert, FormControl, MenuItem, Select, InputLabel, CircularProgress, Typography } from "@mui/material";
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
    icons:{
        color: '#7051b8'
    },
    alert:{
        backgroundColor:'white',
        border:'1px solid #7051b8',
        fontFamily:'Poppins'
    },
    text:{
        fontFamily:'Poppins'
    }
    })

export default function StatConfig(props){
    const ButtonClasses = ButtonStyles();
    const [selection, setSelection] = useState([]);

    
    const handleSelection = (ids) => {
        const selectedIDs = new Set(ids);
        const selectedColumns = [];

        selectedIDs.forEach(id => {
            selectedColumns.push(props.studyColumns[id])
        });

        setSelection(selectedColumns);
    }
    
    console.log(selection);
    return(
       <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
           {props.chosen === "Chi-square Test for Association" &&
           <>
                <Alert 
                    icon={<InfoOutlinedIcon className={ButtonClasses.icons}/>} 
                    className={ButtonClasses.alert} 
                    sx={{marginBottom:"1rem"}}>
                    Select variables with expected values
                </Alert>
                <MemoizedColumnTable
                    data={props.studyColumns} 
                    Header={true} 
                    rowNumber={10}
                    checked={true}
                    handleSelection={handleSelection}
                />
                {selection !== undefined &&
                    selection.map((item,i) => 
                        <div>
                            <Alert 
                                icon={<InfoOutlinedIcon className={ButtonClasses.icons} />} 
                                className={ButtonClasses.alert} 
                                sx={{marginBottom:"1rem"}}>
                                {i + 1}. Select Column with expected value for "{item}"
                            </Alert>

                            <FormControl sx={{ width:"100%"}}>
                                <ThemeProvider theme={theme}>
                                    <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="purposeSelector"
                                    label="Column containing expected value"
                                    color = "primary"
                                    className={ButtonClasses.text}
                                    variant="standard"
                                    >
                                        {
                                            props.studyColumns !== undefined &&
                                                props.studyColumns.map((item,i) => 
                                                    <MenuItem className={ButtonClasses.text} value={item}>
                                                        {item}
                                                    </MenuItem>
                                                )
                                        }
                                        
                                    
                                    </Select>
                                </ThemeProvider>
                            </FormControl>
                        </div>
                        
                    
                    )
                }
           </>
            
           }
       
       </div>
    )
}