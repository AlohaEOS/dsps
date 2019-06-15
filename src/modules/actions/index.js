import React, { useState } from "react";
import { connect } from "react-redux";
import { Tooltip, Button, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import appConfig from "../../config/app";
import accessContext from "../../config/accessContext";

import { actionsConstants } from "./actions.constants";

const Actions = ({ dispatch, packageDetails, auth, disabled }) => {

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => {
        setTooltipOpen(!tooltipOpen);
    }

    const performAction = (_action, _asset) => {
        dispatch({
            type: actionsConstants.SET_DATA,
            payload: {
                data: {
                    packageDetails: packageDetails,
                    action: _action,
                    asset: _asset
                }
            }
        });
    };

    const stakeDAPP = () => {performAction('stake', 'DAPP')}
    const stakeDAPPHODL = () => {performAction('stake', 'DAPPHDL')}

    const unstakeDAPP = () => {performAction('unstake', 'DAPP')}
    const unstakeDAPPHODL = () => {performAction('unstake', 'DAPPHDL')}

    const refundDAPP = () => {refund('DAPP')}
    const refundDAPPHODL = () => {refund('DAPPHDL')}

    const refund = _asset => {
        const index = appConfig.WALLETS.findIndex(_w => _w === sessionStorage.getItem("wallet"));
        const walletProvider = accessContext.getWalletProviders()[index];
        const wallet = accessContext.initWallet(walletProvider);
        
        let actions = [];
        let refundData = {
            provider: packageDetails.provider,
            service: packageDetails.service
        };
        if (_asset === "DAPP") {
            refundData.to = auth.accountName;
            refundData.symcode = 'DAPP';
        } else { 
            refundData.owner = auth.accountName;
        }

        actions.push({
            account: appConfig.ASSETS[_asset],
            name: "refund",
            authorization: [
                {
                    actor: auth.accountName,
                    permission: auth.permission
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

    return (
        <React.Fragment>
            {disabled && 
                <React.Fragment>
                    <Button className="login-required" id={`button-${packageDetails.id}`} color="primary">Actions <FontAwesomeIcon icon={faCaretDown}/></Button>
                    <Tooltip toggle={toggle} isOpen={tooltipOpen} placement="bottom" target={`button-${packageDetails.id}`}>
                        Login required.
                    </Tooltip>
                </React.Fragment>
            }
            {!disabled && <UncontrolledButtonDropdown>
            <DropdownToggle color="primary" caret>
                Actions
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem header>Stake</DropdownItem>
                <DropdownItem onClick={stakeDAPP}>DAPP</DropdownItem>
                <DropdownItem onClick={stakeDAPPHODL}>DAPPHDL</DropdownItem>
                <DropdownItem divider></DropdownItem>
                <DropdownItem header>Unstake</DropdownItem>
                <DropdownItem onClick={unstakeDAPP}>DAPP</DropdownItem>
                <DropdownItem onClick={unstakeDAPPHODL}>DAPPHDL</DropdownItem>
                <DropdownItem divider></DropdownItem>
                <DropdownItem header>Refund</DropdownItem>
                <DropdownItem onClick={refundDAPP}>DAPP</DropdownItem>
                <DropdownItem onClick={refundDAPPHODL}>DAPPHDL</DropdownItem>
                {/* <DropdownItem divider></DropdownItem> */}
                {/* <DropdownItem>Close</DropdownItem> */}
            </DropdownMenu>
        </UncontrolledButtonDropdown>}
        </React.Fragment>
    );
};

export default connect()(Actions);
