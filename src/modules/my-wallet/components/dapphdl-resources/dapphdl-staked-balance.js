import React, { useEffect } from "react";
import { connect } from "react-redux";

import { dapphdlResourcesActions } from "./dapphdl-resources.actions"

const DapphdlStakedBalance = ({ dispatch, staked, user }) => {

    useEffect(() => {
        dispatch(dapphdlResourcesActions.getAccount(user.accountName));
    }, [user, dispatch]);

    return <React.Fragment>{staked}</React.Fragment>;
};

const mapStateToProps = _state => {
    const { staked } = _state.dapphdlresources;
    return { staked };
};

export default connect(mapStateToProps)(DapphdlStakedBalance);
