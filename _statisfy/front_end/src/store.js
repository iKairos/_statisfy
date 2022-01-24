import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import { getDatasetReducers, processDatasetReducers } from './reducers/datasetReducers';
import { researchesGetReducers, researchGetReducers, researchSaveReducers, studyGetReducers, studySaveReducers } from './reducers/researchReducers';
import { expireTokenReducers } from './reducers/tokenReducers';
import {processTokenReducers, userDataReducers, userLoginReducers, userRegisterReducers, userUpdateReducers} from './reducers/userReducers';

const initialState = {};

const reducer = combineReducers({
    users: userDataReducers,
    userAuth: userLoginReducers,
    decodedUserToken: processTokenReducers,
    registerRes: userRegisterReducers,
    datasetDetails: processDatasetReducers,
    tokenExpire: expireTokenReducers,
    researchSave: researchSaveReducers,
    researchGet: researchGetReducers,
    datasetFile: getDatasetReducers,
    saveStudy: studySaveReducers,
    getStudyRes: studyGetReducers,
    researchesGet: researchesGetReducers,
    userUpdate: userUpdateReducers
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;