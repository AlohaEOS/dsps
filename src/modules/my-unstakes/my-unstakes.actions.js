import { myUnstakesService } from "./my-unstakes.services";
import { myUnstakesConstants } from "./my-unstakes.constants";


const list = _account => {
    return dispatch => {
        dispatch({ type: myUnstakesConstants.FETCH_REQUEST });
        myUnstakesService.list(_account).then(
            _res => {
                dispatch({
                    type: myUnstakesConstants.FETCH_SUCCESS,
                    payload: {
                        data: _res.rows
                    }
                });
            },
            _err => {
                dispatch({ type: myUnstakesConstants.FETCH_FAILURE });
            }
        );
    };
};


const listDAPPHDL = _account => {
    return dispatch => {
        dispatch({ type: myUnstakesConstants.DATA_FETCH_REQUEST });
        myUnstakesService.listDAPPHDL().then(
            _res => {
                dispatch({
                    type: myUnstakesConstants.DATA_FETCH_SUCCESS,
                    payload: {
                        data: (_res.rows.filter(_stake => _stake.account === _account)).map(_stake => {
                            return {
                                ..._stake,
                                amount: _stake.amount.replace("DAPP", "DAPPHDL")
                            }
                        })
                    }
                });
            },
            _err => {
                dispatch({ type: myUnstakesConstants.DATA_FETCH_FAILURE });
            }
        );
    };
};


export const myUnstakesActions = {
    list,
    listDAPPHDL,
};
