import "../../StyleSheets/studycardfolder/studycard.css"
import React, { useState } from "react";
import { IconButton, Button, Typography, Snackbar, Alert, CircularProgress} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { deleteResearch, getResearches } from "../../actions/researchAction";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function ResCard(props){

    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [isOpenSnackbar, setOpenErrorSnackbar] = useState(false);
    const handleClose = () => {
        setOpenBackdrop(false);
    };
    const handleToggle = () => {
        setOpenBackdrop(!openBackdrop);
    };

    const dispatch = useDispatch();

    const dataSelector = useSelector((state) => 
        state.researchDelete
    );
    const { loading, researchDeleteRes } = dataSelector;

    const handleDelete = () => {
        dispatch(deleteResearch(props._id));
    };
    
    const history = useHistory();

    const stringifyDatetime = datetime => {
        const d = new Date(datetime).toLocaleString('en-US', {
            timeZone: 'Asia/Manila'
            });
        return d
    }

    if(researchDeleteRes?.code === "RESEARCH_DELETE_SUCCESS"){
        history.push({
            pathname: `/profile`,
            state: {
                message: {
                    'body': researchDeleteRes.message
                },
                openSnackbar: true,
            }
        });
        history.go(0);
        return;
    }

    return(
        <div className ="StudyCard">
            <div className="StudyCard_title">
                {props.title}
                
            {
                props.editable ?
                loading ? <CircularProgress sx={{
                    position:"absolute",
                    right: 5,
                    top: 5
                }}color="secondary" thickness={2.5} size={30}/> :
                <IconButton
                    onClick={handleToggle}
                    sx={{
                        position:"absolute",
                        right: 5,
                        top: 5
                    }}
                >
                    <DeleteIcon color="secondary"/>
                </IconButton>
                :
                null
            }

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
                onClick={handleClose}
            >
                <div className="StudyCard_confirmation">
                    <Typography variant="h6">Are you sure you want to delete the research "{props.title}"?</Typography>
                    <div className="StudyCard_confirmation_actions">
                        <Button variant="contained" color="secondary" onClick={handleDelete}>
                            Delete
                        </Button>
                        <Button variant="outlined" color="secondary">
                            Cancel
                        </Button>
                    </div>
                </div>
            </Backdrop>


            </div>
            <div className="StudyCard_method">
                {stringifyDatetime(props.created_at)}
            </div>
            
            <div className="StudyCard_desc">
                {props.description}
            </div>
            
            <Button 
                onClick={()=>props.HandleSelected(props._id)}
                variant="outlined"
                color="secondary"
            >View Research
            </Button>
            
        </div>
    ); 
}