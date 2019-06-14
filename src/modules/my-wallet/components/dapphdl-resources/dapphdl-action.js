import React, { useEffect } from "react";
import { connect } from "react-redux";

import { dapphdlResourcesActions } from "./dapphdl-resources.actions"

import ClaimDAPPHDL from "../../../actions/components/claim-dapphdl";
import RefreshDAPPHDL from "../../../actions/components/refresh-dapphdl";

const DapphdlAction = ({ dispatch, claimed, user }) => {

    useEffect(() => {
        dispatch(dapphdlResourcesActions.getAccount(user.accountName));
    }, [user, dispatch]);

    return (
        <React.Fragment>
            {claimed === 0 && <ClaimDAPPHDL user={user} />}
            {claimed === 1 && <RefreshDAPPHDL user={user} />}
        </React.Fragment>
    )
};

const mapStateToProps = _state => {
    const { claimed } = _state.dapphdlresources;
    return { claimed };
};

export default connect(mapStateToProps)(DapphdlAction);
