import { myStakesConstants } from "./my-stakes.constants";
const initialState = {
    loaded: false,
    loading: false,
    data: null,

    loaded2: false,
    loading2: false,
    data2: null,
};

export function mystakes(state = initialState, action) {
    switch (action.type) {
        case myStakesConstants.FETCH_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false
            };
        case myStakesConstants.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload.data,
                loaded: true
            };
        case myStakesConstants.FETCH_FAILURE:
            return {
                ...state,
                loading: false
            };

        case myStakesConstants.DATA_FETCH_REQUEST:
            return {
                ...state,
                loading2: true,
                loaded2: false
            };
        case myStakesConstants.DATA_FETCH_SUCCESS:
            return {
                ...state,
                loading2: false,
                data2: action.payload.data,
                loaded2: true
            };
        case myStakesConstants.DATA_FETCH_FAILURE:
            return {
                ...state,
                loading2: false
            };
        default:
            return state;
    }
}
