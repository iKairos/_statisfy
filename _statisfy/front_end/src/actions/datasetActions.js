import Axios from "axios";
import { 
    DATASET_PROCESS_FAIL,
    DATASET_PROCESS_REQUEST, 
    DATASET_PROCESS_SUCCESS } 
from "../constants/datasetConstants";

export const processDataset = (file, delimiter) => async(dispatch) =>{
    dispatch({
        type:DATASET_PROCESS_REQUEST
    });

    try{
        const {data} = await Axios.post(`/api/dataset/process/delimiter=${delimiter}`, file);

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