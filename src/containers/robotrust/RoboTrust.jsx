import React from 'react';
import Feature from '../../components/feature/Feature';
import './robotrust.css';

const WhatRoboTrust = () => {
  return (
    <div className="robotrust section-margin" id="robotrust">
      <div className="robotrust-feature"> 
        <Feature title="About RoboTrust"/>   
      </div>

      <div className="robotrust-heading"> 
        <h1 className="gradient__text"> The possibilities are beyond your imagination. </h1>
        {/* <p> Explore the Library </p> */}
      </div>

      <div className="robotrust-container">
        <Feature title="What is a GRAT?" text="We so opinion friends me message as delight. Whole front do of plate heard oh ought." />
        <Feature title="Self-executing & Self-Determining" text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b" />
        <Feature title="Tax Advantages" text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b" />
      </div>
    </div>
  )
}

export default WhatRoboTrust