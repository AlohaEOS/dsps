import React from "react";
import { connect } from "react-redux";
import { CustomInput, DropdownItem } from "reactstrap";

import { packagelistActions } from "../package-list.actions";

const StatusFilter = ({ dispatch, status }) => {
    const statusList = [
        {
            caption: "Active",
            value: "active"
        },
        // {
        //     caption: "Selected",
        //     value: "selected"
        // },
        // {
        //     caption: "Deprecated",
        //     value: "deprecated"
        // }
    ];

    const handleChange = _e => {
        dispatch(
            packagelistActions.filterStatus({
                status: _e.target.checked,
                value: _e.target.value
            })
        );
    };

    return (
        <React.Fragment>
            {statusList.map((_s, _i) => {
                return (
                    <DropdownItem key={`item-${_i}`} toggle={false}>
                        <CustomInput defaultChecked={status && status.includes(_s.value)} onClick={handleChange} type="switch" id={_s.value} value={_s.value} label={_s.caption} />
                    </DropdownItem>
                );
            })}
        </React.Fragment>
    );
};

const mapStateToProps = _state => {
    const { status } = _state.packagelist;
    return {
        status
    };
};

export default connect(mapStateToProps)(StatusFilter);
