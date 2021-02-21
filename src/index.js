import React from 'react'
import { render } from "react-snapshot";
import App from './containers/App'
import {Provider} from 'react-redux'
import store from './store/store'

const rootElement = document.getElementById("root");

render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    rootElement
);