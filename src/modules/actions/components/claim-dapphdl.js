import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";

import { toast } from "react-toastify";

import appConfig from "../../../config/app";
import accessContext from "../../../config/accessContext";

import { dapphdlResourcesActions } from "../../my-wallet/components/dapphdl-resources/dapphdl-resources.actions";

const ClaimDAPPHDL = ({dispatch, user}) => {

    const claim = () => {

        const index = appConfig.WALLETS.findIndex(_w => _w === sessionStorage.getItem("wallet"));
        const walletProvider = accessContext.getWalletProviders()[index];
        const wallet = accessContext.initWallet(walletProvider);
        
        let actions = [];
        actions.push({
            account: appConfig.ASSETS['DAPPHDL'],
            name: "grab",
            authorization: [
                {
                    actor: user.accountName,
                    permission: user.permission
                }
            ],
            data: {
                owner: user.accountName,
                ram_payer: user.accountName
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
                dispatch(dapphdlResourcesActions.getAvailableBalance(user.accountName));
                dispatch(dapphdlResourcesActions.getAccount(user.accountName));
            }, 5000);
            toast.success(`Successfully claimed DAPPHDL`, {
                position: toast.POSITION.TOP_CENTER
            });
        })
        .catch(_err => {
            toast.error(_err.message ? _err.message : _err, {
                position: toast.POSITION.TOP_CENTER
            });
        })

    }

    return <Button onClick={claim} color="primary">Claim DAPPHDL</Button>

}

export default connect()(ClaimDAPPHDL);