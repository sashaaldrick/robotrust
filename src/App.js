import React from 'react'

import { Footer, Blog, Possibility, Features, RoboTrust, Header } from './containers';
import { CTA, Brand, Navbar } from './components';
import './App.css';

const App = () => {
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

export default App 