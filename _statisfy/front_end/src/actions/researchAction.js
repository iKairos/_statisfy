import { 
    RESEARCH_GET_FAIL,
    RESEARCH_GET_REQUEST,
    RESEARCH_GET_SUCCESS,
    RESEARCH_SAVE_FAIL,
    RESEARCH_SAVE_REQUEST,
    RESEARCH_SAVE_SUCCESS 
} from "../constants/researchConstants";

import Axios from 'axios';

export const saveResearch = (research) => async(dispatch) => {
    dispatch({
        type:RESEARCH_SAVE_REQUEST
    });

    try{
        const {data} = await Axios.post('/api/research/new', research);

        dispatch({
            type: RESEARCH_SAVE_SUCCESS, 
            payload: data
        });
    }catch(error){
        dispatch({
            type:RESEARCH_SAVE_FAIL,
            payload:error.message
        });
    }
}

export const getResearch = (id) => async(dispatch) => {
    dispatch({
        type:RESEARCH_GET_REQUEST
    });

    try{
        const {data} = await Axios.get(`/api/research/${id}`);

        dispatch({
            type: RESEARCH_GET_SUCCESS, 
            payload: data
        });
    }catch(error){
        dispatch({
            type:RESEARCH_GET_FAIL,
            payload:error.message
        });
    }
}