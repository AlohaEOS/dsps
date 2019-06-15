import React from "react";
import { Button, ButtonGroup } from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Actions from "../../actions";

const ActionsGroup = ({history, packageDetails, loggedIn, auth}) => {
    const view = () => {
        history.push(`/package/${packageDetails.id}`);
    }
    return (
        <ButtonGroup size="sm">
            <Actions disabled={!loggedIn} id={`actions-${packageDetails.id}`} packageDetails={packageDetails} auth={auth}/>
        </ButtonGroup>
    );
};


const mapStateToProps = _state => {
    const { loggedIn, auth } = _state.auth;
    return { 
        loggedIn: loggedIn,
        auth: auth
     };
};

export default withRouter(connect(mapStateToProps)(ActionsGroup));
