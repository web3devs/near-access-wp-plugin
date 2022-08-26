import React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

class Component extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const r = document.createElement("div");
    const root = ReactDOM.createRoot(r)
    root.render(
      <App
        development={this.getAttribute('development')}
        tokenName={this.getAttribute('tokenName')}
        tokenAddress={this.getAttribute('tokenAddress')}
        network={this.getAttribute('network')}
        callback={this.getAttribute('callback')}
        message={this.getAttribute('message')}
      />
    );

    shadow.appendChild(r);
  }
}

customElements.define("web-greeting", Component)

if (process.env.REACT_APP_IS_DEV) {
  const root = ReactDOM.createRoot(document.getElementById('web3devs-near-access-root'));
  root.render(
    <React.StrictMode>
      <div style={{width: '75%', margin: '1rem auto' }}>
        <h1>Lorem ipsum dolores siton face</h1>
        <p>Lorem ipsum dolores siton face</p>
        <p>Lorem ipsum dolores siton face</p>
        <p>Lorem ipsum dolores siton face</p>
        <p>Lorem ipsum dolores siton face</p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
          <App
            development={true}
            tokenName={'BAZINGA'}
            tokenAddress={'latium.mintspace2.testnet:0'}
            network={'testnet'}
            callback={'http://localhost:8001/?p=5&web3devs-near-access-callback='}
            message={'a530ecea0e35e83242d07d1a856fd96125901b7c6eba1b5ecfee023b749077b0'}
          />
        </div>
        <p>Lorem ipsum dolores siton face</p>
        <p>Lorem ipsum dolores siton face</p>
        <p>Lorem ipsum dolores siton face</p>
        <p>Lorem ipsum dolores siton face</p>
        <p>Lorem ipsum dolores siton face</p>
      </div>
    </React.StrictMode>
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}
