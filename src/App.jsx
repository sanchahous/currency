import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {CurrencyList} from "./components/Currency/CurrencyList/CurrencyList";
import {CurrencyExchange} from "./components/Currency/CurrencyExchange/CurrencyExchange";




class App extends React.Component {

  componentDidMount() {

  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {

  }

  render() {
    return (
        <React.Fragment>

          { alert.message &&
          <div className={ `alert ${ alert.type }` }>{ alert.message }</div>
          }

          <Switch>
            <Route
                exact
                path="/"
            >
              <CurrencyList />
            </Route>
            <Route path="/currency-exchange">
              <CurrencyExchange />
            </Route>
          </Switch>

        </React.Fragment>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {

  };
};

const connectedApp = connect( mapStateToProps )( withRouter(App) );
export {connectedApp as App};