import  React, { Component } from 'react';
import { useState, useEffect, useContext } from 'react';
import useSetGRAT from "../../hooks/useSetGRAT";
import useGetETHtoUSD from '../../hooks/useGetETHtoUSD';
import { InputField as Field } from '../form/fields/input';
import './client.css';

import metamaskIcon from '../../assets/metamask.svg';

import { ethers } from 'ethers';

const Client = props => {
  // set client state
  const [usdAmount, setUsdAmount] = useState(0);
  const [noOfPayouts, setNoOfPayouts] = useState(0);
  const [trusteeAddress, setTrusteeAddress] = useState('');
  const [beneficiaryAddress, setBeneficiaryAddress] = useState('');
  const [retainedInterest, setRetainedInterest] = useState(0);
  const [termInYears, setTermInYears] = useState(0);
  const [graduatedToggle, setGraduatedToggle] = useState(false);
  const [graduatedPercentage, setGraduatedPercentage] = useState(0);
  const [beneficiaryToggle, setBeneficiaryToggle] = useState(false);
  const [interestRate, setInterestRate] = useState(0);
  const [firstPayment, setFirstPayment] = useState(0);

  function GetFirstPayment(presentValue = 0, interestRate = 0, gradingPercent = 0, numberOfYears = 2) {
    console.log("In getFirstPayment function!");
    let _firstPayment = (((interestRate - gradingPercent) * presentValue) / (1 - (((1 + gradingPercent)/(1 + interestRate))**numberOfYears)));
    console.log('Present Value: ' + presentValue);
    console.log('Interest Rate: ' + interestRate);
    console.log('Grading Percent: ' + gradingPercent);
    console.log('Number of Years: ' + numberOfYears);
    setFirstPayment(_firstPayment.toFixed(2));
    console.log(firstPayment);
    // useForceUpdate();
  }

  function getPayments(firstPayment, numberOfYears, gradingPercent) {
    let payments = [];
    for(let x = 0; x < numberOfYears; x++) {
      payments.push(firstPayment * ((1 + gradingPercent)**x));
    }
    return payments;
  }

  const ConnectedAccountInfo = () => {
    // function to display connected account information from metamask.
    const slicedAddress = props.currentAccount.slice(0, 5) + "..." + props.currentAccount.slice(-4);
    return(
      <div className="connected-account">
        <img src={metamaskIcon} alt="Metamask Icon" />
        {props.accountFound 
         ? <p> {slicedAddress} </p>
         : ''
        }
      </div>
    );
  }

  const connectWalletHandler = async () => { 
    // function that runs when 'Connect Wallet' is pressed.
  
    const { ethereum } = window;
  
    if (!ethereum) {
      alert("Please install Metamask!")
    }
  
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
      console.log("Found an account! Address: ", accounts[0]);
      props.setCurrentAccount(accounts[0]);
      props.setAccountFound(true);
      props.setConnectButtonClicked(true);
    } catch(err) {
      console.log(err);
      props.setConnectButtonClicked(true);
    }
  }

  const ethToUSD = async (amount) => {
    // a function to call chainlink price feed and set 'usdAmount' variable to value of eth typed in the input box in USD.
    // check for metamask injected objected.
    const { ethereum } = window;

    let provider;
    if(ethereum) {
      // if metamask is available, use metamask
      provider = new ethers.providers.Web3Provider(ethereum);
    } else {
      // otherwise use the public RPC provided by Offchain labs.
      const RPC_URL="https://rinkeby.arbitrum.io/rpc"
      provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    }
    console.log("We be connected!");

    const aggregatorV3InterfaceABI = [
      {
          inputs: [],
          name: 'decimals',
          outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
          stateMutability: 'view',
          type: 'function'
      },
      {
          inputs: [],
          name: 'description',
          outputs: [{ internalType: 'string', name: '', type: 'string' }],
          stateMutability: 'view',
          type: 'function'
      },
      {
          inputs: [{ internalType: 'uint80', name: '_roundId', type: 'uint80' }],
          name: 'getRoundData',
          outputs: [
              { internalType: 'uint80', name: 'roundId', type: 'uint80' },
              { internalType: 'int256', name: 'answer', type: 'int256' },
              { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
              { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
              { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' }
          ],
          stateMutability: 'view',
          type: 'function'
      },
      {
          inputs: [],
          name: 'latestRoundData',
          outputs: [
              { internalType: 'uint80', name: 'roundId', type: 'uint80' },
              { internalType: 'int256', name: 'answer', type: 'int256' },
              { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
              { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
              { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' }
          ],
          stateMutability: 'view',
          type: 'function'
      },
      {
          inputs: [],
          name: 'version',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function'
      }
    ];

    const addr = "0x5f0423B1a6935dc5596e7A24d98532b67A0AeFd8";
    const priceFeed = new ethers.Contract(addr, aggregatorV3InterfaceABI, provider);
    let roundData = await priceFeed.latestRoundData();
    let decimals = await priceFeed.decimals();
    let fullNumber = Number(amount*(roundData.answer.toString() / Math.pow(10, decimals)).toFixed(2));
    setUsdAmount(fullNumber.toFixed(2));
    
  }

  return (
    <div className="client section-margin" id="client">
      <div className="client-feature"> 
        <div className="connect-wallet">  
          {props.accountFound 
            ? <ConnectedAccountInfo />
            : <button type="button" onClick={connectWalletHandler}> Connect your wallet </button>
          }
        </div>
      </div>
      <div className="eth-amount"> 
        <h1 className="gradient__text"> Enter ETH Amount: </h1>
        <Box>
          <Field
            size={""}
            textarea={false}
            name={ethAmount.name}
            label={ethAmount.label}
            placeholder="track name"
          />
        </Box>
        <input onChange={e => ethToUSD(e.target.value)} type="text" placeholder="ETH Amount..." />
      </div>
      
      <div className="value-disclaimer">
        <div className="value-usd">
          <h1 className="gradient__text"> Approximate Value in USD: </h1>
          <p className="usd-amount"> ${usdAmount} </p>
        </div>

        <p> The ETH/USD value is an estimate. Due to slippage, the value of your contribution may differ at the time the contract is signed. </p>
      </div>

      <div className="grat-header">
        <h1 className="gradient__text"> Enter GRAT provisions: </h1>
      </div>

      <div className="grat-provisions"> 
        <div className="line" />
        
        
        <div className="trustee-disclaimer"> 
          <div className="trustee-address"> 
            <h1 className="gradient__text"> Trustee Address:        </h1>
            <input onChange={e => setTrusteeAddress(e.target.value)} type="text" placeholder="0x..." />
          </div>

          <p> The Trustee has the ability to liquidate the Trust, in which case all assets of the Trust will be transferred to the then current Trustee Wallet. The Trustee also has the ability to assign Trustee control to another wallet. </p> 
        </div>

        <div className="beneficiary-address"> 
          <h1 className="gradient__text"> Beneficiary Address:        </h1>
          <input onChange={e => setBeneficiaryAddress(e.target.value)} type="text" placeholder="0x..." />
        </div>

        <div className="no-payouts"> 
          <h1 className="gradient__text"> Number of payments: </h1>
          <input onChange={e => {setNoOfPayouts(e.target.value)}}type="text" placeholder="0" />
        </div>a

        <div className="interest-disclaimer"> 
          <div className="retained-interest"> 
            <h1 className="gradient__text"> Retained Interest: </h1>
            <input onChange={e => {setRetainedInterest(e.target.value);
                                   GetFirstPayment(+retainedInterest, +interestRate, +graduatedPercentage, +termInYears)}} type="text" placeholder="0" />
          </div>
          <p> The estimated gift includable in your estate is equal to the grant amount minus the retained interest. </p>
        </div>

        <div className="years-disclaimer"> 
          <div className="term-in-years"> 
            <h1 className="gradient__text"> Term in years: </h1>
            <input onChange={e => {setTermInYears(e.target.value);
                                    GetFirstPayment(+retainedInterest, +interestRate, +graduatedPercentage, +termInYears)}} type="text" placeholder=">= 2" />
          </div>
          <p> Warning: Setting this value lower than ‘2’ may result in nonrecognition by the IRS. </p>
        </div>

        <div className="interest-link"> 
          <div className="interest-rate"> 
            <h1 className="gradient__text"> § 7520 Interest Rate: </h1>
            <input onChange={e => {setInterestRate(e.target.value);
                                  GetFirstPayment(+retainedInterest, +interestRate, +graduatedPercentage, +termInYears)}} type="text" placeholder="..." />
          </div>
          <p> Please find the latest § 7520 Interest Rates <a target="_blank" href="https://www.irs.gov/businesses/small-businesses-self-employed/section-7520-interest-rates">here</a>.</p>
        </div>

        <div className="graduated-disclaimer"> 
          <div className="graduated-payment"> 
            <h1 className="gradient__text"> Increasing Annuity Payments? </h1>
            <label className="switch">
              <input type="checkbox" onChange={e => setGraduatedToggle(!graduatedToggle)}/>
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        { graduatedToggle 
            ? <div className="graduated-percentage"> 
                <h1 className="gradient__text"> Set Graduated Percentage: </h1>
                <input onChange={e => {setGraduatedPercentage(e.target.value);
                                      GetFirstPayment(+retainedInterest, +interestRate, +graduatedPercentage, +termInYears)}} type="text" placeholder="20%" />
            </div>
            : ''
          }

        { graduatedToggle 
          ? <div className="graduation-warning">
              <p> Warning: Setting the graduation rate higher than 20% may result in nonrecognition by the IRS. </p> 
            </div>
          : ''
        }

        <div className="beneficiary-disclaimer"> 
          <div className="beneficiary-accounting"> 
            <h1 className="gradient__text"> Allow Beneficiary to view accounting? </h1>
            <label className="switch">
              <input type="checkbox" onChange={e => setBeneficiaryToggle(!beneficiaryToggle)}/>
              <span className="slider round"></span>
            </label>
          </div>
          <p> Warning: Some states require that Beneficiaries have access to this information. </p>
        </div>

        <div className="review-button">
          <button type="button" > Generate Signing Document </button>
        </div>

      </div>

      <div className="table">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Annuity in U.S. Dollars</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01/02/2023</td>
              <td>${firstPayment}</td>
            </tr>
          <tr className="active-row">
            <td>01/02/2024</td>
            <td>$5150</td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Client;