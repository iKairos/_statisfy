import { 
    RESEARCHES_GET_FAIL,
    RESEARCHES_GET_REQUEST,
    RESEARCHES_GET_SUCCESS,
    RESEARCH_DELETE_FAIL,
    RESEARCH_DELETE_REQUEST,
    RESEARCH_DELETE_SUCCESS,
    RESEARCH_GET_FAIL,
    RESEARCH_GET_REQUEST,
    RESEARCH_GET_SUCCESS,
    RESEARCH_SAVE_FAIL,
    RESEARCH_SAVE_REQUEST,
    RESEARCH_SAVE_SUCCESS, 
    STUDY_GET_FAIL, 
    STUDY_GET_REQUEST, 
    STUDY_GET_SUCCESS, 
    STUDY_SAVE_FAIL, 
    STUDY_SAVE_REQUEST,
    STUDY_SAVE_SUCCESS
} from "../constants/researchConstants";

import Axios from 'axios';
import { getDataset } from "./datasetActions";

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

        if(data.code === RESEARCH_GET_SUCCESS){
            dispatch(getDataset(data.data.dataset));
        }

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

export const getResearches = (id) => async(dispatch) => {
    dispatch({
        type:RESEARCHES_GET_REQUEST
    });

    try{
        const {data} = await Axios.post('/api/researches', {_id: id});

        dispatch({
            type: RESEARCHES_GET_SUCCESS, 
            payload: data
        });
    }catch(error){
        dispatch({
            type:RESEARCHES_GET_FAIL,
            payload:error.message
        });
    }
}

export const deleteResearch = (id) => async(dispatch) => {
    dispatch({
        type:RESEARCH_DELETE_REQUEST
    });

    try{
        const {data} = await Axios.post('/api/research/delete', {_id: id});

        dispatch({
            type: RESEARCH_DELETE_SUCCESS, 
            payload: data
        });
    }catch(error){
        dispatch({
            type:RESEARCH_DELETE_FAIL,
            payload:error.message
        });
    }
}

export const saveStudy = (formData) => async(dispatch) => {
    dispatch({
        type:STUDY_SAVE_REQUEST
    });

    try{
        const {data} = await Axios.post('/api/research/study/new', formData);

        dispatch({
            type: STUDY_SAVE_SUCCESS, 
            payload: data
        });
    }catch(error){
        dispatch({
            type:STUDY_SAVE_FAIL,
            payload:error.message
        });
    }
}

export const getStudy = (formData) => async(dispatch) => {
    dispatch({
        type:STUDY_GET_REQUEST
    });

    try{
        const {data} = await Axios.post('/api/research/study/fetch', formData);

        dispatch({
            type: STUDY_GET_SUCCESS, 
            payload: data
        });
    }catch(error){
        dispatch({
            type:STUDY_GET_FAIL,
            payload:error.message
        });
    }
}