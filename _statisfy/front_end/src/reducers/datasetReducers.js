import { 
    DATASET_FILE_FAIL,
    DATASET_FILE_REQUEST,
    DATASET_FILE_SUCCESS,
    DATASET_PROCESS_FAIL,
    DATASET_PROCESS_REQUEST, 
    DATASET_PROCESS_SUCCESS, 
    STUDY_DATASET_FAIL, 
    STUDY_DATASET_REQUEST,
    STUDY_DATASET_SUCCESS
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

export const getDatasetReducers = (state={datasetFile:[]}, action) => {
    switch(action.type){
        case DATASET_FILE_REQUEST:
            return {loading: true};
        
        case DATASET_FILE_SUCCESS:
            return {loading: false, datasetFile: action.payload};
        
        case DATASET_FILE_FAIL:
            return {loading: false, error: action.payload};
        
        default:
            return state
    }
}

export const getStudyDatasetReducers = (state={studyDatasetFile:[]}, action) => {
    switch(action.type){
        case STUDY_DATASET_REQUEST:
            return {loading: true};
        
        case STUDY_DATASET_SUCCESS:
            return {loading: false, studyDatasetFile: action.payload};
        
        case STUDY_DATASET_FAIL:
            return {loading: false, error: action.payload};
        
        default:
            return state
    }
}