import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_REQUESTS,GET_ALL_REQUESTS} from "../actions/types";

const initialState = {
    profile: null,
    requests: null,
    allRequests: null,
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            };
        case GET_REQUESTS:
            return {
                ...state,
                requests: action.payload,
                loading: false
            };
        case GET_ALL_REQUESTS:
            return {
              ...state,
              allRequests: action.payload,
              loading: false
            };
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            };
        default:
            return state;
    }
}