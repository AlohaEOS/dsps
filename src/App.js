import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import { ToastContainer } from "react-toastify";

import { history } from './helpers';

import DSPServices from "./modules/dsp-services";
import DSP from "./modules/dsp";
import Profile from "./modules/user";
import PackageDetails from "./modules/package-details";
import ProviderDetails from "./modules/provider-details";

import Layout from "./components/layout";

const App = () => {
    return (
        <Router history={history}>
            <Container fluid className="p-0">
                <ToastContainer />
                <Switch>
                    <Route exact path="/" component={Layout(DSPServices)} />
                    <Route exact path="/providers" component={Layout(DSP)} />
                    <Route exact path="/myaccount" component={Layout(Profile)} />
                    <Route exact path="/package/:id" component={Layout(PackageDetails)} />
                    <Route exact path="/provider/:name" component={Layout(ProviderDetails)} />
                </Switch>
            </Container>
        </Router>
    );
};

export default App;
