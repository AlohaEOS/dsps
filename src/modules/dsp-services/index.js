import React, { useEffect } from "react";
import { connect } from "react-redux";

import DSPServicesList from "./components/list";
import ActionModals from "../actions/components/modals";

import { dspservicesActions } from "./dsp-services.actions";

const DSPServices = ({ dispatch, loading, loaded, cols, results, filterField, searchText, sortCol }) => {
    useEffect(() => {
        if(!loaded)
            dispatch(dspservicesActions.list());
    }, [dispatch, loaded])

    return (
        <div>
            <h1>DAPP Service Provider Packages</h1>

            <ActionModals />

            <div className="dsp-packages-list">

                <DSPServicesList
                    loading={(loading && !loaded)}
                    cols={cols}
                    results={results}
                    filterField={filterField}
                    searchText={searchText}
                    sortCol={sortCol}
                    isSearchable={true}
                />

            </div>
        </div>
    )

}

const mapStateToProps = _state => {
    const { loading, loaded, cols, results, filterField, searchText, sortCol } = _state.dspservices;
    return { loading, loaded, cols, results, filterField, searchText, sortCol };
};

export default connect(mapStateToProps)(DSPServices);