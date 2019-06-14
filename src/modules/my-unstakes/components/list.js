import React from "react";
import { Table } from "reactstrap";
import moment from "moment";

import Refund from "../../actions/components/refund";

const showRefund = (_unstake_time) => {
    const now = moment();
    const unstake_time = moment(new Date(Number(_unstake_time)));
    return now > unstake_time;
}

const UnstakesList = ({ loading, data, user }) => {
    return (
        <div className="table-responsive-lg">
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Service</th>
                        <th>Provider</th>
                        <th>Stake</th>
                        <th>Unstake Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && (
                        <tr>
                            <td colSpan="5" className="text-center">
                                Loading...
                            </td>
                        </tr>
                    )}
                    {!loading && data && data.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No data found.
                            </td>
                        </tr>
                    )}
                    {!loading &&
                        data &&
                        data.map((_d, _index) => {
                            return (
                                <tr key={`tr-${_index}`}>
                                    <td>{_d.id+1}</td>
                                    <td>{_d.service}</td>
                                    <td>{_d.provider}</td>
                                    <td>{_d.amount}</td>
                                    <td>{moment(new Date(Number(_d.unstake_time))).format('LLL')}</td>
                                    <td>
                                        {showRefund(_d.unstake_time) && <Refund unstake={_d} user={user} />}
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
        </div>
    );
};

export default UnstakesList;
