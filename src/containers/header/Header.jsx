import React from 'react'
import './header.css';
import people from '../../assets/people.png';
import robot from '../../assets/nevertrustarobot.png';

const Header = props => {
  return (
    <div className="header section-padding" id="home">
        <div className="header-content"> 
          <h1 className="gradient__text"> 
            Ever wanted to avoid your estate tax using crypto? 
          </h1>
          <h2 className="gradient__text"> We have you covered... </h2>
          <p> Robotrust will set up a self-executing crypto grantor retained annuity trust (GRAT) for you. Just connect your wallet and deposit ETH and set the right parameters and you're off to the races! Sorry, not sorry, IRS! </p>

          <div className="header-content-input">
            {/* <input type="email" placeholder="Your Email Address" /> */}
            {/* <button type="button"> Get Started </button> */}
            <a href="#client"><button type="button" onClick={() => props.setClientRequested(true)}>Get Started</button></a>
          </div>

          <div className="header-content-people">
            <img src={people} alt="people"/>
            <p> 1600 people raised a middle finger to the IRS in the last 24 hours. </p>
          </div>

        </div>

        <div className="header-image">
          <img src={robot} alt="robot" />
        </div>
    </div>
  );
}

export default Header;