import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import AppContainer from 'components/App/AppContainer';
import Index from 'components/pages/Index';
import store from './store';
import './assets/styles/style';

ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={AppContainer}>
          <IndexRoute component={Index} />
        </Route>
      </Router>
    </Provider>,
  document.getElementById('root'),
);
