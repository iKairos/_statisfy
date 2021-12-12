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
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';




import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useState } from "react";
import { width } from "@mui/system";





//<span className ="text_topic">{researchGetRes?.data.test_type}</span>

export default function ResStudies(props){

    const [isAdding, setAdding] = useState(false);
    const [sort, setSort] = useState(1);
    const [ascending, setAscending] = useState(true);

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleSort = (value) => {
       setSort(value)
    };

    const handleAdding = (value) => {
        setAdding(value)
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
            <div className="resData_body_heading">
                <p className ="text_label">Studies </p>
            </div>

            
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
                )}
                
            

            <div className = "resStudy_body_content">
                2
            </div>
            
        </div>
    );
}