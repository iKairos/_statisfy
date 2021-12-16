import "../../StyleSheets/resstudyfolder/resstudy.css"




import Button from '@mui/material/Button';
import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';


import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import AllCards from "../AllCards";
import StudyCard from "../StudyCard";
import Study from "../study";
import Checkbox from "../Checkbox";
import { DataColumns } from "./dataColumns";




//<span className ="text_topic">{researchGetRes?.data.test_type}</span>

export default function ResStudies(props){

    const [isAdding, setAdding] = useState(false);
    const [selected, setSelected] = useState(false);
    const [sort, setSort] = useState(1);
    const [ascending, setAscending] = useState(true);
    const [methodChosen, setMethodChosen] = useState();
    const [tags, setTags] = useState([]);

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const callbackCheckbox = (checked) => {
        setTags(checked);
    }

    const displayMethodChosen = (choice) =>{
        setMethodChosen(choice);
    }

    const handleSort = (value) => {
       setSort(value)
    };

    const handleAdding = (value) => {
        setAdding(value)
     };

     const handleSelected = function(value) {
        setSelected(value)
     };

    const handleAscending = (value) => {
        setAscending(value)
     };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
        } else if (event.key === 'Escape') {
        setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return(
        
        <div className="resStudy_body_container">
            

            {selected
                ?(
                    <div className="resStudy_body_add">
                        <Button 
                            color="secondary" 
                            className="resStudy_body_add_button"
                            onClick={()=>handleSelected(false)}
                        >
                            <ArrowBackIosNewIcon/>
                            Back to List
                        </Button>
                    </div>
                )
                :(
                    <>
                    {isAdding
                        ?(
                            <div className="resStudy_body_add">
                                <Button 
                                    color="secondary" 
                                    className="resStudy_body_add_button"
                                    onClick={()=>handleAdding(false)}
                                >
                                    <ArrowBackIosNewIcon/>
                                    Back to List
                                </Button>
                            </div>
                        )
                        :(
                        <div className="resStudy_body_add">
                            <Button 
                                color="secondary" 
                                className="resStudy_body_add_button"
                                onClick={()=>handleAdding(true)}
                            >
                                <AddIcon className="AddIcon"/>
                                add new study
                            </Button>
                            <Stack direction="row" spacing={2} className="Sort">
                                <div>
                                    <Button
                                    ref={anchorRef}
                                    id="composition-button"
                                    aria-controls={open ? 'composition-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleToggle}
                                    color="secondary"
                                    
                                    >
                                    Sort
                                    <SortIcon/>
                                    </Button>
                                    <Popper
                                    open={open}
                                    anchorEl={anchorRef.current}
                                    role={undefined}
                                    placement="bottom-start"
                                    transition
                                    disablePortal
                                    >
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin:
                                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                                        }}
                                        >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList
                                                autoFocusItem={open}
                                                id="composition-menu"
                                                aria-labelledby="composition-button"
                                                onKeyDown={handleListKeyDown}
                                            >
                                                <MenuItem 
                                                    onClick={ sort === 1
                                                        ? ()=>handleAscending(!ascending)
                                                        :()=>handleSort(1)}
                                                    sx={ sort === 1
                                                        ? {
                                                        width: "10rem",
                                                        color: "#a742c5"}
                                                        :{
                                                            width: "10rem",
                                                            color: "#23272a"
                                                        } 
                                                    }
                                                    
                                                >
                                                    Name
                                                    {sort === 1 
                                                        ?  (ascending 
                                                            ? <ArrowUpwardIcon/>
                                                            : <ArrowDownwardIcon/>)
                                                        :  null
                                                    }
                                                </MenuItem>
                                                <MenuItem 
                                                    onClick={ sort === 2
                                                        ? ()=>handleAscending(!ascending)
                                                        :()=>handleSort(2)}
                                                    sx={ sort === 2
                                                        ? {
                                                        width: "10rem",
                                                        color: "#a742c5"}
                                                        :{
                                                            width: "10rem",
                                                            color: "#23272a"
                                                        } 
                                                    }
                                                >
                                                    Date Created
                                                    {sort === 2 
                                                        ?  (ascending 
                                                            ? <ArrowUpwardIcon/>
                                                            : <ArrowDownwardIcon/>)
                                                        :  null
                                                    }
                                                </MenuItem>
                                                <MenuItem 
                                                    onClick={ sort === 3
                                                        ? ()=>handleAscending(!ascending)
                                                        :()=>handleSort(3)}
                                                    sx={ sort === 3
                                                        ? {
                                                        width: "10rem",
                                                        color: "#a742c5"}
                                                        :{
                                                            width: "10rem",
                                                            color: "#23272a"
                                                        } 
                                                    }
                                                >
                                                    Last Changed
                                                    {sort === 3 
                                                        ?  (ascending 
                                                            ? <ArrowUpwardIcon/>
                                                            : <ArrowDownwardIcon/>)
                                                        :  null
                                                    }
                                                </MenuItem>
                                            
                                            </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                        </Grow>
                                    )}
                                    </Popper>
                                </div>
                            </Stack>
                        </div>
                        )
                    }
                    </>

                )
            
            }
            
                
            {selected
            ?(
                <Study/>
            )
            :(
                <>
                {isAdding
                    ? (
                    <div className = "resStudy_body_content">
                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            
                            className = "StudyTitle"
                            
                        >
                            <div>
                                <TextField
                                    id="outlined-textarea"
                                    label="Study Title"
                                    placeholder="Add new title"
                                    multiline
                                    rows={2}
                                    color = "secondary"
                                    fullWidth
                                />
                            </div>
                        </Box>
                        <Box className = "StudyTitle">
                            <Typography>Select Method:</Typography>
                            <Accordion  >
                            <AccordionSummary
                                expandIcon={<AddCircleOutlineIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                            <Typography>{typeof methodChosen!== "undefined"
                                        ? methodChosen
                                        : "new"
                            }</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className = "resStudy_stats">
                                    <div className = "resStudy_stats_filter">
                                        <Accordion className = "StudyFilter">
                                            <AccordionSummary
                                                expandIcon={<AddCircleOutlineIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                            <Typography>Filters</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                
                                                <Checkbox callbackFunction={callbackCheckbox}/>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                    <div className = "resStudy_stats_methods">
                                        
                                        <AllCards tags={tags} display={displayMethodChosen}/>
                                    </div>
                                </div>
                            
                            </AccordionDetails>
                            </Accordion>
                        </Box>
                        

                        {typeof props.DataSetFile !== 'undefined' ? 
                            <DataColumns
                                data={props.DataSetFile.data} 
                                Header={true} 
                                rowNumber={15}
                                checked={true}
                            /> : null
                        }
                    
                    </div>)
                    : (
                        <div className = "resStudy_body_content">
                            <div className = "resStudy_body_study">
                               
                                <StudyCard
                                    HandleSelected = {handleSelected}
                                />
                                <StudyCard
                                    HandleSelected = {handleSelected}
                                />
                                <StudyCard
                                    HandleSelected = {handleSelected}
                                />
                            </div>
                        </div>
                    )
                }
                </>
            )}
            
            
            
        </div>
    );
}