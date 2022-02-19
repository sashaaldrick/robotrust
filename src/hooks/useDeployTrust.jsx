import { useState, useContext } from 'react';
import { ReactReduxContext } from 'react-redux';
import RoboTrust from '../artifacts/contracts/RoboTrust.sol/RoboTrust.json';
import { ethers } from 'ethers';

const abi = RoboTrust.abi;

const useDeployTrust = async () => {

    const [trustDeployed, setTrustDeployed] = useState(false);
    const { ethereum } = window;

    const { store } = useContext(ReactReduxContext);
    const GRATFormVariables = store.getState();

    console.log(GRATFormVariables);

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

    // try {
    //   let createTrust = await contract.createTrust();
    //   console.log(createTrust);
    //   setTrustDeployed(trust);
    // } catch(err) {
    //   console.log(err);
    // }
}

export default useDeployTrust;