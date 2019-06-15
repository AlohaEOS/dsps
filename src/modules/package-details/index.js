import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Row, Col, Table, Card, CardTitle, CardText, Button } from "reactstrap";

import { formatQuota, formatStake, convertHour } from "../../helpers/utils";

import { dspservicesActions } from "../dsp-services/dsp-services.actions";

import Logo from "../dsp-services/components/logo";
import Map from "../dsp-services/components/map";
import Actions from "../actions";
import ActionModals from "../actions/components/modals";

const PackageDetails = ({dispatch, match, loading, results, loggedIn, auth}) => {

    const [details, setDetails] = useState(null);

    useEffect(() => {
        if(results) {
            setDetails(results.find(_el => _el.id === Number(match.params.id)))
        } else {
            dispatch(dspservicesActions.list());
        }
    }, [results, match, dispatch]);

    return (
        <div>
            <h1>Package Details</h1>

            <ActionModals />

            <div className="package-details">

                {loading && <div className="text-center">Loading</div>}
                {!loading && details && <React.Fragment>
                    <Row>
                        <Col sm="5" className="text-center">
                            <div className="logo text-center"><Logo info={details} /></div>
                            <div className="name">{details.provider}</div>
                            <div className="mt-3">
                                <Actions disabled={!loggedIn} packageDetails={details} auth={auth}/>
                            </div>
                        </Col>
                        <Col sm="7">
                            <Table>
                                <tbody>
                                    <tr>
                                        <td>Quota</td>
                                        <td>{formatQuota(details.quota)}</td>
                                    </tr>
                                    <tr>
                                        <td>Min Stake</td>
                                        <td>{formatStake(details.min_stake_quantity)}</td>
                                    </tr>
                                    <tr>
                                        <td>Unstake Period</td>
                                        <td>{convertHour(details.min_unstake_period)}</td>
                                    </tr>
                                    <tr>
                                        <td>Package Period</td>
                                        <td>{convertHour(details.package_period)}</td>
                                    </tr>
                                    <tr>
                                        <td>Service ID</td>
                                        <td>{details.service}</td>
                                    </tr>
                                    <tr>
                                        <td>Package ID</td>
                                        <td>{details.package_id}</td>
                                    </tr>
                                    <tr>
                                        <td>Provider Account</td>
                                        <td>
                                            <Button color="secondary"><Link to={`/provider/${details.provider}`}>
                                                {details.provider}
                                            </Link></Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>UID</td>
                                        <td>{details.id}</td>
                                    </tr>
                                    {details.api_endpoint && <tr>
                                        <td>API Endpoint</td>
                                        <td className="text-break"><a rel="noopener noreferrer" href={details.api_endpoint} target="_blank">{details.api_endpoint}</a></td>
                                    </tr>}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>

                    {details.details &&               
                        <Row>
                            <Col sm="5">
                                {(details.details.name || details.details.description) && <Card body>
                                    <CardTitle>{details.details.name && details.details.name}</CardTitle>
                                    <CardText>{details.details.description && details.details.description}</CardText>
                                </Card>}
                            </Col>
                            <Col sm="7">
                                <Map locations={details.details.locations} />
                            </Col>
                        </Row>
                    }
                </React.Fragment>}

            </div>
        </div>
    )

}

const mapStateToProps = _state => {
    const { loading, orig } = _state.dspservices;
    const { loggedIn, auth } = _state.auth;
    return { loading: loading, results: orig, loggedIn: loggedIn, auth: auth };
};

export default withRouter(connect(mapStateToProps)(PackageDetails));