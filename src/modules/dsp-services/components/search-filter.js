import React, { useState } from "react";
import { connect } from "react-redux";
import { Row, FormGroup, Input, Col } from "reactstrap";

import { dspservicesActions } from "../dsp-services.actions";

import StatusServicesFilter from "./status-services-filter";

const SearchFilter = ({ dispatch, searchText }) => {
    const [text, setText] = useState(searchText);
   
    const handleChange = _e => {
        setText(_e.target.value);
        dispatch(dspservicesActions.search(_e.target.value, 'all'));
    };

    return (
        <div className="search-filter">
            <Row>
                <Col xs="12">
                    <StatusServicesFilter />
                    <Input className="search-input" autoComplete="off" type="search" placeholder="Search..." name="text" value={text} onChange={handleChange} />
                </Col>
            </Row>
        </div>
    );
};

export default connect()(SearchFilter);
