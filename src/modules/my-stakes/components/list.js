import React from "react";
import { Table } from "reactstrap";

import Unstake from "../../actions/components/unstake";

const StakesList = ({ loading, data, user }) => {

    return (
        <div className="table-responsive-lg">
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Service</th>
                        <th>Provider</th>
                        <th>Stake</th>
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
                                    <td>{_d.balance}</td>
                                    <td>
                                        <Unstake stake={_d} user={user} />
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
