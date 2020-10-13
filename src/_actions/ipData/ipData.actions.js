import {ipDataConstants} from '../../_constants';
import {ipDataServices} from '../../_services';

const getCurrencyByIp = () => {
    const request = () => {
        return {
            type: ipDataConstants.GET_CURRENCY_REQUEST
        }
    };
    const success = ( data ) => {
        return {
            type: ipDataConstants.GET_CURRENCY_SUCCESS,
            data: data || null
        }
    };
    const failure = ( errorData ) => {
        return {
            type: ipDataConstants.GET_CURRENCY_FAILURE,
            error: errorData
        }
    };

    return dispatch => {
        dispatch( request() );
        ipDataServices.getCurrencyByIp()
            .then(
                info => dispatch( success( info ) ),
            ).catch(
            errorData => dispatch( failure( errorData ) )
        );
    };
};

export const ipDataActions = {
    getCurrencyByIp
};
