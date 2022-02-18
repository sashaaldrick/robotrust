import React from 'react';
import './cta.css';

const CTA = props => (
  <div className="cta">
    <div className="cta-content">
      <p>Create your own RoboTrust...</p>
      <h3>You are one click away from setting up your own crypto GRAT. </h3>
      <h3>What are you waiting for?</h3>
    </div>
    <div className="cta-btn">
    <a href="#robotrust"><button type="button" onClick={() => props.setClientRequested(!props.clientRequested)}>Get Started</button></a>
    </div>
  </div>
);

export default CTA;