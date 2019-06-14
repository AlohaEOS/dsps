import { packagelistService } from "./package-list.services";
import { packagelistConstants } from "./package-list.constants";

import { getServiceCaption, formatStake, formatQuota } from "../../helpers/utils";

const closeDetails = () => {
    return {
        type: packagelistConstants.CLOSE_DETAILS
    };
}

const details = _info => {
    return dispatch => {
        dispatch({ type: packagelistConstants.DETAILS_REQUEST });
        packagelistService.details(_info.package_json_uri).then(
            _res => {
                dispatch({
                    type: packagelistConstants.DETAILS_SUCCESS,
                    payload: {
                        data: {
                            details: _res,
                            info: _info
                        }
                    }
                });
            },
            _err => {
                dispatch({ type: packagelistConstants.DETAILS_FAILURE });
            }
        );
    };
};

const list = () => {
    return dispatch => {
        dispatch({ type: packagelistConstants.FETCH_REQUEST });
        packagelistService.list().then(
            _res => {
                let data = _res.rows.map(_el => {
                    return {
                        ..._el,
                        service_caption: getServiceCaption(_el.service),
                        min_stake_quantity_formatted: formatStake(_el.min_stake_quantity),
                        quota_formatted: formatQuota(_el.quota),
                    }
                })
                dispatch({
                    type: packagelistConstants.FETCH_SUCCESS,
                    payload: {
                        data: data
                    }
                });
            },
            _err => {
                dispatch({ type: packagelistConstants.FETCH_FAILURE });
            }
        );
    };
};

const sort = _col => {
    return {
        type: packagelistConstants.SORT,
        payload: {
            data: _col
        }
    };
}

const search = (_text, _filter) => {
    return {
        type: packagelistConstants.SEARCH,
        payload: {
            data: {
                text: _text,
                filter: _filter
            }
        }
    };
}

const setDetails = (_id, _package_id, _provider, _details) => {
    return {
        type: packagelistConstants.SET_DETAILS,
        payload: {
            data: {
                id: _id,
                package_id: _package_id,
                provider: _provider,
                details: _details
            }
        }
    };
}

const setDSP = (_id, _package_id, _provider, _info) => {
    return {
        type: packagelistConstants.SET_DSP,
        payload: {
            data: {
                id: _id,
                package_id: _package_id,
                provider: _provider,
                info: _info
            }
        }
    };
}

const setData = _data => {
    let data = _data.map(_el => {
        return {
            ..._el,
            service_caption: getServiceCaption(_el.service),
            min_stake_quantity_formatted: formatStake(_el.min_stake_quantity),
            quota_formatted: formatQuota(_el.quota),
        }
    })
    return {
        type: packagelistConstants.SET_DATA,
        payload: {
            data: data
        }
    };
}

const filterServices = _data => {
    return {
        type: packagelistConstants.FILTER_SERVICES,
        payload: {
            data: _data
        }
    };
}

const filterStatus = _data => {
    return {
        type: packagelistConstants.FILTER_STATUS,
        payload: {
            data: _data
        }
    };
}

export const packagelistActions = {
    closeDetails,
    details,
    list,
    sort,
    search,
    setDetails,
    setDSP,
    setData,
    filterServices,
    filterStatus,
};
