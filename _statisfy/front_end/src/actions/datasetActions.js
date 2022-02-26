import Axios from "axios";
import { 
    DATASET_FILE_FAIL,
    DATASET_FILE_REQUEST,
    DATASET_FILE_SUCCESS,
    DATASET_PROCESS_FAIL,
    DATASET_PROCESS_REQUEST, 
    DATASET_PROCESS_SUCCESS, 
    STUDY_DATASET_FAIL, 
    STUDY_DATASET_REQUEST,
    STUDY_DATASET_SUCCESS} 
from "../constants/datasetConstants";

export const processDataset = (formData) => async(dispatch) =>{
    dispatch({
        type:DATASET_PROCESS_REQUEST
    });

    try{
        const {data} = await Axios.post('/api/dataset/process', formData);

        dispatch({
            type: DATASET_PROCESS_SUCCESS, 
            payload: data
        });
    }catch(error){
        dispatch({
            type:DATASET_PROCESS_FAIL,
            payload:error.message
        });
    }
}

export const getDataset = (file, columns) => async(dispatch) => {
    dispatch({
        type:DATASET_FILE_REQUEST
    });

    try{
        let cols = columns;
        if(typeof columns === 'undefined'){
            cols = 'nocols';
        }
        const {data} = await Axios.get(`/api/dataset/get/${file}/${cols}`);

        dispatch({
            type: DATASET_FILE_SUCCESS, 
            payload: data
        });
    }catch(error){
        dispatch({
            type:DATASET_FILE_FAIL,
            payload:error.message
        });
    }
}

export const getStudyDataset = (file) => async(dispatch) => {
    dispatch({
        type:STUDY_DATASET_REQUEST
    });

    try{
        const {data} = await Axios.get(`/api/dataset/study/get/${file}`);

        dispatch({
            type: STUDY_DATASET_SUCCESS, 
            payload: data
        });
    }catch(error){
        dispatch({
            type:STUDY_DATASET_FAIL,
            payload:error.message
        });
    }
}