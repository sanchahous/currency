import {handleResponse} from "../../_helpers";
import {jsonHeader} from "../../_helpers";

const latestCurrency = ( ipDataCurrency ) => {

    const listRequestOptions = {
        method: 'GET',
        headers: jsonHeader('currency'),
        body: null
    };

    const actualCurrencyArray = ['UAH','GBP','EUR','RUB','PLN','USD'];

    const index = actualCurrencyArray.indexOf(ipDataCurrency);
    actualCurrencyArray.splice(index, 1);

    // TODO According to https://openexchangerates.org API I can not set dynamic base value.
    // This is a paid service.
    // Instead of use static value ( usd ) I suggest to use value from params ( ipDataCurrency )
    return fetch(
        `https://openexchangerates.org/api/latest.json?&base=usd&symbols=${ actualCurrencyArray.join(',') }`, listRequestOptions )
        .then( ( response ) => handleResponse( response ) )
};

const staticCurrencyList = () => {
    const listRequestOptions = {
        method: 'GET',
        headers: jsonHeader('currency')
    };

    return fetch(
        `https://openexchangerates.org/api/currencies.json`, listRequestOptions )
        .then( ( response ) => handleResponse( response ) )
}

// TODO According to https://openexchangerates.org API I can not get convert value.
// This is a paid service.
// Instead of use Math random value I suggest to use value from API answer
const convert = (value, from, to) => {
    const listRequestOptions = {
        method: 'GET',
        headers: jsonHeader('currency')
    };

    return fetch(
        `https://openexchangerates.org/api/convert.json/${value}/${from}/${to}`, listRequestOptions )
        .then( ( response ) => handleResponse( response ) )
}

export const openExchangeService = {
    latestCurrency,
    staticCurrencyList,
    convert
};
