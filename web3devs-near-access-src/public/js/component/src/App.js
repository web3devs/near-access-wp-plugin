import { useState, useEffect } from 'react';
import logo from './logo.svg';
import * as nearAPI from 'near-api-js';
import './App.css';
import { Buffer } from 'buffer';

window.Buffer = window.Buffer || Buffer;

const getConfig = (network) => {
  switch (network) {
    case 'mainnet':
      return {
        networkId: 'mainnet',
        nodeUrl: 'https://rpc.mainnet.near.org',
        contractName: 'near',
        walletUrl: 'https://wallet.near.org',
        helperUrl: 'https://helper.mainnet.near.org'
      }
    default:
      return {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        contractName: 'testnet',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org'
      }
  }
}

const App = ({
  development,
  tokenName, //Label
  tokenAddress, //contract address with optional token IDs, ex. "latium.mintspace2.testnet:0,6"
  network, //testnet or mainnet
  callback, //callback URL to send signature to
  message,
}) => {
  const [prefix, setPrefix] = useState(''); //static assets prefix, use like this: <img src={prefix + logo}...
  const [contractAddress, setContractAddress] = useState(undefined);
  const [explorer, setExplorer] = useState('https://testnet.nearblocks.io/address/');

  const [accountID, setAccountID] = useState(undefined);

  useEffect(() => {
    const [ca] = tokenAddress.split(':');
    setContractAddress(ca);
  }, [tokenAddress]);

  useEffect(() => {
    setPrefix(!development ? '/wp-content/plugins/web3devs-near-access/public/js/component/build' : '');
  }, [development]);

  useEffect(() => {
    switch (network) {
      case 'mainnet':
        setExplorer('https://nearblocks.io/address/');
        break;
      default:
        setExplorer('https://testnet.nearblocks.io/address/');
        break;
    }
  }, [network]);

  useEffect(() => {
    const f = async () => {
      window.nearConfig = getConfig(network);

      // Initializing connection to the NEAR node.
      window.near = await nearAPI.connect(Object.assign({ deps: { keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore() } }, window.nearConfig));
  
      // Initializing Wallet based Account. It can work with NEAR TestNet wallet that
      // is hosted at https://wallet.testnet.near.org
      window.walletAccount = new nearAPI.WalletAccount(window.near);
  
      // Getting the Account ID. If unauthorized yet, it's just empty string.
      window.accountId = window.walletAccount.getAccountId();

      if (window.accountId) {
        setAccountID(window.accountId);
      }
    };
    f();
  }, [network]);

  const connect = async () => {
    window.walletAccount.requestSignIn(
      // The contract name that would be authorized to be called by the user's account.
      window.nearConfig.contractName,
      // This is the app name. It can be anything.
      'NEAR Access',
      // We can also provide URLs to redirect on success and failure.
      // The current URL is used by default.
    );
  };

  const disconnect = async () => {};
  
  const sign = async () => {
    console.log('Signing message: ', message);

    const keyPair = await window.near.connection.signer.keyStore.getKey(network, accountID);
    const sig = keyPair.sign(Buffer.from(message));

    // console.log('signature: ', signature);

    const publicKey = Buffer.from(sig.publicKey.data).toString('hex');
    const signature = Buffer.from(sig.signature).toString('hex');
    console.log('PublicKey: ', publicKey);
    console.log('Signature: ', signature);

    const response = await fetch(callback, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        accountID,
        network,
        signature,
        publicKey,
      })
    });

    const r = await response.json();

    console.log('RESPONSE: ', r);
  };

  return (
    <div className="web3devs-near-access">
      <img src={prefix + logo} alt="" style={{ width: '300px', float: 'left' }} />
      <div>
        <div>Hey, you need <strong>{tokenName}</strong> to access this content</div>
        <div>See <a href={`${explorer}${contractAddress}`} target="_blank" rel="noreferrer">here</a></div>
        {
          !accountID && (
            <button onClick={connect}>Connect</button>
          )
        }

        {
          accountID && (
            <>
              <button onClick={disconnect}>Disconnect?</button>
              <button onClick={sign}>Sign</button>
            </>
        )
        }
      </div>
    </div>
  );
}

export default App;
