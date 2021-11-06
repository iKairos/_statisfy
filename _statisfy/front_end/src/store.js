import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {processTokenReducers, userDataReducers, userLoginReducers} from './reducers/userReducers';

const initialState = {};

const reducer = combineReducers({
    users: userDataReducers,
    userAuth: userLoginReducers,
    decodedUserToken: processTokenReducers
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;