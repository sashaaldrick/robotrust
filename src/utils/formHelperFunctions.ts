import { aggregatorV3InterfaceABI } from '../ABI/aggregatorV3Interface';
import { ethers } from 'ethers';

export const getETHtoUSD = async (amount: number) => {
    // a function to call chainlink price feed and set 'usdAmount' variable to value of eth typed in the input box in USD.
        // check for metamask injected objected.
        const { ethereum } = window;

        let provider;
        if (ethereum) {
          // if metamask is available, use metamask
          provider = new ethers.providers.Web3Provider(ethereum);
        } else {
          // otherwise use the public RPC provided by Offchain labs.
          const RPC_URL="https://rinkeby.arbitrum.io/rpc"
          provider = new ethers.providers.JsonRpcProvider(RPC_URL);
        }
        console.log("We be connected!");
    
        const addr = "0x5f0423B1a6935dc5596e7A24d98532b67A0AeFd8"; //Arbitrum Rinkeby ETH/USD price feed
        const priceFeed = new ethers.Contract(addr, aggregatorV3InterfaceABI, provider);
        let roundData = await priceFeed.latestRoundData();
        let decimals = await priceFeed.decimals();
        let fullNumber = amount * +(+roundData.answer.toString() / Math.pow(10, +decimals));
        if(isNaN(fullNumber)) {
            fullNumber = 0;
        }
        let rounded = Number(fullNumber.toFixed(2));
        //console.log('full number', fullNumber);
  
    return [fullNumber, rounded];
};

export const formatDollarValues = (x: number) => {
    return x.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getFirstPayment(retainedInterest: number, interestRate: number, gradingPercent: number, termInYears: number) {
    return ((interestRate - gradingPercent) * retainedInterest) / (1 - (((1 + gradingPercent)/(1 + interestRate))**termInYears))
}

export function getPayments(firstPayment: number, termInYears: number, gradingPercent: number) {
    let payments = [];
    for(let x = 0; x < termInYears; x++) {
        payments.push(firstPayment * ((1 + gradingPercent)**x));
    }
    return payments;
}