import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import * as serviceWorker from 'serviceWorker';

import rootReducer from 'reducers';

import { RootRouter } from 'router';

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <RootRouter />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
