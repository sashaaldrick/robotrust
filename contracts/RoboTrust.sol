//SPDX-License-Identifier: MIT
// v 0.3; implementing keepers script on Arbitrum. DONE.
pragma solidity 0.8.11;

import "hardhat/console.sol";
import "./FinancialMathHelper.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract RoboTrust is FinancialMathHelper {
    //AggregatorV3Interface internal priceFeed;
    address payable public owner;
    address payable public trustee;
    address payable public beneficiary;
    uint256 public immutable period;
    uint256 public lastTimeStamp;
    uint public noOfPayouts;
    uint public maxPayouts;
    bool public terminated;
    uint public immutable gift; //USD to 18 decimals
    uint public immutable annuityPV; //USD to 18 decimals
    uint public initialEthAmount; //WEI
    uint public initialUSDValue; // USD to 18 decimals
    uint public initialEthPrice; //USD to 8 decimals
    uint public initialEthPriceRound;
    uint public initialEthPriceTimestamp;
    uint[] public paymentAmounts; //in USD to 18 decimals (10**18)


    constructor(address _owner, address _trustee, address _beneficiary, uint256 _period, uint _maxPayouts, uint[] memory _paymentAmounts, uint _annuityPV, address _priceFeedAddress) FinancialMathHelper(_priceFeedAddress) payable {
        require(_owner != _beneficiary, "Grantor cannot also be the beneficiary");
        require(_trustee != beneficiary, "Beneficiary cannot also be the Trustee");
        //priceFeed = AggregatorV3Interface(0x5f0423B1a6935dc5596e7A24d98532b67A0AeFd8); //set contract address for proper price ETH/USD price feed for network (Arbitrum Rinkeby)
        owner = payable(_owner); // convert msg.sender to payable.
        trustee = payable(_trustee);
        beneficiary = payable(_beneficiary);
        terminated = false;
        period = _period; // period to next payment i.e. time or number of blocks.
        maxPayouts = _maxPayouts; // maximum payouts over the trust's lifespan.
        lastTimeStamp = block.timestamp; 
        paymentAmounts = _paymentAmounts; //list of each payments, will iterate through index
        (uint _usdValue, uint _ethPrice, uint _priceRound, uint _priceTimestamp) = getUSDValue(msg.value);
        initialEthAmount = msg.value;
        initialUSDValue = _usdValue;
        annuityPV = _annuityPV;
        uint _gift;
        if(annuityPV > _usdValue) {
            _gift = 0;
        } else {
            _gift = _usdValue - annuityPV;
        }
        gift = _gift;
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
       upkeepNeeded = (block.timestamp - lastTimeStamp) > period && noOfPayouts < maxPayouts && !terminated;
    }
 
   function performUpkeep() external {
       if ((block.timestamp - lastTimeStamp) > period && noOfPayouts < maxPayouts && !terminated) {
           lastTimeStamp = block.timestamp;
           //get USD payment needed to distribute
           payOwner(getPaymentEthAmount(paymentAmounts[noOfPayouts]));
           //check if this was the last payment and set to terminated/payout beneficiary remaining ETH
           if(noOfPayouts >= maxPayouts) {
               //payout remaining balance to beneficiary
                (bool success, ) = beneficiary.call{value: address(this).balance}("");
                require(success, "Failed to payout beneficiary");
           }
           if(noOfPayouts >= maxPayouts || address(this).balance == 0) {
               terminated = true;
           }
       }
   }

   function withdraw() public {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Failed to withdraw");
    }

    function changeTrustee(address _newTrustee) public {
        require(msg.sender == trustee, "Only the Trustee is allowed to change the Trustee address");
        trustee = payable(_newTrustee);
    }

    function liquidate() public {
        require(msg.sender == trustee, "Only the Trustee can liquidate the trust");
        (bool success, ) = trustee.call{value: address(this).balance}("");
        require(success, "Failed to liquidate");
        terminated = true;
    }
}