import React, { useEffect } from "react";
import { connect } from "react-redux";
import DSPList from "./components/list";

import { dspActions } from "./dsp.actions";

const DSP = (props) => {
    const { dispatch, providers, loading, loaded, stakes, loadingStakes, loadedStakes, cols, sortCol } = props;

    useEffect(() => {
        if(!loaded)
            dispatch(dspActions.packageList());
            dispatch(dspActions.stakesList());
    }, [dispatch, loaded])

    return (
        <div>
            <h2>Providers</h2>
            <br />
            <div className="dsp-list">
                <DSPList 
                    cols={cols}
                    sortCol={sortCol}
                    loading={loading && !loaded}
                    providers={providers}
                    stakes={stakes}
                    loadingStakes={loadingStakes && !loadedStakes}
                />
            </div>
        </div>
    );
};


const mapStateToProps = _state => {
    const { providers, loading, loaded, stakes, loadingStakes, loadedStakes, cols, sortCol } = _state.dsp;
    return { providers, loading, loaded, stakes, loadingStakes, loadedStakes, cols, sortCol };
};

export default connect(mapStateToProps)(DSP);
