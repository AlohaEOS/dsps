import { myUnstakesConstants } from "./my-unstakes.constants";
const initialState = {
    loaded: false,
    loading: false,
    data: null,

    loaded2: false,
    loading2: false,
    data2: null,
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

        case myUnstakesConstants.DATA_FETCH_REQUEST:
            return {
                ...state,
                loading2: true,
                loaded2: false,
            };
        case myUnstakesConstants.DATA_FETCH_SUCCESS:
            return {
                ...state,
                loading2: false,
                data2: action.payload.data,
                loaded2: true,
            };
        case myUnstakesConstants.DATA_FETCH_FAILURE:
            return {
                ...state,
                loading2: false
            };
        default:
            return state;
    }
}
