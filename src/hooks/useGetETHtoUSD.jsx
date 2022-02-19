import { useState, useEffect } from 'react'
import { aggregatorV3InterfaceABI } from '../ABI/aggregatorV3Interface';
import { ethers } from 'ethers';

const useGetETHtoUSD = (amount) => {
    const [USDAmount, setUSDAmount] = useState(null);
    useEffect(() => {
        (async () => {// a function to call chainlink price feed and set 'usdAmount' variable to value of eth typed in the input box in USD.
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
    
        const addr = "0x5f0423B1a6935dc5596e7A24d98532b67A0AeFd8";
        const priceFeed = new ethers.Contract(addr, aggregatorV3InterfaceABI, provider);
        let roundData = await priceFeed.latestRoundData();
        let decimals = await priceFeed.decimals();
        let fullNumber = Number(amount*(roundData.answer.toString() / Math.pow(10, decimals)).toFixed(2));
        console.log('full number', roundData.answer);
        setUSDAmount(fullNumber.toFixed(2));})();
    }, [setUSDAmount, amount])
  
    return USDAmount
}

export default useGetETHtoUSD