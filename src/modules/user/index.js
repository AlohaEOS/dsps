import React, { useEffect, useState } from "react";
import { TabContent, TabPane, Row, Col, Nav, NavItem, NavLink } from "reactstrap";
import { connect } from "react-redux";
import classnames from "classnames";

import LoginAlert from "../../components/login-alert";
import StakesList from "../my-stakes/components/list";
import UnstakesList from "../my-unstakes/components/list";
import Balances from "../my-wallet/components/balances";

import { myStakesActions } from "../my-stakes/my-stakes.actions";
import { myUnstakesActions } from "../my-unstakes/my-unstakes.actions";

const Profile = ({ dispatch, loggedIn, auth, stakes, unstakes }) => {
    
    const [activeTab, setActiveTab] = useState("stakes");

    useEffect(() => {
        if (auth) {
            dispatch(myStakesActions.list(auth.accountName));
            dispatch(myUnstakesActions.list(auth.accountName));
        }
    }, [dispatch, auth]);

    const toggleTabs = _tab => {
        setActiveTab(_tab);
    };

    return (
        <div>
            <h2>My Profile</h2>
            <br />

            <div className="my-profile">
                {loggedIn && (
                    <div>
                        <Balances user={auth} />

                        <div className="mx-4 ">
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={classnames('pointer', { active: activeTab === "stakes" })}
                                        onClick={() => {
                                            toggleTabs("stakes");
                                        }}
                                    >
                                        Stakes
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames('pointer', { active: activeTab === "unstakes" })}
                                        onClick={() => {
                                            toggleTabs("unstakes");
                                        }}
                                    >
                                        Unstakes
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={activeTab} className="py-5">
                                <TabPane tabId="stakes">
                                    <Row>
                                        <Col sm="12">
                                            <StakesList user={auth} {...stakes} />
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="unstakes">
                                    <Row>
                                        <Col sm="12">
                                            <UnstakesList user={auth} {...unstakes} />
                                        </Col>
                                    </Row>
                                </TabPane>
                            </TabContent>
                        </div>
                    </div>
                )}
                {!loggedIn && <LoginAlert message="Please login to view user profile." />}
            </div>
        </div>
    );
};

const mapStateToProps = _state => {
    const { loggedIn, auth } = _state.auth;
    return { 
        loggedIn: loggedIn,
        auth: auth,
        stakes: {
            loading: _state.mystakes.loading, 
            loaded: _state.mystakes.loaded,
            data: _state.mystakes.data,
        },
        unstakes: {
            loading: _state.myunstakes.loading, 
            loaded: _state.myunstakes.loaded,
            data: _state.myunstakes.data,
        }
    };
};

export default connect(mapStateToProps)(Profile);
