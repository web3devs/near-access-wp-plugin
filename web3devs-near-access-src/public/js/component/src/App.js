import { useState, useEffect } from 'react';
import * as nearAPI from 'near-api-js';
import { Buffer } from 'buffer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

library.add(faCircleXmark);
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

const Wrapper = ({ children }) => {
  const style = {
    display: 'inline-block',
    clear: 'both',
    overflow: 'hidden',
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0px 0px 20px -5px rgba(66, 68, 90, 1)',
    color: '#f35c5d',
  };

  return (<div style={style}>{children}</div>);
}

const Icon = () => {
  const s = 125;

  const style = {
    width: `${s+10}px`,
    height: `${s+10}px`,
    fontSize: `${s}px`,
    display: 'inline-block',
    float: 'left',
  };

  return (
    <i style={style}>
      <FontAwesomeIcon icon="fa-solid fa-circle-xmark" color="#f35c5d" />
    </i>
  );
}
const MainBox = ({ children }) => {
  const style = {
    display: 'inline-block',
    marginLeft: '1rem',
  };

  return (<div style={style}>
    <h1 style={{ textDecoration: 'underline' }}>Access denied</h1>
    {children}
  </div>);
}

const TokenButton = ({ url, name }) => {
  const [hover, setHover] = useState(false);
  const [style, setStyle] = useState({
    textDecoration: 'none',
    fontWeight: 'bold',
    color: '#9f4290',
    transition: 'color 0.5s ease',
  });

  useEffect(() => {
    setStyle(style => {
      if (hover) {
        return { ...style, color: '#9f4290' };
      }

      return { ...style, color: '#f35c5d' };
    })
  }, [hover]);

  return (
    <a style={style} href={url} target="_blank" rel="noreferrer" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>{name}</a>
  );
};

const ActionButton = ({ onClick, label }) => {
  const [hover, setHover] = useState(false);
  const [style, setStyle] = useState({
    textDecoration: 'none',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#f35c5d',
    borderRadius: '25px',
    border: 0,
    outline: 0,
    padding: '0.5rem 4rem',
    display: 'inline-block',
    cursor: 'pointer',
    height: '60px',
    fontSize: '26px',
    transition: 'background-color 0.5s ease',
  });

  useEffect(() => {
    setStyle(style => {
      if (hover) {
        return { ...style, backgroundColor: '#9f4290'};
      }

      return { ...style, backgroundColor: '#f35c5d' };
    })
  }, [hover]);

  return (
    <button style={style} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>{label}</button>
  );
};

const ActionButtonLink = ({ onClick, label }) => {
  const [hover, setHover] = useState(false);
  const [style, setStyle] = useState({
    textDecoration: 'none',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#f35c5d',
    backgroundColor: '#fff',
    border: 0,
    outline: 0,
    padding: '0.5rem 2rem',
    display: 'inline-block',
    cursor: 'pointer',
    height: '20px',
    fontSize: '16px',
    transition: 'color 0.5s ease',
  });

  useEffect(() => {
    setStyle(style => {
      if (hover) {
        return { ...style, color: '#9f4290' };
      }

      return { ...style, color: '#f35c5d' };
    })
  }, [hover]);

  return (
    <button style={style} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>{label}</button>
  );
};

const App = ({
  development,
  tokenName, //Label
  tokenAddress, //contract address with optional token IDs, ex. "latium.mintspace2.testnet:0,6"
  network, //testnet or mainnet
  callback, //callback URL to send signature to
  message,
}) => {
  const [contractAddress, setContractAddress] = useState(undefined);
  const [explorer, setExplorer] = useState('https://testnet.nearblocks.io/address/');
  const [accountID, setAccountID] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const [ca] = tokenAddress.split(':');
    setContractAddress(ca);
  }, [tokenAddress]);

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

  const disconnect = async () => {
    window.walletAccount.signOut();
    setError(undefined);
    setAccountID(undefined);
  };
  
  const sign = async () => {
    const keyPair = await window.near.connection.signer.keyStore.getKey(network, accountID);
    const sig = keyPair.sign(Buffer.from(message));
    const publicKey = Buffer.from(sig.publicKey.data).toString('hex');
    const signature = Buffer.from(sig.signature).toString('hex');

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

    if (typeof (r['redirect']) !== 'undefined') {
      window.location.href = r.redirect;
      return;
    }

    if (typeof(r['error']) !== 'undefined') {
      setError(r.error);
      return;
    }

    if (typeof (r['message']) !== 'undefined' && r.message === 'OK') {
      window.location.reload(false);
      return;
    }
  };

  return (
    <Wrapper>
      <div style={{ display: 'inline-block', clear: 'both', marginBottom: '1rem', }}>
        <Icon />
        <MainBox>
          <div>Hey, you need <TokenButton url={`${explorer}${contractAddress}`} name={tokenName} /> to access this content</div>
        </MainBox>
      </div>
      <div style={{ textAlign: 'center', marginTop: '1rem', }}>
        {
          error && (
            <div style={{ color: '#fff', backgroundColor: '#f00', padding: '0.5rem 0', margin: '1rem' }}><strong>Error: </strong>{error}</div>
          )
        }
        {
          !accountID && (
            <ActionButton onClick={connect} label="Connect" />
          )
        }
        {
          accountID && (
            <>
              <div>
                <ActionButton onClick={sign} label="Sign" />
              </div>
              <div>
                <ActionButtonLink onClick={disconnect} label="Disconnect" />
              </div>
            </>
          )
        }
      </div>
    </Wrapper>
  );
}

export default App;
