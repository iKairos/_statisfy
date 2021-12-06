import { 
    RESEARCH_GET_FAIL,
    RESEARCH_GET_REQUEST,
    RESEARCH_GET_SUCCESS,
    RESEARCH_SAVE_FAIL,
    RESEARCH_SAVE_REQUEST, 
    RESEARCH_SAVE_SUCCESS 
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