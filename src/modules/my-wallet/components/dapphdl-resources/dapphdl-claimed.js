import React, { useEffect } from "react";
import { connect } from "react-redux";

import { dapphdlResourcesActions } from "./dapphdl-resources.actions"

const DapphdlClaimed = ({ dispatch, claimed, user }) => {

    useEffect(() => {
        dispatch(dapphdlResourcesActions.getAccount(user.accountName));
    }, [user, dispatch]);

    return <React.Fragment>{claimed === 0 ? "No" : "Yes"}</React.Fragment>;
};

const mapStateToProps = _state => {
    const { claimed } = _state.dapphdlresources;
    return { claimed };
};

export default connect(mapStateToProps)(DapphdlClaimed);
