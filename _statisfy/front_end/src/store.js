import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import { processDatasetReducers } from './reducers/datasetReducers';
import {processTokenReducers, userDataReducers, userLoginReducers, userRegisterReducers} from './reducers/userReducers';

const initialState = {};

const reducer = combineReducers({
    users: userDataReducers,
    userAuth: userLoginReducers,
    decodedUserToken: processTokenReducers,
    registerRes: userRegisterReducers,
    datasetDetails: processDatasetReducers
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;