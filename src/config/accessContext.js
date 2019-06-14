import { initAccessContext } from "eos-transit";
import scatter from 'eos-transit-scatter-provider';
import ledger from 'eos-transit-ledger-provider';
import lynx from 'eos-transit-lynx-provider';
import meetone from 'eos-transit-meetone-provider';
import tokenpocket from 'eos-transit-tokenpocket-provider';

import appConfig from "./app";

const accessContext = initAccessContext({
    appName: "AlohaEOS",
    network: appConfig.NETWORK,
    walletProviders: [
        scatter(),
        ledger(),
        lynx(),
        meetone(),
        tokenpocket()
    ]
});

export default accessContext;