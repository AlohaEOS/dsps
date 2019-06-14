import React from "react";
import { connect } from "react-redux";

const DappRefundRequiredBalance = ({ dispatch, refund, user }) => {
    return <React.Fragment>{refund}</React.Fragment>;
};

const mapStateToProps = _state => {
    const { refund } = _state.dappresources;
    return { refund };
};

export default connect(mapStateToProps)(DappRefundRequiredBalance);
