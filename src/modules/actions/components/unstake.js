import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";

import { toast } from "react-toastify";

import appConfig from "../../../config/app";
import accessContext from "../../../config/accessContext";

import { myStakesActions } from "../../my-stakes/my-stakes.actions";
import { myUnstakesActions } from "../../my-unstakes/my-unstakes.actions";
import { dappResourcesActions } from "../../my-wallet/components/dapp-resources/dapp-resources.actions";
import { dapphdlResourcesActions } from "../../my-wallet/components/dapphdl-resources/dapphdl-resources.actions";

const Unstake = ({dispatch, stake, user}) => {

    const unstake = () => {

        const index = appConfig.WALLETS.findIndex(_w => _w === sessionStorage.getItem("wallet"));
        const walletProvider = accessContext.getWalletProviders()[index];
        const wallet = accessContext.initWallet(walletProvider);
        
        let asset = stake.balance.split(' ')[1];
        let actions = [];
        let unstakeData = {
            provider: stake.provider,
            service: stake.service,
            quantity: stake.balance
        };
        if (asset === "DAPP") unstakeData.to = user.accountName;
        else unstakeData.owner = user.accountName;

        actions.push({
            account: appConfig.ASSETS[asset],
            name: "unstake",
            authorization: [
                {
                    actor: user.accountName,
                    permission: user.permission
                }
            ],
            data: unstakeData
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
                dispatch(myStakesActions.list(user.accountName));
                dispatch(myUnstakesActions.list(user.accountName));
                dispatch(dappResourcesActions.getStakedBalance(user.accountName));
                dispatch(dappResourcesActions.getUnstakingBalance(user.accountName));
                dispatch(dapphdlResourcesActions.getAvailableBalance(user.accountName));
                dispatch(dapphdlResourcesActions.getAccount(user.accountName));
            }, 5000);
            toast.success(`Successfully unstaked ${stake.balance}`, {
                position: toast.POSITION.TOP_CENTER
            });
        })
        .catch(_err => {
            toast.error(_err.message ? _err.message : _err, {
                position: toast.POSITION.TOP_CENTER
            });
        })

    }

    return <Button onClick={unstake} color="primary">Unstake</Button>

}

export default connect()(Unstake);