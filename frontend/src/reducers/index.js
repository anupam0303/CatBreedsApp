import {combineReducers} from 'redux';
import breedReducer from './breedReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    breed: breedReducer,
    error: errorReducer,
    auth: authReducer

});