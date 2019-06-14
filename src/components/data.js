import { useEffect } from "react";
import { connect } from "react-redux";

import { dspservicesService } from "../modules/dsp-services/dsp-services.services";
import { dspservicesActions } from "../modules/dsp-services/dsp-services.actions";
import { dspActions } from "../modules/dsp/dsp.actions";

const getPackage = async _info => {
    let details = {};
    try {
        if (_info.package_json_uri) details = await dspservicesService.details(_info.package_json_uri);
    } catch (_err) {}

    return {
        ..._info,
        details: details
    };
};

const getDSP = async _info => {
    let details = null;
    try {
        if (_info.details.dsp_json_uri) details = await dspservicesService.details(_info.details.dsp_json_uri);
    } catch (_err) {}

    if (details)
        return {
            ...details,
            package_id: _info.package_id,
            provider: _info.provider
        };
    else return null;
};

const Data = props => {
    const { dispatch } = props;

    useEffect(() => {
        dspservicesService
            .list()
            .then(_results => {
                let promises = [];
                _results.rows.forEach(_el => {
                    promises.push(getPackage(_el));
                });
                return Promise.all(promises);
            })
            .then(_results => {
                dispatch(dspservicesActions.setData(_results));
                let data = _results.filter(_res => {
                    return _res.details && _res.details.name;
                });
                let promises = [];
                data.forEach(_el => {
                    promises.push(getDSP(_el));
                });
                return Promise.all(promises);
            })
            .then(_results => {
                dispatch(dspActions.setData(_results.filter(_res => _res !== null)));
            });
    }, [dispatch]);

    return "";
};

export default connect()(Data);
