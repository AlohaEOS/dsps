import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

import { dspActions } from "../dsp.actions";
import Unstake from "../../actions/components/unstake";
import Close from "../../actions/components/close";
import { formatStake } from "../../../helpers";

const StakesList = ({ dispatch, stakes, loadingStakes, loadedStakes, auth }) => {

    console.log(stakes)

    useEffect(() => {
        dispatch(dspActions.stakesList());
    }, [dispatch]);

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
                    {loadingStakes && (
                        <tr>
                            <td colSpan="4" className="text-center">
                                Loading...
                            </td>
                        </tr>
                    )}
                    {!loadingStakes && stakes && stakes.filter(_stake => _stake.account === auth.accountName).length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No data found.
                            </td>
                        </tr>
                    )}
                    {!loadingStakes &&
                        stakes &&
                        stakes.filter(_stake => _stake.account === auth.accountName).map((_d, _index) => {
                            return (
                                <tr key={`tr-${_index}`}>
                                    <td>{_d.service}</td>
                                    <td>{_d.provider}</td>
                                    <td>{_d.balance}</td>
                                    <td>
                                        {formatStake(_d.balance) > 0 && <Unstake stake={_d} user={auth} /> }
                                        {formatStake(_d.balance) === 0 && <Close stake={_d} user={auth} /> }
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
        </div>
    );
};


const mapStateToProps = _state => {
    const { auth } = _state.auth;
    const { stakes, loadingStakes, loadedStakes } = _state.dsp;
    return { stakes, loadingStakes, loadedStakes, auth };
}

export default connect(mapStateToProps)(StakesList);
