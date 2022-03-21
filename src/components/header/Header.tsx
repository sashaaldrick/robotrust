import React from 'react'
import { useNavigate } from 'react-router-dom';
import './header.css';
// import people from '../../assets/people.png';
import robot from '../../assets/nevertrustarobot.png';

const Header = () => {
  const navigator = useNavigate();

  return (
      <div className="header section-padding" id="home">
        <div className="header-content"> 
          <h1 className="gradient__text"> 
          Maximize your charitable giving...
          </h1>
          <h2 className="gradient__text"> using a crypto charitable remainder unitrust (GRAT).  </h2>
          <p> Connect your wallet, set trust parameters, and deposit ETH. Robotrust’s smart contract on Ethereum automatically pays your annuities in kind, then sends the balance to the specified charity at termination. </p>

          <div className="header-content-input">
            {/* <input type="email" placeholder="Your Email Address" /> */}
            {/* <button type="button"> Get Started </button> */}
            <a onClick={(() => {
              navigator('/create');
            })}><button type="button">Get Started</button></a>
          </div>


        </div>

        <div className="header-image">
          <img src={robot} alt="robot" />
        </div>
    </div>
  );
}

export default Header;
