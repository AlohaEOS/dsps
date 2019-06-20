import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { dspservicesService } from "../dsp-services.services";

import { dspservicesActions } from "../dsp-services.actions";

const Logo = ({ dispatch, info }) => {
    const [loading, setLoading] = useState(true);
    const [logo, setLogo] = useState(null);

    useEffect(() => {
        if (info.details) {
            setLogo(info.details.logo && info.details.logo.logo_256 ? info.details.logo.logo_256 : '/img/eos.png');
            setLoading(false);
        } else {
            dspservicesService
                .details(info.package_json_uri)
                .then(_data => {
                    setLoading(false);
                    dispatch(dspservicesActions.setDetails(info.id, info.package_id, info.provider, _data));
                })
                .catch(_err => {
                    dispatch(dspservicesActions.setDetails(info.id, info.package_id, info.provider, {}));
                    setLoading(false);
                });
        }
    }, [dispatch, info]);

    return (
        <React.Fragment>
            {loading && <FontAwesomeIcon icon={faSpinner} className="fa-spin" />}
            {!loading && <img className="logo" src={logo} alt="" />}
        </React.Fragment>
    );
};

export default connect()(Logo);
