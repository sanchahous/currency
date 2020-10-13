import {handleResponse} from "../../_helpers";
import {jsonHeader} from "../../_helpers";

const getCurrencyByIp = () => {

    const listRequestOptions = {
        method: 'GET',
        body: null
    };

    return fetch(
        `https://ipfind.co/me?auth=324e7ed0-baae-456a-839a-58537516522a`, listRequestOptions )
        .then( ( response ) => handleResponse( response ) )
};

export const ipDataServices = {
    getCurrencyByIp
};
