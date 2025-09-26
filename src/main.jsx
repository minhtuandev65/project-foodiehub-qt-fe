import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import './settings/config.jsx'
import "./assets/locales/i18n.jsx";
import App from './App.jsx'
import store from './redux/store.jsx';
import { Provider } from "react-redux";
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
