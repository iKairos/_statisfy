import ResearchList from "./newDashBoard/ResearchList";
import { useState } from "react";
import "../StyleSheets/profilefolder/profile.css"
import { Typography, Avatar, Button, Grow, Alert, AlertTitle, InputAdornment } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import { updateUser } from "../actions/userActions";
import { useDispatch } from "react-redux";
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

export default function UserProfile(props){
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
        setMessageTitle("");
        setMessage("");
    };

    const [newUsername, setNewUsername] = useState(props.user.username);
    const [newEmail, setNewEmail] = useState(props.user.email_address);
    const [newEduc, setNewEduc] = useState(props.user.educ_level);
    const [newOccupation, setNewOccupation] = useState(props.user.occupation);
    const [newMajor, setNewMajor] = useState(props.user.major)
    const [newBio, setNewBio] = useState(props.user.bio);

    const [message, setMessage] = useState();
    const [messageTitle, setMessageTitle] = useState();

    const handleSave = () => {
        const formData = new FormData();
        formData.append("_id", props.user._id);
        formData.append("username", newUsername);
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
    return(
        <div className = "profile">
            <div className="profile_avatar_container">
                <div className="profile_avatar">
                    <div className="profile_avatar_icon">
                        <Avatar
                            alt= {props.user.first_name}
                            sx={{ width: 128, height: 128 }}
                        />
                    </div>
                    
                    <div className="profile_name">
                        <div className="profile_name_container">
                            <Typography 
                                variant ="h5" 
                                sx={{ fontWeight: 700}} 
                                display="block" 
                                gutterBottom
                                color="white"
                            >
                                {newUsername}
                            </Typography>
                        </div>
                        <div className="profile_name_container">
                            <Typography 
                                variant ="h6" 
                                sx={{ padding: 0, margin: 0}} 
                                display="block" gutterBottom
                                color="white"
                            >
                                {props.user.first_name} {props.user.last_name} 
                            </Typography>
                            <Typography variant="overline" display="block" gutterBottom color="white"> FULLNAME</Typography>
                        </div>
                        </div>
                    </div>
                </div>
           
            <div className="profile_details">
            
                {matches
                    ? <Button 
                        variant="outlined" 
                        color="secondary" 
                        sx={{
                            borderRadius: "5rem", 
                            position: "absolute", 
                            right:"2rem"}}
                        onClick={handleToggle}
                        >Edit Profile
                    </Button>
                    : (
                        <div style={{display:"flex", justifyContent:"center"}}>
                            <Button 
                                variant="outlined" 
                                color="secondary" 
                                sx={{borderRadius: "5rem"}}
                                onClick={handleToggle}
                                >Edit Profile
                            </Button>
                        </div>
                    )
                }

               
                <div className="profile_content"> 
                    <Typography variant="overline" display="block" gutterBottom><MailIcon color="secondary" fontSize="small"/> EMAIL :</Typography>
                    <Typography variant="body2" display="block" gutterBottom>{newEmail}</Typography>
                </div>

                <div className="profile_content"> 
                    <Typography variant="overline" display="block" gutterBottom><EventNoteIcon color="secondary" fontSize="small"/> JOINED:</Typography>
                    <Typography variant="body2" display="block" gutterBottom>{stringifyDatetime(props.user.created_at)}</Typography>
                </div>

                <div className="profile_content"> 
                    <Typography variant="overline" display="block" gutterBottom><SchoolIcon color="secondary" fontSize="small"/> EDUCATION LEVEL:</Typography>
                    <Typography variant="body2" display="block" gutterBottom>{props.user.educ_level != null ? newEduc : '-'}</Typography>
                </div>

                <div className="profile_content"> 
                    <Typography variant="overline" display="block" gutterBottom><LightbulbIcon color="secondary" fontSize="small"/> MAJOR:</Typography>
                    <Typography variant="body2" display="block" gutterBottom>{props.user.major != null ? newMajor : '-'}</Typography>
                </div>

                <div className="profile_content"> 
                    <Typography variant="overline" display="block" gutterBottom><WorkIcon color="secondary" fontSize="small"/> OCCUPATION:</Typography>
                    <Typography variant="body2" display="block" gutterBottom>{props.user.occupation != null ? newOccupation : '-'}</Typography>
                </div>

                <div className="profile_content"> 
                    <Typography variant="overline" display="block" gutterBottom><QuestionAnswerIcon color="secondary" fontSize="small"/> BIO:</Typography>
                    <Typography variant="body2" display="block" gutterBottom>{props.user.bio != null ? newBio : '-'}</Typography>
                </div>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <div className = "profile_backdrop">
                        <div className="profile_avatar_container">
                            <div className="profile_avatar">
                                <div className="profile_avatar_icon">
                                    <Avatar
                                        alt= {props.user.first_name}
                                        sx={{ width: 128, height: 128 }}
                                    />
                                </div>
                                
                                <div className="profile_upload">
                                    
                                    <Button
                                        variant="contained"
                                        component="label"
                                        color = "secondary"
                                        >
                                        Upload Avatar
                                        <input
                                            type="file"
                                            hidden
                                        />
                                    </Button>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        color = "secondary"
                                        >
                                        Upload Header
                                        <input
                                            type="file"
                                            hidden
                                        />
                                    </Button>
                                    
                                    
                                </div>
                            </div>
                        </div>
                        <div className="profile_details">

                            {
                                message && 
                                <Grow in={true} {...(true ? { timeout: 500 } : {})}>
                                    <Alert variant="outlined" severity="success">
                                        <AlertTitle><b>{messageTitle}</b></AlertTitle>
                                        { message }
                                    </Alert>
                                </Grow>
                            }
                            <br/>
                            <div className="profile_edit"> 
                            
                            <TextField
                                id="standard-multiline-static"
                                label="USERNAME"
                                defaultValue={props.user.username}
                                variant="standard"
                                onChange={e => setNewUsername(e.target.value)}
                                color="secondary" 
                                InputProps={
                                    {
                                        startAdornment: (
                                            <InputAdornment position="start"> 
                                                <PersonIcon fontSize="medium" color="secondary"/>
                                            </InputAdornment>
                                        )
                                    }
                                }
                            />
                            <TextField
                                id="standard-multiline-static"
                                label="FULLNAME"
                                defaultValue={props.user.last_name + ", " + props.user.first_name}
                                color="secondary" 
                                variant="standard"
                                InputProps={
                                    {
                                        startAdornment: (
                                            <InputAdornment position="start"> 
                                                <BadgeIcon fontSize="medium" color="secondary"/>
                                            </InputAdornment>
                                        )
                                    }
                                }
                            />
                            <TextField
                                id="standard-multiline-static"
                                label="EMAIL ADDRESS"
                                defaultValue={props.user.email_address}
                                color="secondary" 
                                variant="standard"
                                onChange={e => setNewEmail(e.target.value)}
                                InputProps={
                                    {
                                        startAdornment: (
                                            <InputAdornment position="start"> 
                                                <AlternateEmailIcon fontSize="medium" color="secondary"/>
                                            </InputAdornment>
                                        )
                                    }
                                }
                            />
                            <TextField 
                                id="standard-basic" 
                                label="EDUCATION LEVEL" 
                                variant="standard" 
                                color="secondary" 
                                defaultValue={props.user.educ_level}
                                onChange={e => setNewEduc(e.target.value)}
                                InputProps={
                                    {
                                        startAdornment: (
                                            <InputAdornment position="start"> 
                                                <SchoolIcon fontSize="medium" color="secondary"/>
                                            </InputAdornment>
                                        )
                                    }
                                }
                            />
                            <TextField 
                                id="standard-basic" 
                                label="MAJOR" 
                                variant="standard" 
                                color="secondary" 
                                defaultValue={props.user.major}
                                onChange={e => setNewMajor(e.target.value)}
                                InputProps={
                                    {
                                        startAdornment: (
                                            <InputAdornment position="start"> 
                                                <LightbulbIcon fontSize="medium" color="secondary"/>
                                            </InputAdornment>
                                        )
                                    }
                                }
                            />
                            <TextField 
                                id="standard-basic" 
                                label="OCCUPATION" 
                                variant="standard" 
                                color="secondary" 
                                defaultValue={props.user.occupation}
                                onChange={e => setNewOccupation(e.target.value)}
                                InputProps={
                                    {
                                        startAdornment: (
                                            <InputAdornment position="start"> 
                                                <WorkIcon fontSize="small" color="secondary"/>
                                            </InputAdornment>
                                        )
                                    }
                                }
                            />
                            <TextField
                                id="standard-multiline-static"
                                label="BIO"
                                multiline
                                rows={4}
                                defaultValue={props.user.bio} 
                                variant="standard"
                                color="secondary" 
                                onChange={e => setNewBio(e.target.value)}
                            />
                            </div>
                            <div>
                                <Button onClick={handleToggle} color="secondary">Close</Button>
                                <Button onClick={handleSave} color="secondary">Save&nbsp;<SaveAltIcon fontSize="small" color="secondary"/></Button>
                            </div>
                        </div>
                        
                        
                    </div>
                </Backdrop>
               
            </div>
            
            
        </div>
    ); 
}