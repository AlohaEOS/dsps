import React from "react";
import { Row, Col, Table } from "reactstrap";

import { DappTotalBalance, DappAvailableBalance, DappStakedBalance, DappUnstakingBalance, DappRefundRequired } from "./dapp-resources";
import { DapphdlAvailableBalance, DapphdlAllocationBalance, DapphdlStakedBalance, DapphdlClaimed, DapphdlAction } from "./dapphdl-resources";

const Balances = ({ user }) => {
    return (
        <Row className="balances">
            <Col sm="12" md="6">
                <Table striped>
                    <tbody>
                        <tr>
                            <td colSpan="2" className="text-center">
                                DAPP Resources
                            </td>
                        </tr>
                        <tr>
                            <th>Total Balance</th>
                            <td>
                                <DappTotalBalance user={user} />
                            </td>
                        </tr>
                        <tr>
                            <th>Available</th>
                            <td>
                                <DappAvailableBalance user={user} />
                            </td>
                        </tr>
                        <tr>
                            <th>Staked</th>
                            <td>
                                <DappStakedBalance user={user} />
                            </td>
                        </tr>
                        <tr>
                            <th>Unstaking</th>
                            <td>
                                <DappUnstakingBalance user={user} />
                            </td>
                        </tr>
                        <tr>
                            <th>Refund Required</th>
                            <td>
                                <DappRefundRequired user={user} />
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
            <Col sm="12" md="6">
                <Table striped>
                    <tbody>
                        <tr>
                            <td colSpan="2" className="text-center">
                                DAPPHDL Resources
                            </td>
                        </tr>
                        <tr>
                            <th>Available</th>
                            <td>
                                <DapphdlAvailableBalance user={user} />
                            </td>
                        </tr>
                        <tr>
                            <th>Allocation</th>
                            <td>
                                <DapphdlAllocationBalance user={user} />
                            </td>
                        </tr>
                        <tr>
                            <th>Staked</th>
                            <td>
                                <DapphdlStakedBalance user={user} />
                            </td>
                        </tr>
                        <tr>
                            <th>Claimed</th>
                            <td>
                                <DapphdlClaimed user={user} />
                            </td>
                        </tr>
                        <tr>
                            <th>Actions</th>
                            <td>
                                <DapphdlAction user={user} />
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </Row>
    );
};

export default Balances;
