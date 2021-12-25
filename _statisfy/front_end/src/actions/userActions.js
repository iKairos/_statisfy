import { 
    USER_DATA_FAIL, 
    USER_DATA_REQUEST, 
    USER_DATA_SUCCESS, 
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_REGISTER_FAIL, 
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS, 
    USER_TOKEN_PROCESS_FAIL, 
    USER_TOKEN_PROCESS_REQUEST, 
    USER_TOKEN_PROCESS_SUCCESS
} from "../constants/userConstants";

import Axios from 'axios';
import { getResearch, getResearches } from "./researchAction";

export const getUser = (uid) => async(dispatch) => {
    dispatch({
        type:USER_DATA_REQUEST
    });

    try{
        const {data} = await Axios.get(`/api/user/fetch/${uid}`);

        dispatch({
            type: USER_DATA_SUCCESS, 
            payload: data
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

export const registerUser = (data) => async(dispatch) => {
    dispatch({
        type:USER_REGISTER_REQUEST
    });

    try{
        await Axios.post('/api/user/new', {
            'first_name': data['first_name'],
            'middle_name': data['middle_name'],
            'last_name': data['last_name'],
            'username': data['username'],
            'password': data['password'],
            'email_address': data['email_address'],
            'created_at': data['created_at']
        }).then(res => {
            dispatch({
                type: USER_REGISTER_SUCCESS, 
                payload: res?.data
            });
        });
    }catch(error){
        dispatch({
            type:USER_REGISTER_FAIL,
            payload:error.message
        });
    }
}

export const processUserToken = (token, args) => async(dispatch) => {
    dispatch({
        type:USER_TOKEN_PROCESS_REQUEST
    });

    try{
        const {data} = await Axios.get(`/api/user/token/decode/${token}`);

        if(args === 'getResearches'){
            dispatch(getResearches(data.user._id));
        }

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