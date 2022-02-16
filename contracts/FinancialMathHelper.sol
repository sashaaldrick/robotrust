// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "hardhat/console.sol";

contract FinancialMathHelper {
    AggregatorV3Interface internal priceFeed;
    //address payable public owner;
    uint public usdValue;
    uint public testEthPayment;
    uint public paymentUSD;

    //Rinkeby Testnet ETH/USD feed: 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
    constructor(address _priceFeedAddress) {
        priceFeed = AggregatorV3Interface(_priceFeedAddress);
        //get the USD value of the amount deposited at deployment and store
        //console.log("Last ETH Price: %s, Msg Value: %s, USD Value: %", lastEthPrice, msg.value, usdValue);
    }

    function getUSDValue(uint _ethAmountWei) public returns (uint, uint, uint80, uint) {
        (uint ethPrice, uint80 roundId, uint timestamp) = getLastEthPriceUSD(); //has 8 digits
        uint initialEthPrice = ethPrice;
        usdValue = (initialEthPrice * _ethAmountWei) / 10**8;
        return (usdValue, initialEthPrice, roundId, timestamp);
    }

    //Get the current USD price of ETH from chainlink price feeds
    function getLastEthPriceUSD() public view returns (uint, uint80, uint) {
        (uint80 roundId, int price, , uint roundTimestamp, ) = priceFeed.latestRoundData();
        return (uint(price), uint80(roundId), uint(roundTimestamp));
    }

    //Get the ETH needed to disburse the annuity payment (based on USD, assume 2 periods for now) - can probably make internal
    function getPaymentEthAmount(uint _usdAmountDegree18) public returns (uint) {
        //Get Needed USD amount by dividing USD value by number of periods (2 and 3 for testing)
        paymentUSD = _usdAmountDegree18; //divide by number of periods (payment USD in 10**18)
        (uint currentEthPrice, uint80 roundId, uint timestamp) = getLastEthPriceUSD(); 
        testEthPayment = (paymentUSD * 10**8) / currentEthPrice; 
        ///9000000000000000000 / 300000000 0000000000 = .33333
        return testEthPayment;
    }
}