import Axios  from 'axios';
import {
    TOKEN_EXPIRE_FAIL,
    TOKEN_EXPIRE_REQUEST, 
    TOKEN_EXPIRE_SUCCESS
} from '../constants/tokenConstants';

export const expireToken = (token) => async(dispatch) => {
    dispatch({
        type: TOKEN_EXPIRE_REQUEST
    });

    try{
        const {data} = await Axios.get(`/api/user/token/expire/${token}`);

        dispatch({
            type: TOKEN_EXPIRE_SUCCESS, 
            payload: data
        });
    }catch(error){
        dispatch({
            type: TOKEN_EXPIRE_FAIL,
            payload:error.message
        });
    }
}