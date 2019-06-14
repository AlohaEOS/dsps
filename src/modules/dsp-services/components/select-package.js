import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { toast } from "react-toastify";

import appConfig from "../../../config/app";
import accessContext from "../../../config/accessContext";

const SelectPackage = ({ packageDetails, auth }) => {

    console.log(packageDetails)

    const index = appConfig.WALLETS.findIndex(_w => _w === sessionStorage.getItem("wallet"));
    const walletProvider = accessContext.getWalletProviders()[index];
    const wallet = accessContext.initWallet(walletProvider);

    const select = () => {
        wallet.eosApi
            .transact(
                {
                    actions: [
                        {
                            account: "dappservices",
                            name: "selectpkg",
                            authorization: [
                                {
                                    actor: auth.accountName,
                                    permission: auth.permission
                                }
                            ],
                            data: {
                                owner: auth.accountName,  
                                provider: packageDetails.info.provider,
                                service: packageDetails.info.service,
                                package: packageDetails.info.package_id
                            }
                        }
                    ]
                },
                {
                    broadcast: true,
                    blocksBehind: 3,
                    expireSeconds: 60
                }
            )
            .then(_res => {
                toast.success("Successfully selected the package.", {
                    position: toast.POSITION.TOP_CENTER
                });
            })
            .catch(_err => {
                toast.error(_err.message ? _err.message : _err, {
                    position: toast.POSITION.TOP_CENTER
                });
            });
    };

    return (
        <Button color="primary" onClick={select}>
            Select
        </Button>
    );
};



export default connect()(SelectPackage);
