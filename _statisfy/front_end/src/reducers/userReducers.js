import { 
    USER_DATA_FAIL, 
    USER_DATA_REQUEST,
     USER_DATA_SUCCESS, 
     USER_LOGIN_REQUEST, 
     USER_LOGIN_SUCCESS, 
     USER_LOGIN_FAIL, 
     USER_TOKEN_PROCESS_REQUEST,
     USER_TOKEN_PROCESS_SUCCESS,
     USER_TOKEN_PROCESS_FAIL,
     USER_REGISTER_REQUEST,
     USER_REGISTER_SUCCESS,
     USER_REGISTER_FAIL,
     USER_UPDATE_REQUEST,
     USER_UPDATE_SUCCESS,
     USER_UPDATE_FAIL
} from "../constants/userConstants";

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

export const userLoginReducers = (state={userAuth:[]}, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading: true};
        
        case USER_LOGIN_SUCCESS:
            return {loading: false, userAuth: action.payload};
        
        case USER_LOGIN_FAIL:
            return {loading: false, error: action.payload};
        
        default:
            return state
    }
}

export const userRegisterReducers = (state={registerRes:[]}, action) => {
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading: true};
        
        case USER_REGISTER_SUCCESS:
            return {loading: false, registerRes: action.payload};
        
        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload};
        
        default:
            return state
    }
}

export const processTokenReducers = (state={decodedUserToken:[]}, action) => {
    switch(action.type){
        case USER_TOKEN_PROCESS_REQUEST:
            return {loading: true};
        
        case USER_TOKEN_PROCESS_SUCCESS:
            return {loading: false, processed: action.payload};
        
        case USER_TOKEN_PROCESS_FAIL:
            return {loading: false, error: action.payload};
        
        default:
            return state
    }
}

export const userUpdateReducers = (state={userUpdateRes:[]}, action) => {
    switch(action.type){
        case USER_UPDATE_REQUEST:
            return {loading: true};
        
        case USER_UPDATE_SUCCESS:
            return {loading: false, updateRes: action.payload};
        
        case USER_UPDATE_FAIL:
            return {loading: false, error: action.payload};
        
        default:
            return state
    }
}