//SPDX-License-Identifier: MIT
// v 0.3; implementing keepers script on Arbitrum. DONE.
pragma solidity 0.8.11;

import "hardhat/console.sol";
import "./FinancialMathHelper.sol";

contract RoboTrust is FinancialMathHelper {
    //AggregatorV3Interface internal priceFeed;
    address payable public owner;
    uint256 public immutable period;
    uint256 public lastTimeStamp;
    uint public noOfPayouts;
    uint public maxPayouts;
    uint public initialUSDValue;
    uint public initialEthPrice;
    uint public initialEthPriceRound;
    uint public initialEthPriceTimestamp;
    uint[] public paymentAmounts; //in USD to 8 decimals (10**8)


    constructor(uint256 _period, uint _maxPayouts, uint[] memory _paymentAmounts, address _priceFeedAddress) FinancialMathHelper(_priceFeedAddress) payable {
        //priceFeed = AggregatorV3Interface(0x5f0423B1a6935dc5596e7A24d98532b67A0AeFd8); //set contract address for proper price ETH/USD price feed for network (Arbitrum Rinkeby)
        owner = payable(msg.sender); // convert msg.sender to payable.
        period = _period; // period to next payment i.e. time or number of blocks.
        maxPayouts = _maxPayouts; // maximum payouts over the trust's lifespan.
        lastTimeStamp = block.timestamp; 
        paymentAmounts = _paymentAmounts; //list of each payments, will iterate through index
        (uint _usdValue, uint _ethPrice, uint _priceRound, uint _priceTimestamp) = getUSDValue(msg.value);
        initialUSDValue = _usdValue;
        initialEthPrice = _ethPrice;
        initialEthPriceRound = _priceRound;
        initialEthPriceTimestamp = _priceTimestamp;
    }

    //_amount: amount in ETH (Wei) to pay
    function payOwner(uint256 _amount) internal {
        if(_amount > address(this).balance) {
            (bool sent, ) = owner.call{value: address(this).balance}("");
            require(sent, "Failed to send Ether");
        } else {
            (bool sent, ) = owner.call{value: _amount}("");
            require(sent, "Failed to send Ether");
        }
        noOfPayouts += 1;
    }

    function checkUpkeep() 
    external
    view
    returns (bool upkeepNeeded) 
    {
       upkeepNeeded = (block.timestamp - lastTimeStamp) > period && noOfPayouts <= maxPayouts;
    }
 
   function performUpkeep() external {
       if ((block.timestamp - lastTimeStamp) > period && noOfPayouts <= maxPayouts) {
           lastTimeStamp = block.timestamp;
           //get USD payment needed to distribute
           payOwner(getPaymentEthAmount(paymentAmounts[noOfPayouts]));
           // this is where we set the payouts.
       }
   }

   function withdraw() public {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Failed to withdraw");
    }
}