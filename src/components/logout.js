import React from "react";
import { connect } from "react-redux";
import { DropdownItem } from "reactstrap";
import { toast } from "react-toastify";

import appConfig from "../config/app";
import accessContext from "../config/accessContext";

import { authConstants } from "../constants";

const Logout = ({ dispatch, wallet }) => {
    const logout = () => {
        const index = appConfig.WALLETS.findIndex(_w => _w === sessionStorage.getItem("wallet"));
        const walletProvider = accessContext.getWalletProviders()[index];
        const wallet = accessContext.initWallet(walletProvider);

        wallet.logout()
            .then(_res => {
                sessionStorage.removeItem("wallet");
                dispatch({
                    type: authConstants.LOGOUT_SUCCESS
                });
            })
            .catch(_err => {
                toast.error(_err.message ? _err.message : _err, {
                    position: toast.POSITION.TOP_CENTER
                });
            });
    };

    return <DropdownItem onClick={logout}>Logout</DropdownItem>;
};

export default connect()(Logout);
