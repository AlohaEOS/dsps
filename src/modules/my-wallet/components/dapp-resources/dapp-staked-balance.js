import React, { useEffect } from "react";
import { connect } from "react-redux";

import { dappResourcesActions } from "./dapp-resources.actions"

const DappStakedBalance = ({ dispatch, staked, user }) => {

    useEffect(() => {
        dispatch(dappResourcesActions.getStakedBalance(user.accountName));
    }, [user, dispatch]);

    return <React.Fragment>{staked}</React.Fragment>;
};

const mapStateToProps = _state => {
    const { staked } = _state.dappresources;
    return { staked };
};

export default connect(mapStateToProps)(DappStakedBalance);
