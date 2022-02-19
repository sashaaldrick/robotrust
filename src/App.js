import { React, useState, useEffect } from 'react';
import { Navbar, Footer, Header, Client } from './components';
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'
import store from './state'
import { Provider as ReduxProvider } from 'react-redux'
import './App.css';
import GRATClientForm from './components/form/GRATClientForm';

function App() {
  const [clientRequested, setClientRequested] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');
  const [accountFound, setAccountFound] = useState(false);
  const [connectButtonClicked, setConnectButtonClicked] = useState(false);
  
  return (
  <ThemeProvider theme={theme}>
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
            ? 
            <GRATClientForm />
            //  <Client 
            //      currentAccount={currentAccount} 
            //      setCurrentAccount={setCurrentAccount}
            //      accountFound={accountFound}
            //      setAccountFound={setAccountFound}
            //      connectButtonClicked={connectButtonClicked}
            //      setConnectButtonClicked={setConnectButtonClicked}
            //    />
            : ''
            }
            {/* <RoboTrust /> */}
            <Footer />
        </div>
      </ReduxProvider>
    </ThemeProvider>
  )
};

export default App;