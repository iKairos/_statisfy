import { USER_DATA_FAIL, USER_DATA_REQUEST, USER_DATA_SUCCESS } from "../constants/userConstants"
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