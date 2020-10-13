import {currencyConstants} from '../../_constants';
import {openExchangeService} from '../../_services';

const latestCurrency = ( ipDataCurrency ) => {
    const request = () => {
        return {
            type: currencyConstants.CURRENCY_REQUEST
        }
    };
    const success = ( data ) => {
        return {
            type: currencyConstants.CURRENCY_SUCCESS,
            data: data ? data : null
        }
    };
    const failure = ( errorData ) => {
        return {
            type: currencyConstants.CURRENCY_FAILURE,
            error: errorData
        }
    };

    return dispatch => {
        dispatch( request() );
        openExchangeService.latestCurrency( ipDataCurrency )
            .then(
                info => dispatch( success( info ) ),
            ).catch(
            errorData => dispatch( failure( errorData ) )
        );
    };
};

const staticCurrencyList = () => {
    const request = () => {
        return {
            type: currencyConstants.STATIC_CURRENCY_REQUEST
        }
    };
    const success = ( data ) => {
        return {
            type: currencyConstants.STATIC_CURRENCY_SUCCESS,
            data: data ? data : null
        }
    };
    const failure = ( errorData ) => {
        return {
            type: currencyConstants.STATIC_CURRENCY_FAILURE,
            error: errorData
        }
    };

    return dispatch => {
        dispatch( request() );
        openExchangeService.staticCurrencyList()
            .then(
                info => dispatch( success( info ) ),
            ).catch(
            errorData => dispatch( failure( errorData ) )
        );
    };
}

const convert = (value, from, to) => {
    const request = () => {
        return {
            type: currencyConstants.CURRENCY_CONVERT_REQUEST
        }
    };
    const success = ( data ) => {
        return {
            type: currencyConstants.CURRENCY_CONVERT_SUCCESS,
            data: data ? data : null
        }
    };
    const failure = ( errorData ) => {
        return {
            type: currencyConstants.CURRENCY_CONVERT_FAILURE,
            error: errorData
        }
    };

    return dispatch => {
        dispatch( request() );
        openExchangeService.convert(value, from, to)
            .then(
                info => dispatch( success( info ) ),
            ).catch(
            errorData => dispatch( failure( errorData ) )
        );
    };
}

export const openExchangeActions = {
    latestCurrency,
    staticCurrencyList,
    convert
};
