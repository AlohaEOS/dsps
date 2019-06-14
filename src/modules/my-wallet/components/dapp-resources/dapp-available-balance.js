import React, { useEffect } from "react";
import { connect } from "react-redux";

import { dappResourcesActions } from "./dapp-resources.actions"

const DappTotalBalance = ({ dispatch, available, user }) => {

    useEffect(() => {
        dispatch(dappResourcesActions.getAvailableBalance(user.accountName));
    }, [user, dispatch]);

    return <React.Fragment>{available}</React.Fragment>;
};

const mapStateToProps = _state => {
    const { available } = _state.dappresources;
    return { available };
};

export default connect(mapStateToProps)(DappTotalBalance);
