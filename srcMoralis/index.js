import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import { MoralisProvider } from "react-moralis";


ReactDOM.render(
  <MoralisProvider
    appId="ev1Ce3kT0fAiF5JHs019rdSNDmNq4hOzWnKfRKWU" 
    serverUrl= "https://xb64gfjgflth.usemoralis.com:2053/server"
  >
    <App />
  </MoralisProvider>,
  document.getElementById("root"),
);