import React from "react";
import { Alert } from "reactstrap";


const LoginAlert = ({message}) => {

    return (
        <div className="login-alert">
            <Alert color="danger">{message}</Alert>
        </div>
    )

}

export default LoginAlert;