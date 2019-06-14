
import { dapphdlResourcesServices } from "./dapphdl-resources.services";
import { dapphdlResourcesConstants } from "./dapphdl-resources.constants";

const getAvailableBalance = _account => {
    return dispatch => {
        dapphdlResourcesServices.getAvailableBalance(_account).then(
            _res => {
                dispatch({
                    type: dapphdlResourcesConstants.SET_DAPPHDL_AVAILABLE,
                    payload: {
                        data: _res.length === 0 ? "0.0000 DAPPHDL" : _res[0]
                    }
                });
            },
            _err => {}
        );
    };
}

const getAccount = _account => {
    return dispatch => {
        dapphdlResourcesServices.getAccount(_account).then(
            _res => {
                dispatch({
                    type: dapphdlResourcesConstants.SET_DAPPHDL_ACCOUNT,
                    payload: {
                        data: _res.rows[0]
                    }
                });
            },
            _err => {}
        );
    };
}

export const dapphdlResourcesActions = {
    getAvailableBalance,
    getAccount,
};
