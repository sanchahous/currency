import {currencyConstants} from '../../_constants';

const initialState = {
    loading: false,
    success: false,
    data: null,
    error: null
};

function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export const exchangeCurrency = ( state = initialState, action ) => {
    switch (action.type) {
        // GET_LIST
        case currencyConstants.CURRENCY_CONVERT_REQUEST:
            return {
                ...state,
                data: null,
                loading: true
            };
        case currencyConstants.CURRENCY_CONVERT_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                data: action.data ? action.data : null
            };
        case currencyConstants.CURRENCY_CONVERT_FAILURE:
            return {
                ...state,
                data: randomInteger(1, 100), // According to https://openexchangerates.org API
                                            // I can not get convert value on a free acc. randomInteger used instead
                loading: false,
                error: action.error
            };

        default:
            return state
    }
};
