import { DappClient } from "dapp-client";
import fetch from "isomorphic-fetch";

import appConfig from "../../config/app";

const client = new DappClient(appConfig.DAPP_ENDPOINT, { fetch });

const accountext = () => {
    return client.get_table_accountext({scope: '......2ke1.o4', limit: 5000});
};

export const dspServices = {
    accountext
};
