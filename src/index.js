import React from 'react'
import { render } from "react-snapshot";
import App from './containers/App'

const rootElement = document.getElementById("root");
render(<App />, rootElement);
