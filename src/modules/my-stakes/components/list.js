import React from "react";
import { Table } from "reactstrap";

import Unstake from "../../actions/components/unstake";
import Close from "../../actions/components/close";
import { formatStake } from "../../../helpers";

const StakesList = ({ loading, data, data2, user }) => {

    return (
        <div className="table-responsive-lg">
            <Table>
                <thead>
                    <tr>
                        <th>Service</th>
                        <th>Provider</th>
                        <th>Stake</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && (
                        <tr>
                            <td colSpan="4" className="text-center">
                                Loading...
                            </td>
                        </tr>
                    )}
                    {!loading && data && data.length === 0 && data2 && data2.length === 0 && (
                        <tr>
                            <td colSpan="4" className="text-center">
                                No data found.
                            </td>
                        </tr>
                    )}
                    {!loading &&
                        data &&
                        data.map((_d, _index) => {
                            return (
                                <tr key={`tr-${_index}`}>
                                    <td>{_d.service}</td>
                                    <td>{_d.provider}</td>
                                    <td>{_d.balance}</td>
                                    <td>
                                        {formatStake(_d.balance) > 0 && <Unstake stake={_d} user={user} /> }
                                        {formatStake(_d.balance) === 0 && <Close stake={_d} user={user} /> }
                                    </td>
                                </tr>
                            );
                        })}
                        {data2 &&
                        data2.map((_d, _index) => {
                            return (
                                <tr key={`tr-${_index}`}>
                                    <td>{_d.service}</td>
                                    <td>{_d.provider}</td>
                                    <td>{_d.balance}</td>
                                    <td>
                                        {formatStake(_d.balance) > 0 && <Unstake stake={_d} user={user} /> }
                                        {formatStake(_d.balance) === 0 && <Close stake={_d} user={user} /> }
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
        </div>
    );
};

export default StakesList;
