import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { dspservicesService } from "../../dsp-services/dsp-services.services";

import { dspActions } from "../dsp.actions";

const Logo = ({ dispatch, account, info, uri }) => {
    const [loading, setLoading] = useState(true);
    const [logo, setLogo] = useState(null);

    useEffect(() => {
        if (info && (info.data || info.branding || info.logo) ) {
            let src = info.logo ? info.logo : info.branding;
            setLogo(src && src.logo_svg ? src.logo_svg : '/img/eos.png');
            setLoading(false);
        } else {
            dspservicesService
                .details(uri)
                .then(_res => {
                    return dspservicesService.details(_res.dsp_json_uri)
                })
                .then(_data => {
                    setLoading(false);
                    dispatch(dspActions.setDetails(account, _data));
                })
                .catch(_err => {
                    dispatch(dspActions.setDetails(account, {data: []}));
                    setLoading(false);
                });
        }
    }, [dispatch, info, uri, account]);

    return (
        <React.Fragment>
            {loading && <FontAwesomeIcon icon={faSpinner} className="fa-spin" />}
            {!loading && <img className="logo" src={logo} alt="" />}
        </React.Fragment>
    );
};

export default connect()(Logo);
