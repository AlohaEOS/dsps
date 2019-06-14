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
                <Col xs="2" sm="2" md="2">
                    <StatusServicesFilter />
                </Col>
                <Col xs="10" sm="6" md="10">
                    <FormGroup>
                        <Input autoComplete="off" type="search" placeholder="Search..." name="text" value={text} onChange={handleChange} />
                    </FormGroup>
                </Col>
            </Row>
        </div>
    );
};

export default connect()(SearchFilter);
