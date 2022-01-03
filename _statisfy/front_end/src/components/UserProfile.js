import ResearchList from "./newDashBoard/ResearchList";
import "../StyleSheets/profilefolder/profile.css"
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Avatar } from "@mui/material";

export default function UserProfile(props){
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
                <Typography variant="overline" display="block" gutterBottom>UID : {props.user._id}</Typography>
                <Typography variant="overline" display="block" gutterBottom>EMAIL : {props.user.email_address}</Typography>
                
                <Typography variant="overline" display="block" gutterBottom>JOINED: {stringifyDatetime(props.user.created_at)} </Typography>
                <Typography variant="overline" display="block" gutterBottom>bio:{props.user.bio} </Typography>
            
            </div>
            
            
        </div>
    ); 
}