import { formatStake } from "../../../../helpers/utils";
import { dappResourcesConstants } from "./dapp-resources.contants";

const initialState = {
    total: "0.0000 DAPP",
    available: "0.0000 DAPP",
    staked: "0.0000 DAPP",
    unstaking: "0.0000 DAPP",
    refund: "0.0000 DAPP"
};


const computeTotal = (_state, _payload) => {
    let newState = { ..._state, [_payload.variable]: _payload.value };
    let symbol = _state.total.split(' ')[1];
    return `${(formatStake(newState.available) + formatStake(newState.staked) + formatStake(newState.unstaking) + formatStake(newState.refund)).toFixed(4)} ${symbol}`;
};

export function dappresources(state = initialState, action) {
    switch (action.type) {
        case dappResourcesConstants.SET_DAPP_BALANCES_DATA:
            return {
                ...state,
                [action.payload.data.variable]: action.payload.data.value,
                total: computeTotal(state, action.payload.data)
            };
        default:
            return state;
    }
}
