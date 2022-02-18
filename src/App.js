import { React, useState, useEffect } from 'react';
import { Footer, Blog, Possibility, Features, RoboTrust, Header, Client } from './containers';
import { CTA, Brand, Navbar } from './components';
import './App.css';

function App() {
  const [clientRequested, setClientRequested] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');
  const [accountFound, setAccountFound] = useState(false);
  const [connectButtonClicked, setConnectButtonClicked] = useState(false);

  return (
    <div className="App">
        <div className="gradient__bg">
            <Navbar 
              currentAccount={currentAccount} 
              setCurrentAccount={setCurrentAccount}
              accountFound={accountFound}
              setAccountFound={setAccountFound}
              connectButtonClicked={connectButtonClicked}
              setConnectButtonClicked={setConnectButtonClicked}
            />
            <Header 
            clientRequested={clientRequested}
            setClientRequested={setClientRequested} 
            />
        </div>
        {/* <Brand /> */}
        {clientRequested 
         ? <Client 
             currentAccount={currentAccount} 
             setCurrentAccount={setCurrentAccount}
             accountFound={accountFound}
             setAccountFound={setAccountFound}
             connectButtonClicked={connectButtonClicked}
             setConnectButtonClicked={setConnectButtonClicked}
           />
         : ''
        }
        <RoboTrust />
        <CTA />
        <Footer />
    </div>
  )
}

export default App;