import array from "lodash/array";

import { dspConstants } from "./dsp.constants";

import { dspservicesService } from "../dsp-services/dsp-services.services";
import { dspservicesConstants } from "../dsp-services/dsp-services.constants";

import { getServiceCaption, formatStake, formatQuota } from "../../helpers/utils";
import { dspServices } from "./dsp.services";

const packageList = () => {
    return dispatch => {
        dispatch({ type: dspConstants.FETCH_REQUEST });
        dspservicesService.list().then(
            _res => {
                let packages = _res.rows.map(_el => {
                    return {
                        ..._el,
                        service_caption: getServiceCaption(_el.service),
                        min_stake_quantity_formatted: formatStake(_el.min_stake_quantity),
                        quota_formatted: formatQuota(_el.quota),
                    }
                })
                let uniqueProviderNames = array.uniq(_res.rows.map(_el=>_el.provider));
                dispatch({
                    type: dspservicesConstants.FETCH_SUCCESS,
                    payload: {
                        data: packages
                    }
                });
                let providers = uniqueProviderNames.map(_el => {
                    return {
                        account: _el,
                        ...(packages.filter(_pkg => _pkg.provider === _el)).find(_el=>_el.package_json_uri !== ""),
                        totalPackages: (packages.filter(_pkg => _pkg.provider === _el)).length,
                        packages: packages.filter(_pkg => _pkg.provider === _el)
                    }
                })
                dispatch({
                    type: dspConstants.FETCH_SUCCESS,
                    payload: {
                        data: providers
                    }
                });
            },
            _err => {
                dispatch({ type: dspConstants.FETCH_FAILURE });
            }
        );
    };
};

const setData = _data => {
    return {
        type: dspConstants.SET_DATA,
        payload: {
            data: _data
        }
    };
}

const setDetails = (_account, _details) => {
    return {
        type: dspConstants.SET_DETAILS,
        payload: {
            data: {
                account: _account,
                details: _details,
            }
        }
    };
}


const setTotalUser = (_account, _total) => {
    return {
        type: dspConstants.SET_TOTAL_USER,
        payload: {
            data: {
                account: _account,
                total: _total,
            }
        }
    };
}


const setTotalStaked = (_account, _total) => {
    return {
        type: dspConstants.SET_TOTAL_STAKED,
        payload: {
            data: {
                account: _account,
                total: _total,
            }
        }
    };
}

const stakesList = () => {
    return dispatch => {
        dispatch({ type: dspConstants.FETCH_STAKES_REQUEST });
        dspServices.accountext().then(
            _res => {
                dispatch({
                    type: dspConstants.FETCH_STAKES_SUCCESS,
                    payload: {
                        data: _res.rows
                    }
                });
            },
            _err => {
                dispatch({ type: dspConstants.FETCH_STAKES_FAILURE });
            }
        );
    };
};


const sort = _col => {
    return {
        type: dspConstants.SORT,
        payload: {
            data: _col
        }
    };
}

export const dspActions = {
    stakesList,
    setData,
    setDetails,
    packageList,
    setTotalUser,
    setTotalStaked,
    sort
};
