import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import appConfig from "../../config/app";

import { dspActions } from "../dsp/dsp.actions";
import { packagelistActions } from "../package-list/package-list.actions";

import Logo from "../dsp/components/logo";
import Map from "../dsp-services/components/map";
import TotalUsers from "../dsp/components/users";
import TotalStaked from "../dsp/components/stakes";
import PackagesTable from "../package-list";

const SocialMedia = ({data}) => {
    let names = Object.keys(data);
    return (
        <ul>
            {names.map(_name => {
                return (
                    <li key={_name}>
                        <a rel="noopener noreferrer" href={`${appConfig.SOCIAL_MEDIA[_name].url}/${appConfig.SOCIAL_MEDIA[_name].pre_text}${data[_name]}`} target="_blank">
                            <FontAwesomeIcon icon={appConfig.SOCIAL_MEDIA[_name].icon} size="lg" color="#3131ff" />
                        </a>
                    </li>
                );
            })}
        </ul>
    );
};

const ProviderDetails = ({ match, dispatch, providers, stakes, loading, loadingStakes }) => {
    const [provider, setProvider] = useState(null);

    useEffect(() => {
        if (!providers) {
            dispatch(dspActions.packageList());
        } else {
            const temp = providers.find(_el => _el.account === match.params.name);
            dispatch(packagelistActions.setData(temp.packages));
            setProvider(temp);
        }

        if (!stakes) dispatch(dspActions.stakesList());
    }, [dispatch, providers, stakes, match]);

    return (
        <div>
            <h2>Package Details</h2>
            <br />

            <div className="provider-details">
                {loading && <div className="text-center">Loading</div>}
                {!loading && provider && (
                    <div>
                        <Row className="px-5 pt-5">
                            <Col sm="12" md="12" lg="4" className="text-center">
                                <div className="logo text-center">
                                    <Logo account={provider.account} info={provider.details} uri={provider.package_json_uri} />
                                </div>
                                <div className="name">{provider.details && provider.details.name ? provider.details.name : provider.account}</div>
                                {provider.details && provider.details.social && (
                                    <div className="social-media mt-3 mb-3">
                                        <SocialMedia data={provider.details.social} />
                                    </div>
                                )}
                            </Col>

                            <Col sm="12" md="12" lg="8">
                                <Table>
                                    <tbody>
                                        {provider.details && (
                                            <React.Fragment>
                                                {provider.details.email && (
                                                    <tr>
                                                        <td>Email</td>
                                                        <td>
                                                            <a href={`mailto:${provider.details.email}`}>{provider.details.email}</a>
                                                        </td>
                                                    </tr>
                                                )}
                                                {provider.details.website && (
                                                    <tr>
                                                        <td>Website</td>
                                                        <td>
                                                            <a target="_blank" href={provider.details.website}>{provider.details.website}</a>
                                                        </td>
                                                    </tr>
                                                )}
                                                {provider.details.code_of_conduct && (
                                                    <tr>
                                                        <td>Code Of Conduct</td>
                                                        <td>
                                                            <a target="_blank" href={provider.details.code_of_conduct}>{provider.details.code_of_conduct}</a>
                                                        </td>
                                                    </tr>
                                                )}
                                                {provider.details.ownership_disclosure && (
                                                    <tr>
                                                        <td>Owner Disclosure</td>
                                                        <td>
                                                            <a target="_blank" href={provider.details.ownership_disclosure}>{provider.details.ownership_disclosure}</a>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        )}
                                        <tr>
                                            <td>Packages Count</td>
                                            <td style={{ width: 70 + "%" }}>{provider.packages ? provider.packages.length : 0}</td>
                                        </tr>
                                        {stakes && (
                                            <React.Fragment>
                                                <tr>
                                                    <td>Users Count</td>
                                                    <td>
                                                        <TotalUsers stakes={stakes} loading={loadingStakes} account={provider.account} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Staked DAPP</td>
                                                    <td>
                                                        <TotalStaked stakes={stakes} loading={loadingStakes} account={provider.account} />
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        )}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>

                        {provider.details && provider.details.location && <div>
                            <Map locations={[provider.details.location]}/>
                        </div>}

                        <div className="pt-5">
                            <h5 className="pl-2">Packages</h5>
                            <PackagesTable search={false} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = _state => {
    const { providers, loading, loaded, stakes, loadingStakes, loadedStakes } = _state.dsp;
    return { providers, loading, loaded, stakes, loadingStakes, loadedStakes };
};

export default withRouter(connect(mapStateToProps)(ProviderDetails));
