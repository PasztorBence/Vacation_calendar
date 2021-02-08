import axios from 'axios';
import {
    GET_PROFILE,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
    GET_REQUESTS,
    GET_ALL_REQUESTS,
    GET_ALL_UNALLOWED_DATE,
    GET_ALL_USER,
    GET_ERRORS
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
                payload: null
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
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

//Create a new request
export const createRequest = (newData, history) => dispatch => {
    dispatch(setProfileLoading());
    axios
        .post('api/request/user/', newData)
        .then(
            axios
                .get(`/api/request/user/${newData.id}`)
                .then(
                    history.push('/user')
                )
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
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
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
};

//Delete a request from the list
export const deleteRequest = (id, userId, mailData) => dispatch => {
    dispatch(setProfileLoading());
    axios
        .put(`api/request/user/${id}`, mailData)
        .then(res =>
            dispatch(getRequests(userId)),
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
};

//Rethink a request from the list
export const reThinkRequest = (id, userId, mailData) => dispatch => {
    dispatch(setProfileLoading());
    axios
        .put(`api/request/rethink/${id}`, mailData)
        .then(res =>
            dispatch(getRequests(userId)),
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
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
                type: GET_ERRORS,
                payload: err.response.data
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
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
};

//Get all user data
export const getAllUser = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get('api/users/all')
        .then(res =>
            dispatch({
                type: GET_ALL_USER,
                payload: res.data
            }),
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
};

//Delete a unallowing from the list
export const deleteUnAllowing = (id) => dispatch => {
    dispatch(setProfileLoading());
    axios
        .delete(`api/unallow/admin/${id}`)
        .then(res =>
            dispatch(getAllUnAllowedDate()),
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
};

//Change the state of a request
export const changeRequestState = (id, newState) => dispatch => {
    dispatch(setProfileLoading());
    axios
        .put(`api/request/admin/${id}`, newState)
        .then(res =>
            dispatch(getAllRequest()),
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
};

//Set the remaining day of a user
export const changeRemainingDay = (id, newDay) => dispatch => {
    dispatch(setProfileLoading());
    axios
        .put(`api/users/admin/${id}`, newDay)
        .then(res =>
            dispatch(getAllUser()),
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }),
        )
};

//Set the the notification e-mail adress of a user
export const changeNotificationEmail = (id, newEmail) => dispatch => {
    dispatch(setProfileLoading());
    axios
        .put(`api/users/nemail/${id}`, newEmail)
        .then(res =>
            dispatch(getAllUser()),
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }),
        )
};

//Set the email of a user
export const changeEmail = (id, newData) => dispatch => {
    dispatch(setProfileLoading());
    axios
        .put(`api/users/email/${id}`, newData)
        .then(res =>
            dispatch({
                type: GET_ERRORS,
                payload: ''
            }),
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }),
        )
};

//Set the password of a user
export const changePassword = (id, newData) => dispatch => {
    dispatch(setProfileLoading());
    axios
        .put(`api/users/password/${id}`, newData)
        .then(res =>
            dispatch({
                type: GET_ERRORS,
                payload: ''
            }),
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }),
        )
};