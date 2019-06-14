import React, { useEffect } from "react";
import { connect } from "react-redux";

import { dapphdlResourcesActions } from "./dapphdl-resources.actions"

const DapphdlAllocationBalance = ({ dispatch, allocation, user }) => {

    useEffect(() => {
        dispatch(dapphdlResourcesActions.getAccount(user.accountName));
    }, [user, dispatch]);

    return <React.Fragment>{allocation}</React.Fragment>;
};

const mapStateToProps = _state => {
    const { allocation } = _state.dapphdlresources;
    return { allocation };
};

export default connect(mapStateToProps)(DapphdlAllocationBalance);
