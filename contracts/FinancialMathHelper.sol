// SPDX-License-Identifier: MIT
pragma solidity >=0.8.11;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "hardhat/console.sol";

contract FinancialMathHelper {
    AggregatorV3Interface internal priceFeed;

    struct Payment {
        uint ethPaid; //WEI
        uint paymentTimestamp;
        uint ethPrice; //in USD to 8 Decimals (should we just make this 18 and * 10^10?)
        uint priceRound; //Chainlink latest price round at time of payment
        uint priceTimestamp; //chainlink timestamp of latest round at time of payment
        uint usdPaymentAmount;
    }

    //Rinkeby Testnet ETH/USD feed: 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
    constructor(address _priceFeedAddress) {
        priceFeed = AggregatorV3Interface(_priceFeedAddress);
    }

    function getUSDValue(uint _ethAmountWei) public view returns (uint, uint, uint80, uint) {
        (uint ethPrice, uint80 roundId, uint timestamp) = getLastEthPriceUSD(); //has 8 digits
        uint initialEthPrice = ethPrice;
        uint usdValue = (initialEthPrice * _ethAmountWei) / 10**8;
        return (usdValue, initialEthPrice, roundId, timestamp);
    }

    //Get the current USD price of ETH from chainlink price feeds
    function getLastEthPriceUSD() public view returns (uint, uint80, uint) {
        (uint80 roundId, int price, , uint roundTimestamp, ) = priceFeed.latestRoundData();
        return (uint(price), uint80(roundId), uint(roundTimestamp));
    }

    //Get the ETH needed to disburse the annuity payment (based on USD, assume 2 periods for now) - can probably make internal
    function getPaymentEthAmount(uint _usdAmountDegree18) public view returns (Payment memory) {
        //Get Needed USD amount by dividing USD value by number of periods (2 and 3 for testing)
        uint paymentUSD = _usdAmountDegree18; //divide by number of periods (payment USD in 10**18)
        (uint currentEthPrice, uint80 roundId, uint timestamp) = getLastEthPriceUSD(); 
        uint ethPayment = (paymentUSD * 10**8) / currentEthPrice; 
        Payment memory payment = Payment(ethPayment, block.timestamp, currentEthPrice, roundId, timestamp, _usdAmountDegree18);
        return payment;
    }
}