import React from 'react';
import logo from '../../assets/robotrust.png';
import './footer.css';

const Footer = () => (
  <div className="footer section-padding">
    {/* <div className="footer-heading">
      <h1 className="gradient__text">Do you want to step in to the future before others</h1>
    </div>

    <div className="footer-btn">
      <p>Request Early Access</p>
    </div> */}

    <div className="footer-links">
      <div className="footer-links-logo">
        <img src={logo} alt="robotrust_logo" />
        <p> 1650 Champa St., Denver, CO 80202 <br /> All Rights Reserved</p>
      </div>
      <div className="footer-links-div">
        <h4>Links</h4>
        <p>Overons</p>
        <p>Social Media</p>
        <p>Counters</p>
        <p>Contact</p>
      </div>
      <div className="footer-links-div">
        <h4>Company</h4>
        <p>Terms & Conditions </p>
        <p>Privacy Policy</p>
        <p>Contact</p>
      </div>
      <div className="footer-links-div">
        <h4>Get in touch</h4>
        <p>1650 Champa St., Denver, CO 80202</p>
        <p>085-132567</p>
        <p>robot@robotrust.xyz</p>
      </div>
    </div>

    <div className="footer-copyright">
      <p>@2022 RoboTrust. All rights reserved.</p>
    </div>
  </div>
);

export default Footer;