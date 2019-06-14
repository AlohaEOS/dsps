import { convertHour, formatNumber, sort } from "../../helpers/utils";
import { dspservicesConstants } from "./dsp-services.constants";
const colsList = [
    { caption: "ID", field: "package_id", sort: "asc", class: "" },
    { caption: "Service", field: "service_caption", sort: "asc", class: "text-center" },
    { caption: "Provider", field: "provider", sort: "asc", class: "text-center" },
    { caption: "Quota", field: "quota_formatted", sort: "asc", format: formatNumber, class: "text-center" },
    { caption: "Package Period", field: "package_period", sort: "asc", format: convertHour, class: "text-center" },
    { caption: "Min Stake", field: "min_stake_quantity_formatted", format: formatNumber, class: "text-center", sort: "asc" },
    { caption: "Unstake Period", field: "min_unstake_period", sort: "asc", format: convertHour, class: "text-center" }
]

const initialState = {
    loaded: false,
    loading: false,
    filterField: "all",
    sortCol: colsList[(Math.floor(Math.random() * colsList.length) + 1)-1],
    searchText: "",
    orig: null,
    results: null,
    services: [],
    status: ['active'],
    cols: colsList,

    loadingDetails: false,
    details: null,
    viewDetails: false
};

const getInfo = (_data, _id, _package_id, _provider) => {
    let info = _data.find(_r => {
        return _r.id === _id && _r.package_id === _package_id && _r.provider === _provider;
    });
    let index = _data.findIndex(_r => {
        return _r.id === _id && _r.package_id === _package_id && _r.provider === _provider;
    });
    return { info, index };
};

const search = (_data, _filter, _text, _cols) => {
    return _data.filter(_res => {
        if (_filter !== "all") {
            if(_filter !== 'provider') {
                return `${_res[_filter]}`.toLowerCase().indexOf(_text.toLowerCase()) !== -1;
            } else {
                return(
                    `${_res.provider}`.toLowerCase().indexOf(_text.toLowerCase()) !== -1 ||
                    `${_res.package_id}`.toLowerCase().indexOf(_text.toLowerCase()) !== -1 ||
                    `${_res.service}`.toLowerCase().indexOf(_text.toLowerCase()) !== -1
                )
            }
        } else {
            let include = false;
            _cols.forEach(_col => {
                if (`${_res[_col.field]}`.toLowerCase().indexOf(_text.toLowerCase()) !== -1) include = true;
            });
            return include;
        }
    });
};

const filterServices = (_data, _services) => {
    return _services.length > 0 ? _data.filter(_e => _services.includes(_e.service)) : _data;
};

const filterStatus = (_data, _status) => {
    if (_status.length > 0) {
        _data = _data.filter(_e => {
            if (_status.includes("active") && _e.api_endpoint !== "null") return true;
            if (_status.includes("deprecated") && _e.api_endpoint === "null") return true;
            if (_status.includes("selected") && _e.enabled === 0) return true;
            return false;
        });
    }
    return _data;
};

export function dspservices(state = initialState, action) {
    let temp = null;
    let temp2 = null;
    switch (action.type) {
        case dspservicesConstants.CLOSE_DETAILS:
            return {
                ...state,
                details: null,
                viewDetails: false
            };
        case dspservicesConstants.DETAILS_REQUEST:
            return {
                ...state,
                viewDetails: false,
                loadingDetails: true
            };
        case dspservicesConstants.DETAILS_SUCCESS:
            return {
                ...state,
                loadingDetails: false,
                viewDetails: true,
                details: {
                    data: action.payload.data.details,
                    info: action.payload.data.info
                }
            };
        case dspservicesConstants.DETAILS_FAILURE:
            return {
                ...state,
                viewDetails: true,
                details: null,
                loadingDetails: false
            };

        case dspservicesConstants.FETCH_REQUEST:
            return {
                ...state,
                loading: true
            };
        case dspservicesConstants.FETCH_SUCCESS:
            let data = sort(filterStatus(filterServices(search(action.payload.data, state.filterField, state.searchText, state.cols), state.services), state.status), state.sortCol.field, state.sortCol.sort);
            return {
                ...state,
                loading: false,
                loaded: true,
                results: data,
                orig: action.payload.data
            };
        case dspservicesConstants.FETCH_FAILURE:
            return {
                ...state,
                loading: false
            };
        case dspservicesConstants.SORT:
            temp = state.cols;
            let _col = action.payload.data;
            if (_col) {
                let index = state.cols.findIndex(_c => _c.field === _col.field);
                temp[index] = { ..._col, sort: _col.sort === "asc" ? "desc" : "asc" };
            }
            return {
                ...state,
                results: sort(state.results, _col.field, _col.sort === "asc" ? "desc" : "asc"),
                sortCol: _col,
                cols: [...temp]
            };
        case dspservicesConstants.SEARCH:
            let _text = action.payload.data.text;
            let _filter = action.payload.data.filter;
            temp = state.orig;
            if (_text.trim() !== "") {
                temp = search(state.orig, _filter, _text, state.cols);
            }
            return {
                ...state,
                searchText: _text,
                filterField: _filter,
                results: filterStatus(filterServices(sort(temp, state.sortCol.field, state.sortCol.sort), state.services), state.status)
            };
        case dspservicesConstants.SET_DETAILS:
            temp = state.results;
            let res = getInfo(temp, action.payload.data.id, action.payload.data.package_id, action.payload.data.provider);
            if(res && res.info) {
                res.info.details = action.payload.data.details;
                temp[res.index] = { ...res.info };
            }

            temp2 = state.orig;
            let res2 = getInfo(temp2, action.payload.data.id, action.payload.data.package_id, action.payload.data.provider);
            if(res2 && res2.info) {
                res2.info.details = action.payload.data.details;
                temp2[res2.index] = { ...res2.info };
            }

            return {
                ...state,
                results: [...temp],
                orig: [...temp2],
            };
        case dspservicesConstants.SET_DSP:
            temp = state.results;
            let ress = getInfo(temp, action.payload.data.id, action.payload.data.package_id, action.payload.data.provider);
            if(ress && ress.info) {
                ress.info.details = action.payload.data.details;
                temp[ress.index] = { ...ress.info };
            }

            temp2 = state.orig;
            let ress2 = getInfo(temp2, action.payload.data.id, action.payload.data.package_id, action.payload.data.provider);
            if(ress2 && ress2.info) {
                ress2.info.details = action.payload.data.details;
                temp2[ress2.index] = { ...ress2.info };
            }
            
            return {
                ...state,
                results: [...temp],
                orig: [...temp2],
            };
        case dspservicesConstants.FILTER_SERVICES:
            temp = state.services;
            if (action.payload.data.status === true) temp.push(action.payload.data.value);
            else temp = temp.filter(_e => _e !== action.payload.data.value);

            let sr = filterStatus(filterServices(search(state.orig, state.filterField, state.searchText, state.cols), temp), state.status);
            return {
                ...state,
                results: [...sort(sr, state.sortCol.field, state.sortCol.sort)],
                services: [...temp]
            };
        case dspservicesConstants.FILTER_STATUS:
            temp = state.status;
            if (action.payload.data.status === true) temp.push(action.payload.data.value);
            else temp = temp.filter(_e => _e !== action.payload.data.value);

            let srs = filterStatus(filterServices(search(state.orig, state.filterField, state.searchText, state.cols), state.services), temp);
            return {
                ...state,
                results: [...sort(srs, state.sortCol.field, state.sortCol.sort)],
                status: [...temp]
            };
        default:
            return state;
    }
}
