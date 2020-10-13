import {combineReducers} from 'redux';

import {latestCurrency} from './openExchange/latestCurrency.reducer';
import {staticCurrencyList} from './openExchange/staticCurrencyList.reducer';
import {exchangeCurrency} from './openExchange/exchangeCurrency.reducer';

import {ipData} from './ipData/ipData.reducer';

const rootReducer = combineReducers( {
	latestCurrency,
	staticCurrencyList,
	exchangeCurrency,

	ipData
} );

export default rootReducer;
