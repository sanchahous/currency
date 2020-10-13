import {currencyConstants} from '../../_constants';

const initialState = {
    loading: false,
    success: false,
    data: null,
    error: null
};

export const latestCurrency = ( state = initialState, action ) => {
    switch (action.type) {
        // GET_LIST
        case currencyConstants.CURRENCY_REQUEST:
            return {
                ...state,
                data: null,
                loading: true
            };
        case currencyConstants.CURRENCY_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                data: action.data ? action.data : null
            };
        case currencyConstants.CURRENCY_FAILURE:
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
