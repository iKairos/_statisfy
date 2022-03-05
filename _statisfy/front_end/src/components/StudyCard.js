import "../StyleSheets/studycardfolder/studycard.css"
import { useState } from "react";
import { IconButton, Button, Typography} from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { deleteStudy } from "../actions/researchAction";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


export default function StudyCard(props){
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const handleClose = () => {
        setOpenBackdrop(false);
    };
    const handleToggle = () => {
        setOpenBackdrop(!openBackdrop);
    };
    
    const dispatch = useDispatch();

    const dataSelector = useSelector((state) => 
        state.studyDelete
    );
    const { loading, deleteStudyRes } = dataSelector;

    const handleDelete = () => {
        dispatch(deleteStudy(props.id));
    };

    const history = useHistory();

    if(deleteStudyRes?.code === "STUDY_DELETE_SUCCESS"){
        history.push({
            pathname: `/dashboard/${props.parent}`,
            state: {
                message: {
                    'body': deleteStudyRes.message
                },
                openSnackbar: true
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
                    props.isAuthor &&
                    <IconButton
                        onClick={handleToggle}
                        sx={{
                            position:"absolute",
                            right: 5,
                            top: 5
                        }}
                    >
                        <DeleteIcon color="error"/>
                    </IconButton>
                }

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={openBackdrop}
                    onClick={handleClose}
                >
                    <div className="StudyCard_confirmation">
                        <Typography variant="h6">Study Deletion</Typography>
                        <p>Are you sure you want to delete <i>{props.title}</i>? This cannot be undone.</p>
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
                {props.method}
            </div>
            
            <div className="StudyCard_desc">
                {props.description}
            </div>
            <Button 
                onClick={()=>props.HandleSelected(props.id)}
                variant="outlined"
                color="secondary"
            >View Study
            </Button>
            
        </div>
    ); 
}