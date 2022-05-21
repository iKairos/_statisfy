
import { useState } from "react";
import { Typography, Avatar, Button, Grow, Alert, AlertTitle, InputAdornment, MenuItem, CircularProgress } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import { updateUser } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import MailIcon from '@mui/icons-material/Mail';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import EditIcon from '@mui/icons-material/Edit';
import "../../StyleSheets/NewCSSFiles/UserProfileFolder/UserProfile.css";
import { makeStyles } from '@mui/styles';
import ResearchList from "../newDashBoard/ResearchList";


const useStyles = makeStyles ({
    icon:{
        color:'#7051b8',
    }
})

export default function UserProfileSection(props){
    const classes = useStyles();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const [newUsername, setNewUsername] = useState(props.user.username);
    const [newFirstName, setNewFirstName] = useState(props.user.first_name);
    const [newLastName, setNewLastName] = useState(props.user.last_name);
    const [newEmail, setNewEmail] = useState(props.user.email_address);
    const [newEduc, setNewEduc] = useState(props.user.educ_level);
    const [newOccupation, setNewOccupation] = useState(props.user.occupation);
    const [newMajor, setNewMajor] = useState(props.user.major)
    const [newBio, setNewBio] = useState(props.user.bio);

    const [message, setMessage] = useState();
    const [messageTitle, setMessageTitle] = useState();

    const handleToggle = () => {
        setOpen(!open);
        setMessageTitle("");
        setMessage("");
    };

    const handleSave = () => {
        const formData = new FormData();
        formData.append("_id", props.user._id);
        formData.append("username", newUsername);
        formData.append("first_name", newFirstName);
        formData.append("last_name", newLastName);
        formData.append("email_address", newEmail);
        formData.append("education", newEduc);
        formData.append("major", newMajor);
        formData.append("occupation", newOccupation);
        formData.append("bio", newBio);

        dispatch(updateUser(formData));

        setMessageTitle("Changes saved successfully!");
        setMessage("Profile changes have been saved. You may now press cancel or still tweak some information!");

        return;
    };

    const matches = useMediaQuery('(min-width:900px)');
    const stringifyDatetime = datetime => {
        const d = new Date(datetime).toLocaleString('en-US', {
            timeZone: 'Asia/Manila'
            });
        return d
    }

    const userUpdateSelector = useSelector((state) =>
        state.userUpdate
    );

    const { loading, updateRes } = userUpdateSelector;

    return(
        <div className = "UserProfile_Details_Container">
           <div className="UserProfile_Details">
                    <h6 className= "ProfileText_detailsHeader"><QuestionAnswerIcon className={classes.icon} color="secondary" fontSize="small"/> BIO</h6>
                    <p className= "ProfileText_detailsContent">
                        {newBio != null ? newBio : '-'}
                    </p>

                    <h6 className= "ProfileText_detailsHeader"><LightbulbIcon className={classes.icon} color="secondary" fontSize="small"/> ABOUT</h6>
                    <p className= "ProfileText_detailsContent">
                        <b>Full Name: </b>  {newFirstName} {newLastName} 
                    </p>
                    <p className= "ProfileText_detailsContent">
                        <b>Email: </b> {newEmail}
                    </p>
                    <p className= "ProfileText_detailsContent">
                        <b>Contact:</b> 
                    </p>
                    <p className= "ProfileText_detailsContent">
                        <b>Birthday:</b> 
                    </p>
                    <p className= "ProfileText_detailsContent">
                        <b>Gender:</b> 
                    </p>

                    <h6 className= "ProfileText_detailsHeader"><SchoolIcon className={classes.icon} color="secondary" fontSize="small"/> BACKGROUND</h6>
                    <p className= "ProfileText_detailsContent">
                        <b>Education:</b> {newEduc != null ? newEduc : '-'}
                    </p>
                    <p className= "ProfileText_detailsContent">
                        <b>Specialization:</b> {newMajor != null ? newMajor : '-'}
                    </p>
                    <p className= "ProfileText_detailsContent">
                        <b>Occupation:</b> {newOccupation != null ? newOccupation : '-'}
                    </p>
           </div>
           <div className="UserProfile_Details">
                <h6 className= "ProfileText_detailsHeader"><QuestionAnswerIcon className={classes.icon} color="secondary" fontSize="small"/> OVERVIEW</h6>
                <p className= "ProfileText_detailsContent">
                    <b>Datasets Uploaded: 15</b> 
                </p>
                <p className= "ProfileText_detailsContent">
                    <b>Study Conducted: 40</b> 
                </p>
                
           </div>
            
            
        </div>
    ); 
}