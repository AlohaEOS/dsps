import React from "react";
import { connect } from "react-redux";
import { Table, Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown, faSort } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";

import Logo from "./logo";
import TotalStaked from "./stakes";
import TotalUsers from "./users";
import { dspActions } from "../dsp.actions";

const DSPList = ({ dispatch, history, providers, loading, stakes, loadingStakes, cols, sortCol }) => {

    const view = _account => {
        history.push(`/provider/${_account}`);
    }

    const sort = _col => {
        dispatch(dspActions.sort(_col));
    };

    return (
        <Table striped responsive>
            <thead>
                <tr>
                    <th />
                    {cols.map((_col, _index) => {
                        return (
                            <th
                                className={classnames(_col.class, 'pointer')}
                                key={`th-${_index}`}
                                onClick={() => {
                                    sort(_col);
                                }}
                            >
                                {_col.caption}
                                {" "}
                                {_col.field === sortCol.field && (
                                    <React.Fragment>
                                        {_col.sort === "desc" && <FontAwesomeIcon icon={faSortDown} />} {_col.sort === "asc" && <FontAwesomeIcon icon={faSortUp} />}
                                    </React.Fragment>
                                )}
                                {_col.field !== sortCol.field && (
                                    <React.Fragment>
                                        <span className="blur"><FontAwesomeIcon icon={faSort} /></span>
                                    </React.Fragment>
                                )}
                            </th>
                        );
                    })}
                    <th />
                </tr>
            </thead>
            <tbody>
                    {loading && (
                        <tr>
                            <td colSpan="7" className="text-center">
                                Loading...
                            </td>
                        </tr>
                    )}
                    {!loading && !providers && (
                        <tr>
                            <td colSpan="7" className="text-center">
                                No data found.
                            </td>
                        </tr>
                    )}
                    {!loading &&
                        providers &&
                        providers.map((_provider, _index) => {
                            return (
                                <tr key={`tr-${_index}`}>
                                    <td>
                                        <Logo account={_provider.account} info={_provider.details} uri={_provider.package_json_uri}/>
                                    </td>
                                    <td>{_provider.details && _provider.details.name ? _provider.details.name : _provider.account}</td>
                                    <td className="text-center">{_provider.account}</td>
                                    <td className="text-center">{_provider.details && _provider.details.location ? `${_provider.details.location.name}, ${_provider.details.location.country}` : ''}</td>
                                    <td className="text-center">{_provider.totalPackages}</td>
                                    <td className="text-center">
                                        <TotalUsers totalUser={_provider.totalUser} stakes={stakes} loading={loadingStakes} account={_provider.account}/>
                                    </td >
                                    <td className="text-center">
                                        <TotalStaked totalStaked={_provider.totalStaked} stakes={stakes} loading={loadingStakes} account={_provider.account}/>
                                    </td>
                                    <td>
                                        <Button onClick={()=>view(_provider.account)} size="sm" color="primary">Details</Button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
        </Table>
    );
};

export default withRouter(connect()(DSPList));
