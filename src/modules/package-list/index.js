import React from "react";
import { connect } from "react-redux";

import DSPServicesList from "./components/list";
import ActionModals from "../actions/components/modals";

const PackagesTable = ({ cols, results, filterField, searchText, sortCol, search }) => {
    return (
        <div className="dsp-packages-list">
            <ActionModals />

            <DSPServicesList cols={cols} results={results} filterField={filterField} searchText={searchText} sortCol={sortCol} search={search} />
        </div>
    );
};

const mapStateToProps = _state => {
    const { cols, results, filterField, searchText, sortCol } = _state.packagelist;
    return { cols, results, filterField, searchText, sortCol };
};

export default connect(mapStateToProps)(PackagesTable);
