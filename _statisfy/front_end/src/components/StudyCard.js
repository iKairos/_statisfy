
import "../StyleSheets/NewCSSFiles/StudyFolder/StudySection.css"
import { useState } from "react";
import { IconButton, Button, Typography, CircularProgress} from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { deleteStudy } from "../actions/researchAction";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { makeStyles } from '@mui/styles';

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
    }
  })

export default function StudyCard(props){

    const ButtonClasses = ButtonStyles();
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
            <h6 className="StudyText_cardHeader">
                {props.title}
            </h6>
            <h6 className="StudyText_cardMethod"> 
                {props.method}
            </h6>
                

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
            
            <p className="StudyText_cardDetails">
                {props.description}
            </p>
            <div className="StudyCard_footer">
                <Button 
                    onClick={()=>props.HandleSelected(props.id)}
                    variant="outlined"
                    color="secondary"
                    className={ButtonClasses.btn}
                >View Study
                </Button>
                {
                    props.isAuthor ?
                    loading ? <CircularProgress color="secondary" thickness={2.5} size={30}/> 
                    :
                    <IconButton
                        onClick={handleToggle}
                    >
                        <DeleteIcon color="secondary" className={ButtonClasses.icons}/>
                    </IconButton>
                    : null
                }
            </div>
            
            
        </div>
    ); 
}