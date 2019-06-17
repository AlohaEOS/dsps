import { commonService } from "../../services/common.service";
import appConfig from "../../config/app";

const fetchJSON = _jsonURL => {
    return commonService.postJSONRequest(appConfig.API, {json_url: _jsonURL});
};

const list = () => {
    return commonService.postRequest("https://api.main.alohaeos.com/v1/chain/get_table_rows", {
        code: "dappservices",
        index_position: 1,
        json: true,
        key_type: "",
        limit: 500,
        lower_bound: "",
        reverse: false,
        scope: "dappservices",
        show_payer: false,
        table: "package",
        table_key: "",
        upper_bound: ""
    });
};

const details = _url => {
    return commonService.getRequest(_url);
}

export const dspservicesService = {
    fetchJSON,
    list,
    details
};
