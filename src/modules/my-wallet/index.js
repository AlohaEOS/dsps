import React from "react";
import { connect } from "react-redux";

import LoginAlert from "../../components/login-alert";
import Balances from "./components/balances";

const MyWallet = ({loggedIn}) => {
    return (
        <div>
            <h1>My Wallet</h1>

            <div className="wallet">
                {loggedIn && <Balances />}
                {!loggedIn && <LoginAlert message="Please login to view wallet." />}
            </div>
            
        </div>
        
    );
};


const mapStateToProps = _state => {
    const { loggedIn } = _state.auth;
    return { loggedIn };
};

export default connect(mapStateToProps)(MyWallet);
