import { dspConstants } from "./dsp.constants";
import { sort } from "../../helpers/utils";

const colsList = [{ caption: "Name", field: "dspName", sort: null,  class: "" }, { caption: "Account", field: "account", sort: null,  class: "text-center" }, { caption: "Location", field: "dspCountry", sort: null,  class: "text-center" }, { caption: "Packages", field: "totalPackages", sort: null,  class: "text-center" }, { caption: "Users", field: "totalUser", sort: null,  class: "text-center" }, { caption: "DAPP Staked", field: "totalStaked", sort: "desc", class: "text-center" }];

const initialState = {
    sortCol: { caption: "DAPP Staked", field: "totalStaked", sort: "desc" },
    stakes: null,
    providers: null,
    loading: false,
    loadingStakes: false,
    loaded: false,
    loadedStakes: false,
    cols: colsList
};

export function dsp(state = initialState, action) {
    let temp = null;
    let index = null;
    switch (action.type) {
        case dspConstants.FETCH_REQUEST:
            return {
                ...state,
                loading: true
            };
        case dspConstants.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                providers: sort(action.payload.data, state.sortCol.field, state.sortCol.sort)
            };
        case dspConstants.FETCH_FAILURE:
            return {
                ...state,
                loading: false
            };
        case dspConstants.SET_DETAILS:
            temp = state.providers;
            index = temp.findIndex(_el => _el.account === action.payload.data.account);
            let details = action.payload.data.details;

            temp[index].details = details;

            temp[index].dspName = details.name ? details.name : temp[index].account;
            temp[index].dspCountry = details.location ? `${details.location.name}, ${details.location.country}` : "";

            return {
                ...state,
                providers: [...sort(temp, state.sortCol.field, state.sortCol.sort)]
            };

        case dspConstants.SET_TOTAL_USER:
            temp = state.providers;
            index = temp.findIndex(_el => _el.account === action.payload.data.account);

            temp[index].totalUser = action.payload.data.total;

            return {
                ...state,
                providers: [...sort(temp, state.sortCol.field, state.sortCol.sort)]
            };

        case dspConstants.SET_TOTAL_STAKED:
            temp = state.providers;
            index = temp.findIndex(_el => _el.account === action.payload.data.account);

            temp[index].totalStaked = action.payload.data.total;

            return {
                ...state,
                providers: [...sort(temp, state.sortCol.field, state.sortCol.sort)]
            };

        case dspConstants.FETCH_STAKES_REQUEST:
            return {
                ...state,
                loadingStakes: true
            };
        case dspConstants.FETCH_STAKES_SUCCESS:
            return {
                ...state,
                loadingStakes: false,
                loadedStakes: true,
                stakes: action.payload.data
            };
        case dspConstants.FETCH_STAKES_FAILURE:
            return {
                ...state,
                loadingStakes: false
            };
        case dspConstants.SORT:
            temp = state.cols;
            let _col = action.payload.data;
            if (_col) {
                let index = state.cols.findIndex(_c => _c.field === _col.field);
                temp[index] = { ..._col, sort: _col.sort === "asc" ? "desc" : "asc" };
            }
            return {
                ...state,
                providers: sort(state.providers, _col.field, _col.sort === "asc" ? "desc" : "asc"),
                sortCol: _col,
                cols: [...temp]
            };
        default:
            return state;
    }
}
