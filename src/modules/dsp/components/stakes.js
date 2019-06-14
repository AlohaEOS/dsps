import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import math from "lodash/math";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { formatStake } from "../../../helpers/utils";

import { dspActions } from "../dsp.actions";

const TotalStaked = ({ dispatch, stakes, account, loading, totalStaked }) => {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (typeof totalStaked === "undefined") {
            if (stakes) {
                const temp = math.sum(stakes.filter(_el => _el.provider === account).map(_el => formatStake(_el.balance)));
                setTotal(temp);
                dispatch(dspActions.setTotalStaked(account, temp));
            }
        } else {
            setTotal(totalStaked);
        }
    }, [dispatch, stakes, account, totalStaked]);

    return (
        <React.Fragment>
            {loading && <FontAwesomeIcon icon={faSpinner} className="fa-spin" />}
            {!loading && <span>{numeral(total).format("0[.]00a")}</span>}
        </React.Fragment>
    );
};

export default connect()(TotalStaked);
