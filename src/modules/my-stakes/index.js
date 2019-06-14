import React, { useEffect } from "react";
import { connect } from "react-redux";

import StakesList from "./components/list";
import LoginAlert from "../../components/login-alert";

import { myStakesActions } from "./my-stakes.actions";

const MyStakes = ({ dispatch, loggedIn, user, loading, loaded, data }) => {

    useEffect(()=>{
        if(user) {
            dispatch(myStakesActions.list(user.name))
        }
    }, [dispatch, user]);

    return (
        <div>
            <h2>My Stakes</h2>
            <br />
            <div className="stakes-list">
                {loggedIn && <StakesList loading={(loading && !loaded)} data={data} />}
                {!loggedIn && <LoginAlert message="Please login to view stakes." />}
            </div>
        </div>
    );
};

const mapStateToProps = _state => {
    const { loggedIn, user } = _state.auth;
    const { loading, loaded, data } = _state.mystakes;
    return { loggedIn, user, loading, loaded, data };
};

export default connect(mapStateToProps)(MyStakes);
