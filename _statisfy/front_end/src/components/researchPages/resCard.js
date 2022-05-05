import "../../StyleSheets/NewCSSFiles/UserProfileFolder/ResearchList.css";
import { Divider } from "@mui/material";
import React, { useState } from "react";
import { IconButton, Button, Typography, Snackbar, Alert, CircularProgress} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { deleteResearch, getResearches } from "../../actions/researchAction";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { makeStyles } from "@mui/styles";
const buttonStyles = makeStyles ({
    field:{
      backgroundColor: "black",
      borderRadius: '0.25rem'
    },
    btn:{
      borderRadius: '0.25rem',
      border: '2px solid #7051b8',
      width:'15rem',
      height:'2.5rem',
      color:'#7051b8',
      fontWeight:'500',
      backgroundColor: 'white'
    },
    icon:{
        color:'#7051b8',
    }
})

export default function ResCard(props){
    const ButtonClasses = buttonStyles();
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
        <div className ="ResearchList_List_Card">
             <div className ="ResearchList_List_Card_title">
                <h5 className = "ResearchText_title">
                    {props.title}
                </h5>
                <div className ="ResearchList_List_Card_date">
                    <p className = "ResearchText_instruction">
                        {stringifyDatetime(props.created_at)}
                    </p>
                   
                </div>
                
            


            
            
            <div className ="ResearchList_List_Card_description">
                <p className = "ResearchText_instruction">
                    {props.description}
                </p>
                
                <div className ="ResearchList_List_Card_footer">
                

                {
                    props.editable ?
                    loading ? <CircularProgress color="secondary" thickness={2.5} size={30}/> :
                    <IconButton
                        onClick={handleToggle}
                        variant='outlined'
                    >
                        <DeleteIcon className={ButtonClasses.icon}/>
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
                <Button 
                    onClick={()=>props.HandleSelected(props._id)}
                    className={ButtonClasses.btn}
                    color="secondary"
                    variant="outlined"
                >View Research
                </Button>
             </div>
            </div>

            
            </div>
            
            
            
        </div>
    ); 
}