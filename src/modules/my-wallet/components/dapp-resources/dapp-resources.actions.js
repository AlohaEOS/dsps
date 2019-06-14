import moment from "moment";

import { myStakesService } from "../../../my-stakes/my-stakes.services";
import { myUnstakesService } from "../../../my-unstakes/my-unstakes.services";

import { dappResourcesServices } from "./dapp-resources.services";
import { dappResourcesConstants } from "./dapp-resources.contants";

import { formatStake } from "../../../../helpers/utils";


const getAvailableBalance = _account => {
    return dispatch => {
        dappResourcesServices.getAvailableBalance(_account).then(
            _res => {
                dispatch({
                    type: dappResourcesConstants.SET_DAPP_BALANCES_DATA,
                    payload: {
                        data: {
                            value: _res[0],
                            variable: 'available'
                        }
                    }
                });
            },
            _err => {}
        );
    };
};

const getStakedBalance = _account => {
    return dispatch => {
        myStakesService.list(_account).then(
            _res => {
                let stakes = _res.rows.map(_el => formatStake(_el.balance));
                let total = stakes.reduce((_t, _e) => { return _t + _e }, 0);
                dispatch({
                    type: dappResourcesConstants.SET_DAPP_BALANCES_DATA,
                    payload: {
                        data: {
                            value: `${total.toFixed(4)} DAPP`,
                            variable: 'staked'
                        }
                    }
                });
            },
            _err => {}
        );
    };
};

const getUnstakingBalance = _account => {
    return dispatch => {
        myUnstakesService.list(_account).then(
            _res => {
                const now = moment();
                let overdue = _res.rows.filter(_el => {
                    let unstake_time = moment(new Date(Number(_el.unstake_time)));
                    return now > unstake_time;
                })
                let active = _res.rows.filter(_el => {
                    let unstake_time = moment(new Date(Number(_el.unstake_time)));
                    return now <= unstake_time;
                })
                let unstakes = active.map(_el => formatStake(_el.amount));
                let refunds = overdue.map(_el => formatStake(_el.amount));

                let totalUnstakes = unstakes.reduce((_t=0, _e) => { return _t + _e }, 0);
                let totalRefunds = refunds.reduce((_t=0, _e) => { return _t + _e }, 0);

                dispatch({
                    type: dappResourcesConstants.SET_DAPP_BALANCES_DATA,
                    payload: {
                        data: {
                            value: `${totalUnstakes.toFixed(4)} DAPP`,
                            variable: 'unstaking'
                        }
                    }
                });
                dispatch({
                    type: dappResourcesConstants.SET_DAPP_BALANCES_DATA,
                    payload: {
                        data: {
                            value: `${totalRefunds.toFixed(4)} DAPP`,
                            variable: 'refund'
                        }
                    }
                });
            },
            _err => {}
        );
    };
};


export const dappResourcesActions = {
    getAvailableBalance,
    getStakedBalance,
    getUnstakingBalance,
};
