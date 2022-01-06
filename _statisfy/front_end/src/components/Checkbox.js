import { func } from "prop-types";
import { useState } from "react";
import "../StyleSheets/checkbox.css";
import { Typography } from "@mui/material";

import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from "@mui/material";
import Popover from '@mui/material/Popover';

import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp';
import CloseIcon from '@mui/icons-material/Close';



export default function Checkbox({callbackFunction}){
    const [ checked, setChecked] = useState([]);
    const [openFilter, setFilter] = React.useState(false);

    const [selected, setSelected] = useState("");

    const handleFilter = () => {
        setFilter(false);
    };
    const handleChange = (event) => {
        setSelected(event.target.value);
    };
    const toggleFilter = () => {
        setFilter(!openFilter);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        toggleFilter();
    };

    const handleClose = () => {
        setAnchorEl(null);
        handleFilter();
    };

    const open = Boolean(anchorEl);
    const id = open ? 'filter' : undefined;


    return (
        <div>
            <Button 
                onClick={handleClick} 
                color="secondary" 
                variant={openFilter? "contained": "outlined"}
                aria-describedby={id}
            >
                <Typography>Filter</Typography>
                {openFilter? <CloseIcon/> : <FilterAltSharpIcon/>}
            </Button>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
            >
                <div style={{padding:"1rem"}}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Purpose of Analysis</FormLabel>
                    <RadioGroup
                        aria-label="gender"
                        defaultValue="female"
                        name="radio-buttons-group"
                        value={selected}
                        onChange={handleChange}
                    >
                            <FormControlLabel value="Relationship" control={<Radio />} label="Relationship" />
                            <FormControlLabel value="SignificantDifferences" control={<Radio />} label="Significant Differences" />
                            <FormControlLabel value="UnivariateAnalysis" control={<Radio />} label="Univariate Analysis" />
                            <FormControlLabel value="" control={<Radio />} label="Show All" />
                    </RadioGroup>
                </FormControl>
                </div>

            </Popover>

            
        </div>
    
    )
}