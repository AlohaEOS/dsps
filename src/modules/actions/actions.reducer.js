import { actionsConstants } from "./actions.constants";

const initialState = {
    packageDetails: null,
    action: null,
    asset: null,
};

export function actions(state = initialState, action) {
    switch (action.type) {
        case actionsConstants.SET_DATA:
            return {
                ...state,
                packageDetails: action.payload.data.packageDetails,
                action: action.payload.data.action,
                asset: action.payload.data.asset,
            };
        case actionsConstants.CLEAR_DATA:
            return {
                ...initialState
            };
        default:
            return state;
    }
}
