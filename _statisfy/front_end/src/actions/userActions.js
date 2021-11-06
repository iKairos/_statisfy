import { 
    USER_DATA_FAIL, 
    USER_DATA_REQUEST, 
    USER_DATA_SUCCESS, 
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_TOKEN_PROCESS_FAIL, 
    USER_TOKEN_PROCESS_REQUEST, 
    USER_TOKEN_PROCESS_SUCCESS
} from "../constants/userConstants";

import Axios from 'axios';

export const getUser = (uid) => async(dispatch) => {
    dispatch({
        type:USER_DATA_REQUEST
    });

    try{
        const {data} = await Axios.get(`/api/user/${uid}`);

        dispatch({
            type: USER_DATA_SUCCESS, 
            payload: data.user
        });
    }catch(error){
        dispatch({
            type:USER_DATA_FAIL,
            payload:error.message
        });
    }
}

export const authenticateUser = (username, password) => async(dispatch) => {
    dispatch({
        type:USER_LOGIN_REQUEST
    });

    try{
        const {data} = await Axios.post('/api/login', {'username': username, 'password': password});

        dispatch({
            type: USER_LOGIN_SUCCESS, 
            payload: data
        });
    }catch(error){
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.message
        });
    }
}

export const processUserToken = (token) => async(dispatch) => {
    dispatch({
        type:USER_TOKEN_PROCESS_REQUEST
    });

    try{
        const {data} = await Axios.get(`/api/user/token/decode/${token}`)

        dispatch({
            type: USER_TOKEN_PROCESS_SUCCESS, 
            payload: data
        });
    }catch(error){
        dispatch({
            type:USER_TOKEN_PROCESS_FAIL,
            payload:error.message
        });
    }
}