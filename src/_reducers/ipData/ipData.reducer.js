import {ipDataConstants} from '../../_constants';

const initialState = {
    loading: false,
    success: false,
    data: null,
    error: null
};

export const ipData = ( state = initialState, action ) => {
    switch (action.type) {
        // GET_LIST
        case ipDataConstants.GET_CURRENCY_REQUEST:
            return {
                ...state,
                data: null,
                loading: true
            };
        case ipDataConstants.GET_CURRENCY_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                data: action.data ? action.data : null
            };
        case ipDataConstants.GET_CURRENCY_FAILURE:
            return {
                ...state,
                data: null,
                loading: false,
                error: action.error
            };

        default:
            return state
    }
};
