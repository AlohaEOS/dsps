import { myUnstakesService } from "./my-unstakes.services";
import { myUnstakesConstants } from "./my-unstakes.constants";


const list = _account => {
    return dispatch => {
        dispatch({ type: myUnstakesConstants.FETCH_REQUEST });
        myUnstakesService.list(_account).then(
            _res => {
                dispatch({
                    type: myUnstakesConstants.FETCH_SUCCESS,
                    payload: {
                        data: _res.rows
                    }
                });
            },
            _err => {
                dispatch({ type: myUnstakesConstants.FETCH_FAILURE });
            }
        );
    };
};


export const myUnstakesActions = {
    list,
};
