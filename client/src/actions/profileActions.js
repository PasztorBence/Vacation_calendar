import axios from 'axios';
import {
    GET_PROFILE,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
    GET_REQUESTS,
    GET_ALL_REQUESTS,
    GET_ALL_UNALLOWED_DATE
} from "./types";

//Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get('/api/users/current')
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

//Create a new request
export const createRequest = (newData, history) => dispatch => {
    dispatch(setProfileLoading());
    axios
        .post('api/request/user/', newData)
        .then(res =>
                dispatch({
                    type: GET_REQUESTS,
                    payload: res.data
                }),
            window.location.reload
        )
        .catch(err =>
            dispatch({
                type: GET_REQUESTS,
                payload: err.data
            })
        )
};

//Create a new unAllowed date
export const createUnAllowing = (newData, history) => dispatch => {
    dispatch(setProfileLoading());
    axios
        .post(' api/unallow/admin/', newData)
        .then(res =>
                dispatch({
                    type: GET_ALL_UNALLOWED_DATE,
                    payload: res.data
                }),
            history.push('/newunalloweddate'),
            window.location.reload
        )
        .catch(err =>
            dispatch({
                type: GET_ALL_UNALLOWED_DATE,
                payload: null
            })
        )
};

//Delete a request from the list
export const deleteRequest = (id) => dispatch => {
    dispatch(setProfileLoading());
    axios
        .delete(`api/request/user/${id}`)
        .then(res =>
                dispatch({
                    type: GET_REQUESTS,
                    payload: res.data
                }),
            window.location.reload
        )
        .catch(err =>
            dispatch({
                type: GET_REQUESTS,
                payload: null
            })
        )
};

//Get all request from all user
export const getAllRequest = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get('api/request/all')
        .then(res =>
            dispatch({
                type: GET_ALL_REQUESTS,
                payload: res.data
            }),
        )
        .catch(err =>
            dispatch({
                type: GET_ALL_REQUESTS,
                payload: null
            })
        )
};

//Get all unAllowed date
export const getAllUnAllowedDate = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get('api/unallow/admin')
        .then(res =>
            dispatch({
                type: GET_ALL_UNALLOWED_DATE,
                payload: res.data
            }),
        )
        .catch(err =>
            dispatch({
                type: GET_ALL_UNALLOWED_DATE,
                payload: null
            })
        )
};

//Delete a request from the list
export const deleteUnAllowing = (id,history) => dispatch => {
    dispatch(setProfileLoading());
    axios
        .delete(`api/unallow/admin/${id}`)
        .then(res =>
                dispatch({
                    type: GET_ALL_UNALLOWED_DATE,
                    payload: res.data
                }),
        )
        .catch(err =>
            dispatch({
                type: GET_ALL_UNALLOWED_DATE,
                payload: null
            })
        )
};

//Change the state of a request
export const changeRequestState = (id, newState,) => dispatch => {
    dispatch(setProfileLoading());
    axios
        .put(`api/request/admin/${id}`, newState)
        .then(res =>
                dispatch({
                    type: GET_ALL_REQUESTS,
                    payload: res.data
                }),
            window.location.reload
        )
        .catch(err =>
            dispatch({
                type: GET_ALL_REQUESTS,
                payload: null
            })
        )
};