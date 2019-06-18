import { myStakesService } from "./my-stakes.services";
import { myStakesConstants } from "./my-stakes.constants";

const list = _account => {
    return dispatch => {
        dispatch({ type: myStakesConstants.FETCH_REQUEST });
        myStakesService.list(_account).then(
            _res => {
                dispatch({
                    type: myStakesConstants.FETCH_SUCCESS,
                    payload: {
                        data: _res.rows
                    }
                });
            },
            _err => {
                dispatch({ type: myStakesConstants.FETCH_FAILURE });
            }
        );
    };
};

const listDAPPHDL = (_account) => {
    return dispatch => {
        dispatch({ type: myStakesConstants.DATA_FETCH_REQUEST });
        myStakesService.listDAPPHDL().then(
            _res => {
                dispatch({
                    type: myStakesConstants.DATA_FETCH_SUCCESS,
                    payload: {
                        data: (_res.rows.filter(_stake => _stake.account === _account)).map(_stake => {
                            return {
                                ..._stake,
                                balance: _stake.balance.replace("DAPP", "DAPPHDL")
                            }
                        })
                    }
                });
            },
            _err => {
                dispatch({ type: myStakesConstants.DATA_FETCH_FAILURE });
            }
        );
    };
};

export const myStakesActions = {
    list,
    listDAPPHDL,
};
