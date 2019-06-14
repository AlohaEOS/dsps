import { myStakesService } from "./my-stakes.services";
import { myStakesConstants } from "./my-stakes.constants";


const list = _account => {
    return dispatch => {
        dispatch({ type: myStakesConstants.FETCH_REQUEST });
        myStakesService.list(_account).then(
            _res => {
                dispatch({
                    type: myStakesConstants.FETCH_SUCCESS,
                    payload: {
                        data: _res.rows
                    }
                });
            },
            _err => {
                dispatch({ type: myStakesConstants.FETCH_FAILURE });
            }
        );
    };
};


export const myStakesActions = {
    list,
};
