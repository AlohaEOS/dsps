import React from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

import ServicesFilter from "./services-filter";
import StatusFilter from "./status-filter";

const StatusServicesFilter = () => {
    return (
        <UncontrolledDropdown>
            <DropdownToggle className="full-width" caret>Filter</DropdownToggle>
            <DropdownMenu>
                <DropdownItem header>Services</DropdownItem>
                <ServicesFilter />
                <DropdownItem header>Status</DropdownItem>
                <StatusFilter />
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};

export default StatusServicesFilter;
