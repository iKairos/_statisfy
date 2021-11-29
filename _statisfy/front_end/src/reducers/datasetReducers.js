import { 
    DATASET_PROCESS_FAIL,
    DATASET_PROCESS_REQUEST, 
    DATASET_PROCESS_SUCCESS 
} from "../constants/datasetConstants";

export const processDatasetReducers = (state={datasetDetails:[]}, action) => {
    switch(action.type){
        case DATASET_PROCESS_REQUEST:
            return {loading: true};
        
        case DATASET_PROCESS_SUCCESS:
            return {loading: false, datasetDetails: action.payload};
        
        case DATASET_PROCESS_FAIL:
            return {loading: false, error: action.payload};
        
        default:
            return state
    }
}