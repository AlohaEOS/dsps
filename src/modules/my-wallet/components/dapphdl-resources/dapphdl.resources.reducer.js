import { dapphdlResourcesConstants } from "./dapphdl-resources.constants";

const initialState = {
    available: "0.0000 DAPPHDL",
    allocation: "0.0000 DAPPHDL",
    staked: "0.0000 DAPPHDL",
    claimed: 0
};

export function dapphdlresources(state = initialState, action) {
    switch (action.type) {
        case dapphdlResourcesConstants.SET_DAPPHDL_AVAILABLE:
            return {
                ...state,
                available: action.payload.data
            };
        case dapphdlResourcesConstants.SET_DAPPHDL_ACCOUNT:
            return {
                ...state,
                ...action.payload.data
            };
        default:
            return state;
    }
}
