import "../StyleSheets/NewCSSFiles/UserProfileFolder/UserProfile.css";

import UserProfile from "../components/UserProfile";
import UserProfileHeader from "../components/UserProfileComponents/UserProfileHeader";
import UserProfileSection from "../components/UserProfileComponents/UserProfileSection";
import { Redirect, useParams } from "react-router";
import { getUser, processUserToken } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Alert, Grow, Skeleton } from "@mui/material";

import ResearchList from "../components/newDashBoard/ResearchList";
import { getResearches } from "../actions/researchAction";

export default function UserScreen(props){
    const { id } = useParams();
    const dispatch = useDispatch();

    // Process Token
    const dataSelector = useSelector((state) => 
        state.decodedUserToken
    );
    // Fetch User
    const userSelector = useSelector((state) =>
        state.users
    );
    const {processed} = dataSelector;
    const {loading, error, userData} = userSelector;

    if(props.token && processed?.code === "TOKEN_FAIL"){
        localStorage.removeItem('token');
    }

    useEffect(() => {
        dispatch(processUserToken(props.token));

        if(id){
            dispatch(getUser(id));
            dispatch(getResearches(id));
        }
    }, [])

    if(props.isUser && processed?.code === 'TOKEN_SUCCESS'){ // no id, logged in, render self profile
        return(
            <div className="UserProfile">
                    <UserProfileHeader user={processed.user} editable={true}/>
                    <div className="UserProfile_Section">
                        <UserProfileSection user={processed.user} editable={true}/>
                        <ResearchList editable={true}/>
                    </div>
                    
            </div>
        )
    }else if(userData?.code === 'USER_FETCH_SUCCESS'){ // provided id, render id profile
        const editable = id === processed?.user._id;
        return(
            <div className="UserProfile">
                    <UserProfileHeader user={userData.user} editable={editable}/>
                <div className="UserProfile_Section">
                    
                    <UserProfileSection user={userData.user} editable={editable}/>
                    <ResearchList editable={editable} id={id} first_name={userData.user.first_name}/>
                </div>
                
            </div>
        )
    }else if(userData?.code === 'USER_NOT_EXIST'){
        return <h1>User does not exist...</h1>
    }else if(processed?.code === 'TOKEN_FAIL'){
        return(
            <Redirect to={{pathname: "/signIn", message: "You need to log in to access this page. Please log in first or create an account using the Sign Up page."}}></Redirect>
        )
    }else if(typeof processed === 'string'){
        return(
            <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                <Alert variant="outlined" severity="error">Request from server returned an error status 500. The server might be offline or down, please try again later.</Alert>
            </Grow>
        )
    }else{
        return(
            <>
                <Skeleton variant="circular" width={100} height={100} animation="wave"/>
                <Skeleton variant="text" width={300} height={40} animation="wave"/>
                <Skeleton variant="text" width={400} height={40} animation="wave"/>
                <Skeleton variant="text" width={500} height={40} animation="wave"/>
                <Skeleton variant="rectangular" width={500} height={350} animation="wave" />
            </>
        );
    }
}
