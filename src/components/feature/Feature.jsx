import React from 'react'
import './feature.css';

const Feature = ({ title, text} ) => {
  return (
    <div className="robotrust-features-container">
      <div className="robotrust-features-title">
        <div />
        <h1>{title}</h1>
      </div>
      <div className="robotrust-features-text">
        <p> {text} </p>
      </div>
    </div>
  )
}

export default Feature