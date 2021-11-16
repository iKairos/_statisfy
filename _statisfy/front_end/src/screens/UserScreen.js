
import "../StyleSheets/dashboard.css";

import UserProfile from "../components/UserProfile";
import Research from "../components/Research";
import { Redirect } from "react-router";
import { processUserToken } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function UserScreen(props){
    const dispatch = useDispatch();
    const dataSelector = useSelector((state) => 
        state.decodedUserToken
    );
    const {loading, error, processed} = dataSelector;

    if(props.token && processed?.code === "TOKEN_FAIL"){
        localStorage.removeItem('token');
    }

    useEffect(() => {
        dispatch(processUserToken(props.token));
    }, [])

    if(processed?.code === 'TOKEN_SUCCESS'){
        return(
            <div>
                <div className = "container">
                    <UserProfile user={processed?.user} />
                </div>
                
            </div>
        )
    }else if(processed?.code === 'TOKEN_FAIL'){
        return(
            <Redirect to={{pathname: "/signIn", message: "You need to log in to access this page. Please log in first or create an account using the Sign Up page."}}></Redirect>
        )
    }else{
        return(
            <p></p>
        );
    }
}
