import { React, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Footer, Blog, Possibility, Features, RoboTrust, Header } from './containers';
import { CTA, Brand, Navbar } from './components';
import './App.css';

function App() {
  return (
    <div className="App">
        <div className="gradient__bg">
            <Navbar />
            <Header />
        </div>
        {/* <Brand /> */}
        <RoboTrust />
        <CTA />
        <Footer />
    </div>
  )
}

export default App;