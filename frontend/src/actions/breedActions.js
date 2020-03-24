import axios from 'axios';
import {GET_BREEDS, BREEDS_LOADING} from './types';
import {tokenConfig} from './authActions';
import {returnErrors} from './errorActions';

export const getBreeds = () => (dispatch, getState) =>{
    dispatch(setBreedsLoading());
    axios.get('/api/breeds', tokenConfig(getState))
        .then(response => dispatch({
            type: GET_BREEDS,
            payload: response.data
        }))
        .catch(
            error => {
                console.log('Error:' + error );
                dispatch(returnErrors(error.response.data, error.response.status))
            }
        );
        
        
};

export const setBreedsLoading = () => {
    return {
        type: BREEDS_LOADING
    }

};

