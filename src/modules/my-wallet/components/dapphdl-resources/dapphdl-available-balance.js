import React, { useEffect } from "react";
import { connect } from "react-redux";

import { dapphdlResourcesActions } from "./dapphdl-resources.actions"

const DapphdlAvailableBalance = ({ dispatch, available, user }) => {
    useEffect(() => {
        dispatch(dapphdlResourcesActions.getAvailableBalance(user.accountName));
    }, [user, dispatch]);

    return <React.Fragment>{available}</React.Fragment>;
};

const mapStateToProps = _state => {
    const { available } = _state.dapphdlresources;
    return { available };
};

export default connect(mapStateToProps)(DapphdlAvailableBalance);
