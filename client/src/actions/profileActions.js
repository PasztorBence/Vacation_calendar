import axios from 'axios';
import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_REQUESTS} from "./types";

//Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/users/current')
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        )
};

//Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
};

//Clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
};

//Get requests from current user
export const getRequests = id => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get(`/api/request/user/${id}`)
        .then(res =>
            dispatch({
                type: GET_REQUESTS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_REQUESTS,
                payload: null
            })
        );
};