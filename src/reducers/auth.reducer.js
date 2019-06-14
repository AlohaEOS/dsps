import { authConstants } from "../constants";
const initialState = {
    loggingIn: false,
    loggedIn: false,
    user: null,
    auth: null,
};

export function auth(state = initialState, action) {
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true
            };
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                loggedIn: true,
                user: action.payload.data.user,
                auth: action.payload.data.auth,
            };
        case authConstants.LOGIN_FAILURE:
            return {
                ...state,
                loggingIn: false
            };
        case authConstants.LOGOUT_SUCCESS:
            return {
                ...initialState
            };
        default:
            return state;
    }
}
