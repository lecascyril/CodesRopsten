import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import { MoralisProvider } from "react-moralis";


ReactDOM.render(
  <MoralisProvider
    appId="" 
    serverUrl= ""
  >
    <App />
  </MoralisProvider>,
  document.getElementById("root"),
);
