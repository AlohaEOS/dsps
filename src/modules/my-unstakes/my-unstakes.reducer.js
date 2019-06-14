import { myUnstakesConstants } from "./my-unstakes.constants";
const initialState = {
    loaded: false,
    loading: false,
    data: null,
};

export function myunstakes(state = initialState, action) {
    switch (action.type) {
        case myUnstakesConstants.FETCH_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false,
            };
        case myUnstakesConstants.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload.data,
                loaded: true,
            };
        case myUnstakesConstants.FETCH_FAILURE:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}
