import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import {App} from 'components/App';
import Index from 'components/pages/Index';
import store from './store';
import './assets/styles/style';

ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Index} />
        </Route>
      </Router>
    </Provider>,
  document.getElementById('root'),
);
