import { combineReducers } from 'redux';

import { auth } from "./auth.reducer";
import { dspservices } from "../modules/dsp-services/dsp-services.reducer";
import { dsp } from "../modules/dsp/dsp.reducer";
import { mystakes } from "../modules/my-stakes/my-stakes.reducer";
import { myunstakes } from "../modules/my-unstakes/my-unstakes.reducer";
import { actions } from "../modules/actions/actions.reducer";
import { dappresources } from "../modules/my-wallet/components/dapp-resources/dapp-resources.reducer";
import { dapphdlresources } from "../modules/my-wallet/components/dapphdl-resources/dapphdl.resources.reducer";
import { packagelist } from "../modules/package-list/package-list-reducer";

const rootReducer = combineReducers({
    auth,
    dspservices,
    dsp,
    mystakes,
    myunstakes,
    actions,
    dappresources,
    dapphdlresources,
    packagelist,
});

export default rootReducer;