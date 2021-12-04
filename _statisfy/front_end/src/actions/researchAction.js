import { 
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