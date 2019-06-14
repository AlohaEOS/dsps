import React from "react";
import { connect } from "react-redux";

const DappTotalBalance = ({ dispatch, total, user }) => {
    return <React.Fragment>{total}</React.Fragment>;
};

const mapStateToProps = _state => {
    const { total } = _state.dappresources;
    return { total };
};

export default connect(mapStateToProps)(DappTotalBalance);
