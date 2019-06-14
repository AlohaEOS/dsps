import React from "react";
import { connect } from "react-redux";

import StakePackage from "./stake";
import UnstakePackage from "./unstake-package";

const ActionModals = ({packageDetails, auth, asset, action}) => {
    return <div>
        {action === 'stake' && <StakePackage packageDetails={packageDetails} auth={auth} asset={asset} />}
        {action === 'unstake' && <UnstakePackage packageDetails={packageDetails} auth={auth} asset={asset} />}
    </div>
}

const mapStateToProps = _state => {
    const { packageDetails, action, asset } = _state.actions;
    const { auth } = _state.auth;
    return {
        packageDetails, action, auth, asset
    }
}

export default connect(mapStateToProps)(ActionModals);