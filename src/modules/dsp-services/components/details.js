import React from "react";
import { connect } from "react-redux";
import { Alert, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import { dspservicesActions } from "../dsp-services.actions";

import Map from "./map";
import SelectPackage from "./select-package";

const PackageDetails = ({ dispatch, loading, details, viewDetails, loggedIn, auth }) => {
    
    const toggle = () => {
        dispatch(dspservicesActions.closeDetails());
    };

    return (
        <Modal isOpen={viewDetails} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Details{" "}
                {!loading && details && (
                    <a style={{ fontSize: 10 + "px" }} href={details.info.package_json_uri} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLink} />
                    </a>
                )}{" "}
            </ModalHeader>
            <ModalBody>
                {loading && <div className="text-center">Loading</div>}
                {!loading && details && (
                    <div className="details">
                        <ul>
                            <li>
                                <span className="caption">Name</span>: <span className="value">{details.data.name}</span>
                            </li>
                            <li>
                                <span className="caption">Description</span>: <span className="value">{details.data.description}</span>
                            </li>
                            <li>
                                <span className="caption">Service Level Agreement</span>
                                <ul>
                                    <li>
                                        <span className="caption">Availability</span>
                                        <ul>
                                            <li>
                                                <span className="caption">Uptime 9s</span>: <span className="value">{details.data.service_level_agreement.availability.uptime_9s}</span>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className="caption">Performance</span>
                                        <ul>
                                            <li>
                                                <span className="caption">95</span>: <span className="value">{details.data.service_level_agreement.performance["95"]}</span>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <span className="caption">Pinning</span>
                                <ul>
                                    <li>
                                        <span className="caption">TTL</span>: <span className="value">{details.data.pinning.ttl}</span>
                                    </li>
                                    <li>
                                        <span className="caption">Public</span>: <span className="value">{details.data.pinning.public.toString()}</span>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                        <Map locations={details.data.locations} />

                    </div>
                )}
                {!loading && !details && <Alert color="danger">Unable to load details from json file.</Alert> }
            </ModalBody>
            { loggedIn && <ModalFooter>
                <SelectPackage packageDetails={details} auth={auth} />{' '}
                {/* <Button color="primary">Stake DAPP</Button>{' '}
                <Button color="primary">STAKE DAPPHODL</Button> */}
            </ModalFooter> }
        </Modal>
    );
};

const mapStateToProps = _state => {
    const { loadingDetails, details, viewDetails } = _state.dspservices;
    const { loggedIn, auth, } = _state.auth;
    return { 
        loggedIn: loggedIn,
        auth: auth,
        loading: loadingDetails,
        details: details,
        viewDetails: viewDetails,
     };
};

export default connect(mapStateToProps)(PackageDetails);
