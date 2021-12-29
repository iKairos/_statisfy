import "../StyleSheets/dashboard.css";

import UserProfile from "../components/UserProfile";
import { Redirect, useParams } from "react-router";
import { getUser, processUserToken } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Alert, Grow, Skeleton } from "@mui/material";

import ResearchList from "../components/newDashBoard/ResearchList";

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
        }
    }, [])

    if(props.isUser && processed?.code === 'TOKEN_SUCCESS'){ // no id, logged in, render self profile
        return(
            <div>
                <div className = "container">
                    <UserProfile user={processed.user} editable={true}/>
                    <ResearchList token={processed}/>
                    
                </div> 
            </div>
        )
    }else if(userData?.code === 'USER_FETCH_SUCCESS'){ // provided id, render id profile
        const editable = Number(id) === processed?.user._id;
        return(
            <div>
                <div className = "container">
                    <UserProfile user={userData.user} editable={editable}/>
                    
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
