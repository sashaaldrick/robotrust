import { React, useState } from 'react';
import { Footer,  RoboTrust, Header, Client, Navbar } from './components';
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
        {/* <RoboTrust /> */}
        <Footer />
    </div>
  )
};

export default App;