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
          Maximize your giving...
          </h1>
          <h2 className="gradient__text"> using a crypto charitable remainder unitrust (CRUT).  </h2>
          <p> Give ETH to charity and save on taxes using a tool normally reserved for the very wealthy. Connect your wallet, set trust parameters, and deposit ETH. Robotrust’s smart contract on Ethereum automatically pays you back a percentage of ETH, then sends the balance to a charity of your choosing at termination. <br></br> <br></br> You participate in ETH's upside and can immediately deduct a large portion of the gift from your taxes. For the first time, you don't need an expensive attorney and a massive fortune to maximize your giving power. </p>

          <br></br>
          <p> <b> Currently for demonstration purposes, our trusts work only on Arbitrum Rinkeby. </b> </p>

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
