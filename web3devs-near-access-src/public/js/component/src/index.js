import React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

class Component extends HTMLElement {
  constructor() {
    super();

    console.log('XXX: ', this, this.getAttribute('tokenaddress'));

    const shadow = this.attachShadow({ mode: "open" });
    const r = document.createElement("div");
    const root = ReactDOM.createRoot(r)
    root.render(
      <App
        development={this.getAttribute('development')}
        tokenName={this.getAttribute('tokenName')}
        tokenAddress={this.getAttribute('tokenAddress')}
        network={this.getAttribute('network')}
      />
    );

    shadow.appendChild(r);
  }
}

customElements.define("web-greeting", Component)

const root = ReactDOM.createRoot(document.getElementById('web3devs-near-access-root'));
root.render(
  <React.StrictMode>
    <App
      development={true}
      tokenName={'BAZINGA'}
      tokenAddress={'latium.mintspace2.testnet:6'}
      network={'testnet'}
      callback={'http://localhost:8001/?p=5&web3devs-near-access-callback='}
      message={'2cdbff67fafdce01604bcb5c4427c0de9ac726f47ed16581572718da191143ae'}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
