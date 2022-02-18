import { React, useState, useEffect } from 'react';
import { Footer, Header, Client } from './containers';
import { Navbar } from './components';
import store from './state'
import { Provider as ReduxProvider } from 'react-redux'
import './App.css';

function App() {
  const [clientRequested, setClientRequested] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');
  const [accountFound, setAccountFound] = useState(false);
  const [connectButtonClicked, setConnectButtonClicked] = useState(false);
  
  return (
  <ReduxProvider store={store}>
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
    </ReduxProvider>
  )
};

export default App;