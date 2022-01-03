import ResearchList from "./newDashBoard/ResearchList";
import { useState } from "react";
import "../StyleSheets/profilefolder/profile.css"
import { Typography, Avatar, Button } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';

export default function UserProfile(props){
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    const matches = useMediaQuery('(min-width:900px)');
    const stringifyDatetime = datetime => {
        const d = new Date(datetime).toLocaleString('en-US', {
            timeZone: 'Asia/Manila'
            });

        //return `${d.getMonth()}/${d.getDay()}/${d.getFullYear()} ${d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
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
                                {props.user.username}
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
                    <Typography variant="overline" display="block" gutterBottom>EMAIL :</Typography>
                    <Typography variant="body2" display="block" gutterBottom>{props.user.email_address}</Typography>
                </div>

                <div className="profile_content"> 
                    <Typography variant="overline" display="block" gutterBottom>EDUCATION :</Typography>
                    <Typography variant="body2" display="block" gutterBottom>unibersidad placeholder</Typography>
                </div>

                <div className="profile_content"> 
                    <Typography variant="overline" display="block" gutterBottom>PROFESSION:</Typography>
                    <Typography variant="body2" display="block" gutterBottom>labandera</Typography>
                </div>

                <div className="profile_content"> 
                    <Typography variant="overline" display="block" gutterBottom>JOINED:</Typography>
                    <Typography variant="body2" display="block" gutterBottom>{stringifyDatetime(props.user.created_at)}</Typography>
                </div>

                <div className="profile_content"> 
                    <Typography variant="overline" display="block" gutterBottom>BIO:</Typography>
                    <Typography variant="body2" display="block" gutterBottom>{props.user.bio} placeholder</Typography>
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
                            <div className="profile_content"> 
                                <Typography variant="overline" display="block" gutterBottom>UserName :</Typography>
                                <Typography variant="body2" display="block" gutterBottom>{props.user.username}</Typography>
                            </div>
                            <div className="profile_content"> 
                                <Typography variant="overline" display="block" gutterBottom>fullname :</Typography>
                                <Typography variant="body2" display="block" gutterBottom>{props.user.first_name} {props.user.last_name} </Typography>
                            </div>
                            <div className="profile_content"> 
                                <Typography variant="overline" display="block" gutterBottom>EMAIL :</Typography>
                                <Typography variant="body2" display="block" gutterBottom>{props.user.email_address}</Typography>
                            </div>

                            <div className="profile_content"> 
                                <Typography variant="overline" display="block" gutterBottom>JOINED:</Typography>
                                <Typography variant="body2" display="block" gutterBottom>{stringifyDatetime(props.user.created_at)}</Typography>
                            </div>

                            <div className="profile_content"> 
                                <TextField id="standard-basic" label="EDUCATION" variant="standard" color="secondary" />
                                <TextField id="standard-basic" label="PROFESSION" variant="standard" color="secondary" />
                                <TextField
                                    id="standard-multiline-static"
                                    label="BIO"
                                    multiline
                                    rows={4}
                                    defaultValue={props.user.bio} 
                                    variant="standard"
                                    color="secondary" 
                                />
                            </div>
                            <div>
                                <Button onClick={handleToggle} color="secondary">Cancel</Button>
                                <Button color="secondary">Save</Button>
                            </div>
                        </div>
                        
                        
                    </div>
                </Backdrop>
               
            </div>
            
            
        </div>
    ); 
}