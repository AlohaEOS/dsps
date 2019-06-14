import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { dspActions } from "../dsp.actions";

const TotalUsers = ({ dispatch, stakes, account, loading, totalUser }) => {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (typeof totalUser === "undefined") {
            if (stakes) {
                const temp = stakes.filter(_el => _el.provider === account).length;
                setTotal(temp);
                dispatch(dspActions.setTotalUser(account, temp));
            }
        } else {
            setTotal(totalUser);
        }
    }, [dispatch, stakes, account, totalUser]);

    return (
        <React.Fragment>
            {loading && <FontAwesomeIcon icon={faSpinner} className="fa-spin" />}
            {!loading && <span>{total}</span>}
        </React.Fragment>
    );
};

export default connect()(TotalUsers);
