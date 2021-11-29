import { 
    TOKEN_EXPIRE_FAIL, 
    TOKEN_EXPIRE_REQUEST, 
    TOKEN_EXPIRE_SUCCESS 
} from "../constants/tokenConstants";

export const expireTokenReducers = (state={expireRes:[]}, action) => {
    switch(action.type){
        case TOKEN_EXPIRE_REQUEST:
            return {loading: true};
        
        case TOKEN_EXPIRE_SUCCESS:
            return {loading: false, expireRes: action.payload};
        
        case TOKEN_EXPIRE_FAIL:
            return {loading: false, error: action.payload};
        
        default:
            return state
    }
}