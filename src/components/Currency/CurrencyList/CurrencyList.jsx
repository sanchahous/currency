import React from "react";
import {connect} from "react-redux";

import {NavLink} from "react-router-dom";

import {ipDataActions, openExchangeActions} from "../../../_actions";

import classNames from 'classnames';

import localStyles from './CurrencyList.styl'
import labelStyles from '../../../_styles/labelStyles.styl'
import linkStyles from '../../../_styles/linkStyles.styl'

class CurrencyList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            favoriteRates: localStorage && JSON.parse(localStorage.getItem('favoriteCurrenciesList')) || []
        }
    }

    componentDidMount() {
        const {
            staticCurrencyList,
            getCurrencyByIp
        } = this.props
        staticCurrencyList();
        getCurrencyByIp();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {latestCurrency, ipData} = this.props;
        const ipDataCurrency = ipData && ipData.currency;
        const prevIpDataCurrency = prevProps.ipData && prevProps.ipData.currency;

        (prevIpDataCurrency !== ipDataCurrency) && latestCurrency(ipDataCurrency);
    }

    manageFavoriteCurrencies = (rate) => {
        this.setState((prevState) => {
            const prevRatesList = prevState.favoriteRates;
            if (!prevRatesList.includes(rate)) {
                return {
                    favoriteRates: [...prevRatesList, rate]
                }
            } else {
                const index = prevRatesList.indexOf(rate);
                prevRatesList.splice(index, 1);

                return {
                    favoriteRates: prevRatesList
                }
            }
        }, () => {
            const currentFavoriteRates = this.state.favoriteRates;
            localStorage.setItem('favoriteCurrenciesList', JSON.stringify(currentFavoriteRates));
        });
    }

    render() {
        const {
            staticCurrencyData,
            ipData,
        } = this.props;

        let {rates} = this.props;

        const {favoriteRates} = this.state;

        const ipDataCurrency = ipData && ipData.currency;
        const basicCurrencyCountry = (staticCurrencyData && (ipDataCurrency in staticCurrencyData)) && staticCurrencyData[ipDataCurrency];

        const filteredArray = rates && Object.keys(rates).filter(el => !favoriteRates.includes(el));
        const finalArray = favoriteRates && filteredArray && [...favoriteRates, ...filteredArray];

        const mapCurrencies = finalArray && finalArray.map((rate, i) => (
            <div
                className={localStyles.currencyList__row}
                key={rate}
            >
                <div
                    onClick={() => this.manageFavoriteCurrencies(rate)}
                    className={
                        classNames(
                            localStyles.currencyList__item,
                            {
                                [localStyles.currencyList__item_active]: favoriteRates && favoriteRates.includes(rate)
                            }
                        )
                    }
                >
                    <svg
                        className={localStyles.currencyList__star}
                        xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path d="M0 0h24v24H0V0z" fill="none"/>
                        <path
                            d="M12 7.13l.97 2.29.47 1.11 1.2.1 2.47.21-1.88 1.63-.91.79.27 1.18.56 2.41-2.12-1.28-1.03-.64-1.03.62-2.12 1.28.56-2.41.27-1.18-.91-.79-1.88-1.63 2.47-.21 1.2-.1.47-1.11.97-2.27M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/>
                    </svg>
                    <span>{rate}</span>
                </div>
                <div className={localStyles.currencyList__item}>
                    {(staticCurrencyData && (rate in staticCurrencyData)) && staticCurrencyData[rate]}
                </div>
                <div className={localStyles.currencyList__item}>
                    {rates[rate]}
                </div>
            </div>
        ));

        return (
            <div className={localStyles.currencyWrapper}>
                <div className={localStyles.currencyNav}>
                    <div className={classNames(linkStyles.link__wrapper, linkStyles.link_bottomSpace)}>
                        <NavLink
                            className={linkStyles.link}
                            to={{pathname: '/currency-exchange'}}
                        >Currency converter</NavLink>
                    </div>

                    <h3
                        className={classNames(labelStyles.label, labelStyles.label_blue)}
                    >
                        <span>Exchange rates</span>
                    </h3>
                </div>
                <div className={localStyles.currencyRightSide}>
                    <div className={localStyles.currencyList__title}>
                        <strong>{basicCurrencyCountry}</strong> currency exchange rates
                    </div>
                    <div className={localStyles.currencyList}>
                        <div className={localStyles.currencyList__header}>
                            <strong className={localStyles.currencyList__strong}>Currency</strong>
                            <strong className={localStyles.currencyList__strong}>Currency name</strong>
                            <strong className={localStyles.currencyList__strong}>Exchange rate =
                                1 {ipDataCurrency}</strong>
                        </div>
                        <div className={localStyles.currencyList__body}>
                            {mapCurrencies}
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

const mapStateToProps = (state) => {
    const {latestCurrency, staticCurrencyList, ipData} = state;
    return {
        rates: latestCurrency && latestCurrency.data && latestCurrency.data.rates,
        ipData: ipData && ipData.data,
        staticCurrencyData: staticCurrencyList && staticCurrencyList.data
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        latestCurrency: (ipDataCurrency) => dispatch(openExchangeActions.latestCurrency(ipDataCurrency)),
        staticCurrencyList: () => dispatch(openExchangeActions.staticCurrencyList()),
        getCurrencyByIp: () => dispatch(ipDataActions.getCurrencyByIp()),
    }
};

const connectedCurrencyList = connect(mapStateToProps, mapDispatchToProps)(CurrencyList);

export {connectedCurrencyList as CurrencyList}

