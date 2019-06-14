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

const Refund = ({dispatch, unstake, user}) => {

    const refund = () => {

        const index = appConfig.WALLETS.findIndex(_w => _w === sessionStorage.getItem("wallet"));
        const walletProvider = accessContext.getWalletProviders()[index];
        const wallet = accessContext.initWallet(walletProvider);
        
        let asset = unstake.amount.split(' ')[1];
        let actions = [];
        let refundData = {
            provider: unstake.provider,
            service: unstake.service
        };
        if (asset === "DAPP") {
            refundData.to = user.accountName;
            refundData.symcode = 'DAPP';
        } else { 
            refundData.owner = user.accountName;
        }

        actions.push({
            account: appConfig.ASSETS[asset],
            name: "refund",
            authorization: [
                {
                    actor: user.accountName,
                    permission: user.permission
                }
            ],
            data: refundData
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
            toast.success(`Refund successful`, {
                position: toast.POSITION.TOP_CENTER
            });
        })
        .catch(_err => {
            toast.error(_err.message ? _err.message : _err, {
                position: toast.POSITION.TOP_CENTER
            });
        })

    }

    return <Button onClick={refund} color="primary">Refund</Button>

}

export default connect()(Refund);