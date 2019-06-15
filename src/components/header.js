import React, { useState } from "react";
import { connect } from "react-redux";
import { Container, Navbar, NavbarBrand, Nav, NavItem, Collapse, NavbarToggler, UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { NavLink, withRouter } from "react-router-dom";
import Login from "../components/login";
import Logout from "../components/logout";

const Header = ({ history, loggingIn, loggedIn, auth }) => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    };

    return (
        <Navbar className="header" color="light" light expand="md">
            <Container>
                <NavbarBrand href="/">
                    <img src="/img/aloha-eos-dsps-io.png" alt="Aloha EOS" />
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={open} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink exact className="nav-link" to="/">
                                Packages
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink exact className="nav-link" to="/providers">
                                Providers
                            </NavLink>
                        </NavItem>
                        {loggedIn && auth && (
                            <NavItem>
                                <NavLink exact className="nav-link" to="/myaccount">
                                    My Account
                                </NavLink>
                            </NavItem>
                        )}
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        {!loggedIn && !auth && (
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    {loggingIn && <FontAwesomeIcon icon={faSpinner} className="fa-spin" />} Login
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <Login />
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        )}
                        {loggedIn && auth && (
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    {auth.accountName}({auth.permission})
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <Logout />
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        )}
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
};

const mapStateToProps = _state => {
    const { loggedIn, auth, loggingIn } = _state.auth;
    return { loggedIn, auth, loggingIn };
};

export default withRouter(connect(mapStateToProps)(Header));
