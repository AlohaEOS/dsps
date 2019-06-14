import { DappClient } from "dapp-client";
import fetch from "isomorphic-fetch";

import appConfig from "../../../../config/app";

const client = new DappClient(appConfig.DAPP_ENDPOINT, { fetch });

const getAvailableBalance = _account => {
    return client.get_currency_balance(appConfig.ASSETS['DAPPHDL'], _account, "DAPPHDL");
};

const getAccount = _account => {
    return  client.get_dapphdl_accounts(_account, { limit: 1 })
}

export const dapphdlResourcesServices = {
    getAvailableBalance,
    getAccount
};
