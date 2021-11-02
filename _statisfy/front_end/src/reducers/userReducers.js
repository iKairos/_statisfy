import { USER_DATA_FAIL, USER_DATA_REQUEST, USER_DATA_SUCCESS } from "../constants/userConstants";

export const userDataReducers = (state={userData:[]}, action) => {
    switch(action.type){
        case USER_DATA_REQUEST:
            return {loading: true};
        
        case USER_DATA_SUCCESS:
            return {loading: false, userData: action.payload};
        
        case USER_DATA_FAIL:
            return {loading: false, error: action.payload};
        
        default:
            return state
    }
}