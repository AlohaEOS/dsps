import React, { useEffect } from "react";
import { connect } from "react-redux";

import { dappResourcesActions } from "./dapp-resources.actions"

const DappUnstakingBalance = ({ dispatch, unstaking, user }) => {

    useEffect(() => {
        dispatch(dappResourcesActions.getUnstakingBalance(user.accountName));
    }, [user, dispatch]);

    return <React.Fragment>{unstaking}</React.Fragment>;
};

const mapStateToProps = _state => {
    const { unstaking } = _state.dappresources;
    return { unstaking };
};

export default connect(mapStateToProps)(DappUnstakingBalance);
