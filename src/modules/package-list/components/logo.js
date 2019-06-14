import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { packagelistService } from "../package-list.services";

import { packagelistActions } from "../package-list.actions";

const Logo = ({ dispatch, info }) => {
    const [loading, setLoading] = useState(true);
    const [logo, setLogo] = useState(null);

    useEffect(() => {
        if (info.details) {
            setLogo(info.details.logo && info.details.logo.logo_svg ? info.details.logo.logo_svg : '/img/eos.png');
            setLoading(false);
        } else {
            packagelistService
                .details(info.package_json_uri)
                .then(_data => {
                    setLoading(false);
                    dispatch(packagelistActions.setDetails(info.id, info.package_id, info.provider, _data));
                })
                .catch(_err => {
                    dispatch(packagelistActions.setDetails(info.id, info.package_id, info.provider, {}));
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
