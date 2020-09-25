import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import todoReducer from './store/reducers/todo';


const rootReducer = combineReducers({
    td: todoReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
