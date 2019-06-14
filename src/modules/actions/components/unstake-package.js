import React, { useState } from "react";
import { connect } from "react-redux";
import { Jumbotron, FormGroup, Input, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";

import appConfig from "../../../config/app";
import accessContext from "../../../config/accessContext";

import { actionsConstants } from "../actions.constants";

const UnstakePackage = ({ dispatch, packageDetails, auth, asset }) => {
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState("");
    const [modal, setModal] = useState(packageDetails ? true : false);

    const index = appConfig.WALLETS.findIndex(_w => _w === sessionStorage.getItem("wallet"));
    const walletProvider = accessContext.getWalletProviders()[index];
    const wallet = accessContext.initWallet(walletProvider);

    const unstake = () => {
        if (quantity.trim() !== "") {
            setLoading(true);
            let actions = [];
            let unstakeData = {
                provider: packageDetails.provider,
                service: packageDetails.service,
                quantity: `${Number(quantity).toFixed(4)} ${asset}`
            };
            if (asset === "DAPP") unstakeData.to = auth.accountName;
            else unstakeData.owner = auth.accountName;

            actions.push({
                account: appConfig.ASSETS[asset],
                name: "unstake",
                authorization: [
                    {
                        actor: auth.accountName,
                        permission: auth.permission
                    }
                ],
                data: unstakeData
            });

            wallet.eosApi
                .transact(
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
                    setLoading(false);
                    toast.success(`Successfully unstaked ${Number(quantity).toFixed(4)} ${asset}`, {
                        position: toast.POSITION.TOP_CENTER
                    });
                    setQuantity("");
                })
                .catch(_err => {
                    setLoading(false);
                    toast.error(_err.message ? _err.message : _err, {
                        position: toast.POSITION.TOP_CENTER
                    });
                });
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

    return (
        <Modal isOpen={modal}>
            <ModalHeader>Unstake From</ModalHeader>
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
                <FormGroup>
                    <Input type="number" value={quantity} onChange={handleChange} name="quantity" placeholder="Quantity" />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button disabled={loading} color="primary" onClick={unstake}>
                    {loading ? "Processing, please wait..." : "Unstake"}
                </Button>{" "}
                <Button disabled={loading} color="secondary" onClick={cancel}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default connect()(UnstakePackage);
