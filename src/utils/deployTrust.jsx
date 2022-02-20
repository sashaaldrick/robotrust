// import { useState, useContext } from 'react';
// import { ReactReduxContext } from 'react-redux';
import RoboTrust from '../artifacts/contracts/RoboTrust.sol/RoboTrust.json';
import { ethers } from 'ethers';

const abi = RoboTrust.abi;

const deployTrust = async (values) => {

   const { beneficiaryAddress,
            beneficiaryToggle,
            ethAmount,
            // firstPayment,
            graduatedToggle,
            interestRate,
            retainedInterest,
            termInYears,
            trusteeAddress,
            graduatedPercentage,
            usdAmount } = values;
    console.log("graduatedPercentage: " + graduatedPercentage);
    console.log("BeneficiaryAddress: " + beneficiaryAddress);
    console.log("beneficiaryToggle: " + beneficiaryToggle);
    console.log("ethAmount: " + ethAmount);
    // console.log("firstPayment: " + firstPayment);
    console.log("graduatedToggle: " + graduatedToggle);
    console.log("interestRate: " + interestRate);
    console.log("retainedInterest: " + retainedInterest);
    console.log("termInYears: " + termInYears);
    console.log("trusteeAddress: " + trusteeAddress);
    console.log("usdAmount: " + usdAmount);

    const { ethereum } = window;

    let provider;
    if (ethereum) {
      // use metamask as provider
      provider = new ethers.providers.Web3Provider(ethereum);
    } else {
      // 
      alert("Please install Metamask and set up an account to continue!");
    }

    console.log("We are ready to deploy...");

    // address of test deployer contract on Rinkarby.
    const contractAddress = "0x5e0231966ea0dC13d5b3dfD45f3DA74FA80767F4";
    const contract = new ethers.Contract(contractAddress, abi, provider);

    // need to access global store and pass into createTrust function.
    // (uint256 _period, uint _numberOfYears, uint[] memory _paymentAmounts, uint _annuityPV, address _trustee, address _beneficiary, bool _showAccounting, string memory _disclaimer)

    function getFirstPayment(retainedInterest, interestRate, gradingPercent, termInYears) {
      return ((interestRate - gradingPercent) * retainedInterest) / (1 - (((1 + gradingPercent)/(1 + interestRate))**termInYears))
    }

    function getPayments(firstPayment, termInYears, gradingPercent) {
      let payments = [];
      for(let x = 0; x < termInYears; x++) {
        payments.push(firstPayment * ((1 + gradingPercent)**x));
      }
      return payments;
    }

    let firstPayment = getFirstPayment(+retainedInterest, 0.017, 0, termInYears);
    let payments = getPayments(firstPayment, +termInYears, 0);

    console.log(firstPayment, payments)

    // try {
    //   let createTrust = await contract.createTrust(60, +termInYears,  );
    //   console.log(createTrust);
    // } catch(err) {
    //   console.log(err);
    // }
}

export default deployTrust;