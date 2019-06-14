import { myStakesConstants } from "./my-stakes.constants";
const initialState = {
    loaded: false,
    loading: false,
    data: null,
};

export function mystakes(state = initialState, action) {
    switch (action.type) {
        case myStakesConstants.FETCH_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false,
            };
        case myStakesConstants.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload.data,
                loaded: true,
            };
        case myStakesConstants.FETCH_FAILURE:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}
