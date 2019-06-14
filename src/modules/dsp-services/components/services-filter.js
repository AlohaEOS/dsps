import React from "react";
import { connect } from "react-redux";
import { CustomInput, DropdownItem } from "reactstrap";

import { dspservicesActions } from "../dsp-services.actions";
import appConfig from "../../../config/app"

const ServicesFilter = ({ dispatch, services }) => {
    const servicesList = appConfig.SERVICES;

    const handleChange = _e => {
        dispatch(
            dspservicesActions.filterServices({
                status: _e.target.checked,
                value: _e.target.value
            })
        );
    };

    return (
        <React.Fragment>
            {servicesList.map((_s, _i) => {
                return (
                    <DropdownItem key={`item-${_i}`} toggle={false}>
                        <CustomInput defaultChecked={services && services.includes(_s.value)} onClick={handleChange} type="switch" id={_s.value} value={_s.value} label={_s.caption} />
                    </DropdownItem>
                );
            })}
        </React.Fragment>
    );
};

const mapStateToProps = _state => {
    const { services } = _state.dspservices;
    return {
        services
    };
};

export default connect(mapStateToProps)(ServicesFilter);
