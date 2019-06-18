import { DappClient } from "dapp-client";
import fetch from "isomorphic-fetch";

import appConfig from "../../config/app";

const client = new DappClient(appConfig.DAPP_ENDPOINT, { fetch });

const list = _account => {
    return client.get_table_refunds(_account, {limit: 5000});
};

const listDAPPHDL = () => {
    return client.get_table_refunds(appConfig.ASSETS.DAPPHDL, {limit: 5000});
};

export const myUnstakesService = {
    list,
    listDAPPHDL,
};
