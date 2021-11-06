import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import './assets/css/stylesheet.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router} from 'react-router-dom';
import store from "./redux/store";
import {Provider} from "react-redux";
import {persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";

let persistor = persistStore(store);

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
        <App/>
            </PersistGate>
        </Provider>
    </Router>
    ,
    document.querySelector('#root'));