import React from "react";
import {connect} from "react-redux";

import classNames from "classnames";

import {NavLink} from "react-router-dom";

import {openExchangeActions} from "../../../_actions";

import listPageStyles from "../CurrencyList/CurrencyList.styl";
import formStyles from "../../../_styles/form.styl";
import linkStyles from "../../../_styles/linkStyles.styl";
import labelStyles from "../../../_styles/labelStyles.styl";
import localStyles from "../CurrencyExchange/CurrencyExchange.styl";

class CurrencyExchange extends React.Component {
    constructor(props) {
        super(props);

        const actualCurrencyArray = ['UAH', 'GBP', 'EUR', 'RUB', 'PLN', 'USD'];
        const defaultFromValue = 'EUR';
        const defaultToValue = 'GBP';

        this.state = {
            actualCurrencyArray,
            fromExpand: false,
            toExpand: false,
            fromValue: defaultFromValue,
            toValue: defaultToValue,

            amountValue: 0,
            amountError: null
        }
    }

    componentDidMount() {
        const {
            staticCurrencyList
        } = this.props
        staticCurrencyList();
    }

    handleConvert = () => {
        const { convert } = this.props;
        const{ amountValue, fromValue, toValue } = this.state;
        if(amountValue > 0) {
            convert(amountValue, fromValue, toValue);
            this.setState({
                amountError: null
            })
        } else {
            this.setState({
                amountError: 'Amount expected to be greater than 0'
            })
        }
    }

    render() {

        const {staticCurrencyData, exchangeCurrencyValue} = this.props;
        let {actualCurrencyArray} = this.state;
        const { fromValue, toValue, amountValue, amountError } = this.state;
        const staticCurrencyOptionsFrom = staticCurrencyData && Object.keys(staticCurrencyData).map((key) => {
            if (actualCurrencyArray.includes(key)) {
                return (
                    <option value={key}> {key} </option>
                )
            }
        });

        const staticCurrencyOptionsTo = staticCurrencyData && Object.keys(staticCurrencyData).map((key) => {
            if (actualCurrencyArray.includes(key) && (key != fromValue) ) {
                return (
                    <option value={key}> {key} </option>
                )
            }
        });

        return (
            <div className={listPageStyles.currencyWrapper}>
                <div className={listPageStyles.currencyNav}>
                    <div className={classNames(linkStyles.link__wrapper, linkStyles.link_bottomSpace)}>
                        <NavLink
                            className={linkStyles.link}
                            to={{pathname: '/'}}
                        >Exchange rates</NavLink>
                    </div>

                    <h3
                        className={classNames(labelStyles.label, labelStyles.label_blue)}
                    >
                        <span>Currency converter</span>
                    </h3>
                </div>
                <div className={listPageStyles.currencyRightSide}>
                    <div className={listPageStyles.form}>
                        <div className={formStyles.form__row} >
                            <div
                                className={formStyles.form__group}
                            >
                                <label
                                    htmlFor="from"
                                    className={formStyles.label}

                                >
                                    select from
                                </label>
                                <select
                                    name="from"
                                    id="from"
                                    className={formStyles.select}
                                    onClick={ () =>    this.setState(function(prevState, props){
                                        return {fromExpand: !prevState.fromExpand }
                                    }) }
                                    onChange={ (e) => this.setState({
                                        fromValue: e.target.value
                                    }) }
                                    onBlur={ () => this.setState({ fromExpand: false }) }
                                >
                                    {staticCurrencyOptionsFrom}
                                </select>
                                <svg
                                    className={ classNames(formStyles.select__arrow, {
                                        [formStyles.select__arrow_expanded]: this.state.fromExpand
                                    }) }
                                    xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"
                                >
                                    <path d="M0 0h24v24H0V0z" fill="none"/><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                </svg>
                            </div>
                            <div className={formStyles.form__group}>
                                <label
                                    htmlFor="to"
                                    className={formStyles.label}
                                >
                                    select to
                                </label>
                                <select
                                    name="to"
                                    id="to"
                                    value={this.state.toValue}
                                    className={formStyles.select}
                                    onClick={ () => this.setState({ toExpand: true }) }
                                    onChange={ (e) => this.setState({
                                        toValue: e.target.value
                                    }) }
                                    onBlur={ () => this.setState({ toExpand: false }) }
                                >
                                    {staticCurrencyOptionsTo}
                                </select>
                                <svg
                                    className={ classNames(formStyles.select__arrow, {
                                        [formStyles.select__arrow_expanded]: this.state.toExpand
                                    }) }
                                    xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"
                                >
                                    <path d="M0 0h24v24H0V0z" fill="none"/><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                </svg>
                            </div>
                        </div>
                        <div className={classNames(formStyles.form__row, localStyles.form__row_amount)} >
                            <input
                                placeholder='Amount to exchange'
                                className={classNames(localStyles.amount, formStyles.form__control, {
                                    [formStyles.input__error]: amountError
                                } )}
                                type="text"
                                value={ amountValue }
                                onChange={event => this.setState({amountValue: event.target.value.replace(/\D/,'')})}
                            />
                            <div className={ localStyles.symbol__equal } >=</div>
                            <div className={ localStyles.symbol__result } >{exchangeCurrencyValue || 0} ({toValue})</div>
                        </div>
                        { amountError &&
                            <div className={ formStyles.error__text } >{ amountError }</div>
                        }

                        <button
                            onClick={ this.handleConvert }
                            className={ classNames(linkStyles.button, linkStyles.button_blue) }
                        >
                            Convert
                        </button>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    const {staticCurrencyList, exchangeCurrency} = state;
    return {
        staticCurrencyData: staticCurrencyList && staticCurrencyList.data,
        exchangeCurrencyValue: (exchangeCurrency && exchangeCurrency.data)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        staticCurrencyList: () => dispatch(openExchangeActions.staticCurrencyList()),
        convert: (value, from, to) => dispatch( openExchangeActions.convert(value, from, to) )
    }
};

const connectedCurrencyExchange = connect(mapStateToProps, mapDispatchToProps)(CurrencyExchange);

export {connectedCurrencyExchange as CurrencyExchange}