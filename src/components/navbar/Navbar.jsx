import React, { useState } from 'react'
import './navbar.css';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/robotrust.png';

// BEM -> Block Element Modifier CSS notation.

const Menu = () => {
    return(
      <>
        <p><a href="#robotrust">About</a></p>
      </>
    );
}

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

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
        <button type="button"> Connect your wallet </button>
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

export default Navbar