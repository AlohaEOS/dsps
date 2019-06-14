import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";

import { toast } from "react-toastify";

import appConfig from "../../../config/app";
import accessContext from "../../../config/accessContext";

import { dappResourcesActions } from "../../my-wallet/components/dapp-resources/dapp-resources.actions";
import { dapphdlResourcesActions } from "../../my-wallet/components/dapphdl-resources/dapphdl-resources.actions";

const RefreshDAPPHDL = ({dispatch, user}) => {

    const refresh = () => {

        const index = appConfig.WALLETS.findIndex(_w => _w === sessionStorage.getItem("wallet"));
        const walletProvider = accessContext.getWalletProviders()[index];
        const wallet = accessContext.initWallet(walletProvider);
        
        let actions = [];
        actions.push({
            account: appConfig.ASSETS['DAPPHDL'],
            name: "refresh",
            authorization: [
                {
                    actor: user.accountName,
                    permission: user.permission
                }
            ],
            data: {
                owner: user.accountName
            }
        });

        wallet.eosApi.transact(
            {
                actions: actions
            },
            {
                broadcast: true,
                blocksBehind: 3,
                expireSeconds: 60
            }
        )
        .then(_res => {
            setTimeout(() => {
                dispatch(dappResourcesActions.getStakedBalance(user.accountName));
                dispatch(dappResourcesActions.getUnstakingBalance(user.accountName));
                dispatch(dapphdlResourcesActions.getAvailableBalance(user.accountName));
                dispatch(dapphdlResourcesActions.getAccount(user.accountName));
            }, 5000);
            toast.success(`Successfully refreshed DAPPHDL`, {
                position: toast.POSITION.TOP_CENTER
            });
        })
        .catch(_err => {
            toast.error(_err.message ? _err.message : _err, {
                position: toast.POSITION.TOP_CENTER
            });
        })

    }

    return <Button onClick={refresh} color="primary">Refresh</Button>

}

export default connect()(RefreshDAPPHDL);