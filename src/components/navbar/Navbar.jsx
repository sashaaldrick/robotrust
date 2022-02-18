import{ React, useState, useEffect} from 'react'
import './navbar.css';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/robotrust.png';
import metamaskIcon from '../../assets/metamask.svg';

const Menu = () => {
    return(
      <>
        <p><a href="#robotrust">About</a></p>
      </>
    );
}

const Navbar = props => {
  const [toggleMenu, setToggleMenu] = useState(false);
  // const [currentAccount, setCurrentAccount] = useState('');
  // const [accountFound, setAccountFound] = useState(false);
  // const [connectButtonClicked, setConnectButtonClicked] = useState(false);

  const connectWalletHandler = async () => { 
    // if no auto-login, show a connect wallet button to allow for connection to metamask.
  
    const { ethereum } = window;
  
    if (!ethereum) {
      alert("Please install Metamask!")
    }
  
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
      console.log("Found an account! Address: ", accounts[0]);
      props.setCurrentAccount(accounts[0]);
      props.setAccountFound(true);
      props.setConnectButtonClicked(true);
    } catch(err) {
      console.log(err);
      props.setConnectButtonClicked(true);
    }
  }

  const ConnectedAccountInfo = () => {
    const slicedAddress = props.currentAccount.slice(0, 5) + "..." + props.currentAccount.slice(-4);
    return(
      <div className="connected-account">
        <img src={metamaskIcon} alt="Metamask Icon" />
        {props.accountFound && props.connectButtonClicked 
         ? <p> {slicedAddress} </p>
         : <p> Please install Metamask! </p>
        }
      </div>
    );
  }

  return (
    <div className="navbar">
      <div className="navbar-logo"> 
        <img src={logo} alt="logo" />
      </div>
      <div className="navbar-links"> 
        <div className="navbar-links-container">
          <Menu />
        </div>
      </div>
      <div className="connect-wallet">  
        {props.accountFound 
          ? <ConnectedAccountInfo />
          : <button type="button" onClick={connectWalletHandler}> Connect your wallet </button>
        }
      </div>
      <div className="navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="navbar-menu-container scale-up-center">
          <div className="navbar-menu-links-container">
            <Menu />
          </div>
        </div>
        )}
      </div>
    </div>
  )
}

export default Navbar;