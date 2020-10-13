import React from 'react';
import { Router } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import {history, store} from './_helpers';
import { App } from './App';

render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
