
import ResearchList from "../newDashBoard/ResearchList";
import { useState } from "react";
import { Typography, Avatar, Button, Grow, Alert, AlertTitle, InputAdornment, MenuItem, CircularProgress } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';

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

import ProfileHeader from '../../images/Profile/header.png';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles ({
    field:{
      backgroundColor: "black",
      borderRadius: '0.25rem'
    },
    btn:{
      borderRadius: '1.5rem',
      width:'15rem',
      height:'2.5rem',
      color:'white',
      fontWeight:'500',
      backgroundColor: '#7051b8'
    },
    uploadbtn:{
      borderRadius: '1.5rem',
      height:'2.5rem',
      fontWeight:'500',
      fontFamily:'Poppins',
      color: '#7051b8'
    },
    savebtn:{
        borderRadius: '1.5rem',
        height:'2.5rem',
        fontWeight:'500',
        fontFamily:'Poppins',
        color: '#7051b8',
        border: '1px solid #7051b8',
        width: '7rem',
    },
    icon:{
        color:'white',
    },
    saveIcon:{
        color:'#7051b8',
    }
})

export default function UserProfileHeader(props){
    
    
    
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
        <div className = "profile">
            <div className = "UserProfile_Header">
                <img src={ProfileHeader} className = "UserProfile_Header_Banner"/>
                <div className = "UserProfile_Header_User">
                    <h5 className="ProfileText_name">
                        {newUsername}
                    </h5>
                    <h6 className="ProfileText_address">
                        Bicol Estates, Bicolandia 
                    </h6>
                    <h6 className="ProfileText_address">
                        Joined: {stringifyDatetime(props.user.created_at)} GMT +8
                    </h6>
                    {
                        props.editable ? matches
                        ? <Button 
                            variant="contained" 
                            color="secondary" 
                            className={classes.btn}
                            sx={{
                                borderRadius: "5rem", 
                                position: "absolute", 
                                right:"2rem"}}
                            onClick={handleToggle}
                            >
                                <EditIcon className={classes.icon} color="secondary" fontSize="small"/> &nbsp; Edit Profile
                        </Button>
                        : (
                            <div style={{display:"flex", justifyContent:"center"}}>
                                <Button
                                    variant="contained" 
                                    color="secondary" 
                                    className={classes.btn}
                                    sx={{borderRadius: "5rem"}}
                                    onClick={handleToggle}
                                    >
                                        <EditIcon className={classes.icon} color="secondary" fontSize="small"/> &nbsp; Edit Profile
                                </Button>
                            </div>
                        ) : null
                    }
                </div>

                <div className = "UserProfile_Header_Avatar">
                        <Avatar
                            alt= {props.user.first_name}
                            sx={{ width: 128, height: 128 }}
                        />
                </div>
            </div>
            
            <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <div className = "EditInfo">
                        <div className = "EditInfo_Upload">
                            <h6 className="ProfileText_name">Profile Picture</h6>
                            <div className="EditInfo_icon">
                                <Avatar
                                    alt= {props.user.first_name}
                                    sx={{ width: 128, height: 128 }}
                                />
                            </div>
                            <div className = "EditInfo_editbtn">
                                <Button
                                    className={classes.uploadbtn}
                                >
                                    Upload
                                    <input
                                        type="file"
                                        hidden
                                    />
                                </Button>
                            </div>
                            
                        </div>

                        <div className = "EditInfo_Upload">
                            <h6 className="ProfileText_name">Header Picture</h6>
                            <div className="EditInfo_header">
                               <CardMedia
                                component="img"
                                height="194"
                                image={ProfileHeader}
                                alt="Paella dish"
                                />
                            </div>
                            <div className = "EditInfo_editbtn">
                                <Button
                                    className={classes.uploadbtn}
                                >
                                    Upload
                                    <input
                                        type="file"
                                        hidden
                                    />
                                </Button>
                            </div>
                        </div>

                        <div className = "EditInfo_Info">
                            <h6 className="ProfileText_name">Bio</h6>
                            <TextField
                                id="standard-multiline-static"
                                hiddenLabel
                                multiline
                                fullWidth
                                rows={4}
                                defaultValue={props.user.bio === "null"? "Add Bio": props.user.bio} 
                                variant="standard"
                                color="secondary" 
                                onChange={e => setNewBio(e.target.value)}
                            />
                        </div>

                        <div className = "EditInfo_Info">
                            {
                                updateRes?.code === "USER_UPDATE_SUCCESS" && message ?
                                <Grow in={true} {...(true ? { timeout: 500 } : {})}>
                                    <Alert variant="outlined" severity="success">
                                        <AlertTitle><b>{messageTitle}</b></AlertTitle>
                                        { message }
                                    </Alert>
                                </Grow>
                                : null
                            }
                            <br/>
                            <h6 className="ProfileText_name">About</h6>

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

                            <div className="EditInfo_info_name">
                                <TextField
                                    id="standard-multiline-static"
                                    label="SURNAME"
                                    defaultValue={props.user.last_name}
                                    variant="standard"
                                    onChange={e => setNewLastName(e.target.value)}
                                    color="secondary" 
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
                                    label="GIVEN NAME"
                                    defaultValue={props.user.first_name}
                                    variant="standard"
                                    onChange={e => setNewFirstName(e.target.value)}
                                    color="secondary" 
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
                                
                            </div>

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
                            


                        </div>

                        <div className = "EditInfo_Info">
                            <h6 className="ProfileText_name">Bio</h6>
                            <TextField 
                                id="standard-basic" 
                                label="EDUCATION LEVEL" 
                                select
                                variant="standard" 
                                color="secondary" 
                                value={newEduc}
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
                            >
                                    <MenuItem value={"Doctorate degree"}>Doctorate degree</MenuItem>
                                    <MenuItem value={"Master's degree"}>Master's degree</MenuItem>
                                    <MenuItem value={"Bachelor's degree"}>Bachelor's degree</MenuItem>
                                    <MenuItem value={"Associate degree"}>Associate degree</MenuItem>
                                    <MenuItem value={"Secondary / Senior High School"}>Secondary / Senior High School</MenuItem>
                                    <MenuItem value={"Junior / Junior High School / Middle School"}>Junior / Junior High School / Middle School</MenuItem>
                                    <MenuItem value={"Elementary school"}>Elementary school</MenuItem>
                                    <MenuItem value={"No formal education"}>No formal education</MenuItem>
                                    <MenuItem value={"Other education"}>Other education</MenuItem>
                            </TextField>
                            <TextField 
                                id="standard-basic" 
                                label="MAJOR / SPECIALIZATION" 
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
                                helperText="Preferably in the format: <Occupation> at <Organization Name>"
                            />
                        </div>
                        <div className="EditInfo_Save">
                            <Button className={classes.savebtn} onClick={handleToggle} color="secondary">Close</Button>
                            {
                                loading ? <CircularProgress color="secondary" thickness={2.5} size={30}/> :  
                                <Button className={classes.savebtn}  onClick={handleSave} color="secondary">Save&nbsp;<SaveAltIcon fontSize="small" className={classes.saveIcon}/></Button>
                            }
                        </div>
                    </div>
                </Backdrop>
               
        </div>
            
            
    ); 
}