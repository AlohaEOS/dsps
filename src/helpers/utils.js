import numeral from "numeral";

import appConfig from "../config/app";

import collection from "lodash/collection";

export function formatNumber(_num) {
    return numeral(_num).format('0,0[.][0000]');
}

export function convertHour(_sec) {
    let h = _sec / 3600;
    const m = _sec % 3600;
    if (m > 0) h = h.toFixed(2);
    return `${h}h`;
};

export function sort(_data, _field, _order) {
    let data = collection.sortBy(_data, [_d => {return _d[_field]}]);
    if(_order === "desc")
        data.reverse();
    return data;
}

export function formatQuota(_data) {
    let data = _data.toLowerCase().replace('quota', '');
    return parseFloat(data)
}

export function formatStake(_data) {
    if(_data) {
        let data = _data.split(' ');
        return parseFloat(data[0]);
    } else {
        return 0;
    }
}

export function getServiceCaption(_name) {
    let service = appConfig.SERVICES.find(_el => _el.value === _name);
    if(service)
        return service.caption;
    else
        return _name;
}