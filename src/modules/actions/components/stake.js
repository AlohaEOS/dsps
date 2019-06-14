import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Jumbotron, FormGroup, FormText, Input, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import { DappClient } from "dapp-client";
import fetch from "isomorphic-fetch";

import appConfig from "../../../config/app";
import accessContext from "../../../config/accessContext";
import { formatStake } from "../../../helpers/utils";

import { actionsConstants } from "../actions.constants";

const client = new DappClient(appConfig.DAPP_ENDPOINT, { fetch });

const StakePackage = ({ dispatch, packageDetails, auth, asset }) => {
    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState("");
    const [balance, setBalance] = useState(`0.0000 ${asset}`);
    const [modal, setModal] = useState(packageDetails ? true : false);

    const index = appConfig.WALLETS.findIndex(_w => _w === sessionStorage.getItem("wallet"));
    const walletProvider = accessContext.getWalletProviders()[index];
    const wallet = accessContext.initWallet(walletProvider);

    const doStake = async () => {
        try {
            setProcessing(true);
            let actions = [];
            actions.push({
                account: appConfig.ASSETS['DAPP'],
                name: "selectpkg",
                authorization: [
                    {
                        actor: auth.accountName,
                        permission: auth.permission
                    }
                ],
                data: {
                    owner: auth.accountName,
                    provider: packageDetails.provider,
                    service: packageDetails.service,
                    package: packageDetails.package_id
                }
            });
            let stakeData = {
                provider: packageDetails.provider,
                service: packageDetails.service,
                quantity: `${Number(quantity).toFixed(4)} ${asset}`
            };
            if (asset === "DAPP") stakeData.from = auth.accountName;
            else stakeData.owner = auth.accountName;

            actions.push({
                account: appConfig.ASSETS[asset],
                name: "stake",
                authorization: [
                    {
                        actor: auth.accountName,
                        permission: auth.permission
                    }
                ],
                data: stakeData
            });

            await wallet.eosApi.transact(
                {
                    actions: actions
                },
                {
                    broadcast: true,
                    blocksBehind: 3,
                    expireSeconds: 60
                }
            );
            setProcessing(false);
            setQuantity("");
            toast.success(`Successfully staked ${quantity} ${asset}`, {
                position: toast.POSITION.TOP_CENTER
            });
        } catch (_err) {
            setProcessing(false);
            toast.error(_err.message ? _err.message : _err, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    };

    const stake = () => {
        if (quantity > parseFloat(balance.replace(asset, ""))) {
            toast.error("Insufficient quantity", {
                position: toast.POSITION.TOP_CENTER
            });
        } else {
            doStake();
        }
    };

    const cancel = () => {
        dispatch({
            type: actionsConstants.CLEAR_DATA
        });
    };

    const handleChange = _e => {
        setQuantity(_e.target.value);
    };

    useEffect(() => {
        client
            .get_currency_balance(appConfig.ASSETS[asset], auth.accountName, asset)
            .then(_res => {
                setBalance(_res[0] ? _res[0] : `0.0000 ${asset}`);
                setLoading(false);
            })
            .catch(_err => {
                toast.error(_err.message ? _err.message : _err, {
                    position: toast.POSITION.TOP_CENTER
                });
            });
    }, [auth, asset]);

    return (
        <Modal isOpen={modal}>
            <ModalHeader>Stake To</ModalHeader>
            <ModalBody>
                <Jumbotron className="pt-5 pb-2">
                    <Table>
                        <tbody>
                            <tr>
                                <td>Provider</td>
                                <td>{packageDetails.provider}</td>
                            </tr>
                            <tr>
                                <td>Service</td>
                                <td>{packageDetails.service_caption}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Jumbotron>
                <br />
                {loading && <div className="text-center">Loading...</div>}
                {!loading && <FormGroup>
                    <Input type="number" value={quantity} onChange={handleChange} name="quantity" placeholder="Quantity" />
                    <FormText>
                        <span>
                            Minimum of: {formatStake(packageDetails.min_stake_quantity)} {asset}
                        </span>
                        <span className="float-right">Available: {balance}</span>
                    </FormText>
                </FormGroup>}
            </ModalBody>
            <ModalFooter>
                {!loading && (
                    <Button disabled={processing} color="primary" onClick={stake}>
                        {processing ? "Processing, please wait..." : "Stake"}
                    </Button>
                )}{" "}
                <Button disabled={processing} color="secondary" onClick={cancel}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default connect()(StakePackage);
