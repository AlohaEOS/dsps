import React, { useEffect } from "react";
import { connect } from "react-redux";
import { DropdownItem } from "reactstrap";
import { toast } from "react-toastify";

import appConfig from "../config/app";
import accessContext from "../config/accessContext";
import { authConstants } from "../constants";


const Login = ({dispatch}) => {

    useEffect(() => {
        let walletName = sessionStorage.getItem('wallet');
        if(walletName) {
            const index = appConfig.WALLETS.findIndex(_w => _w === walletName);
            const walletProvider = accessContext.getWalletProviders()[index];
            const wallet = accessContext.initWallet(walletProvider);
            wallet.connect()
                .then(_res => {
                    return wallet.login();
                })
                .then(_account => {
                    dispatch({
                        type: authConstants.LOGIN_SUCCESS,
                        payload: {
                            data: {
                                user: _account,
                                auth: wallet.auth
                            }
                        }
                    });
                })
        }
    }, [dispatch]);

    const login = _walletName => {
        const index = appConfig.WALLETS.findIndex(_w => _w === _walletName);
        const walletProvider = accessContext.getWalletProviders()[index];
        const wallet = accessContext.initWallet(walletProvider);
        dispatch({
            type: authConstants.LOGIN_REQUEST
        });
        wallet.connect()
            .then(_res => {
                return wallet.login();
            })
            .then(_account => {
                sessionStorage.setItem('wallet', _walletName);
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        data: {
                            user: _account,
                            auth: wallet.auth
                        }
                    }
                });
            })
            .catch(_err => {
                dispatch({
                    type: authConstants.LOGIN_FAILURE
                });
                toast.error(_err.message ? _err.message : _err, {
                    position: toast.POSITION.TOP_CENTER
                });
            })
    }

    return (
        <React.Fragment>
            <DropdownItem header>Desktop</DropdownItem>
            <DropdownItem onClick={() => {login('scatter')}}>Scatter</DropdownItem>
            <DropdownItem onClick={() => {login('ledger')}}>Ledger</DropdownItem>
            <DropdownItem header>Mobile</DropdownItem>
            <DropdownItem onClick={() => {login('lynx')}}>Lynx</DropdownItem>
            <DropdownItem onClick={() => {login('meetone')}}>Meet.One</DropdownItem>
            <DropdownItem onClick={() => {login('tokenpocket')}}>TokenPocket</DropdownItem>
        </React.Fragment>
    );
};

export default connect()(Login);
