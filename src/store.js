import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux';

import reducer from './reducer';

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
