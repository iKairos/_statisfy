import { 
    RESEARCHES_GET_FAIL,
    RESEARCHES_GET_REQUEST,
    RESEARCHES_GET_SUCCESS,
    RESEARCH_GET_FAIL,
    RESEARCH_GET_REQUEST,
    RESEARCH_GET_SUCCESS,
    RESEARCH_SAVE_FAIL,
    RESEARCH_SAVE_REQUEST, 
    RESEARCH_SAVE_SUCCESS, 
    STUDY_GET_FAIL, 
    STUDY_GET_REQUEST,
    STUDY_GET_SUCCESS
} from "../constants/researchConstants";

export const researchSaveReducers = (state={researchSaveRes:{}}, action) => {
    switch(action.type){
        case RESEARCH_SAVE_REQUEST:
            return {loading: true};
        
        case RESEARCH_SAVE_SUCCESS:
            return {loading: false, researchSaveRes: action.payload};
        
        case RESEARCH_SAVE_FAIL:
            return {loading: false, error: action.payload};
        
        default:
            return state
    }
}

export const researchGetReducers = (state={researchGetRes:{}}, action) => {
    switch(action.type){
        case RESEARCH_GET_REQUEST:
            return {loading: true};
        
        case RESEARCH_GET_SUCCESS:
            return {loading: false, researchGetRes: action.payload};
        
        case RESEARCH_GET_FAIL:
            return {loading: false, error: action.payload};
        
        default:
            return state
    }
}

export const researchesGetReducers = (state={researchesGetRes:{}}, action) => {
    switch(action.type){
        case RESEARCHES_GET_REQUEST:
            return {loading: true};
        
        case RESEARCHES_GET_SUCCESS:
            return {loading: false, researchesGetRes: action.payload};
        
        case RESEARCHES_GET_FAIL:
            return {loading: false, error: action.payload};
        
        default:
            return state
    }
}

export const studySaveReducers = (state={saveStudyRes:{}}, action) => {
    switch(action.type){
        case RESEARCH_GET_REQUEST:
            return {loading: true};
        
        case RESEARCH_GET_SUCCESS:
            return {loading: false, saveStudyRes: action.payload};
        
        case RESEARCH_GET_FAIL:
            return {loading: false, error: action.payload};
        
        default:
            return state
    }
}

export const studyGetReducers = (state={getStudyRes:{}}, action) => {
    switch(action.type){
        case STUDY_GET_REQUEST:
            return {loading: true};
        
        case STUDY_GET_SUCCESS:
            return {loading: false, getStudyRes: action.payload};
        
        case STUDY_GET_FAIL:
            return {loading: false, error: action.payload};
        
        default:
            return state
    }
}
