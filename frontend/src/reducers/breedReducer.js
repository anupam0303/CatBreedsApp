 import {GET_BREEDS, BREEDS_LOADING} from '../actions/types';

const initialState = {
        breeds: [],
        loading: false
}

export default function (state = initialState, action ) {
    switch(action.type) {
        case GET_BREEDS: 
            return {
                ...state,
                breeds: action.payload,
                loading: false
            };
        case BREEDS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}