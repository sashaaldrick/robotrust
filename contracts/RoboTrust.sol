//SPDX-License-Identifier: MIT
// v 0.3; implementing keepers script on Arbitrum. DONE.
pragma solidity 0.8.11;

import "hardhat/console.sol";
import "./FinancialMathHelper.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract RoboTrust is FinancialMathHelper {
    //AggregatorV3Interface internal priceFeed;
    address payable private owner;
    address payable private trustee;
    address payable private beneficiary;
    address private deployerContract;
    uint256 internal immutable period;
    uint256 internal lastTimeStamp;
    uint private noOfPayouts;
    uint private maxPayouts;
    bool public terminated;
    bool private showBeneficiaryAccounting;
    uint private immutable gift; //USD to 18 decimals
    uint private immutable annuityPV;
    uint private immutable startedTimestamp; //USD to 18 decimals
    uint private initialEthAmount; //WEI
    uint private initialUSDValue; // USD to 18 decimals
    uint private initialEthPrice; //USD to 8 decimals
    uint private initialEthPriceRound;
    uint private initialEthPriceTimestamp;
    uint[] private paymentAmounts; //in USD to 18 decimals (10**18)
    Payment[] private payments;

    modifier deployerOwnerTrustee() {
        require(msg.sender == owner || msg.sender == trustee || msg.sender == deployerContract);
        _;
    }

    constructor(address _owner, address _trustee, address _beneficiary, uint256 _period, uint _maxPayouts, uint[] memory _paymentAmounts, uint _annuityPV, address _priceFeedAddress, bool _showAccounting) FinancialMathHelper(_priceFeedAddress) payable {
        require(_owner != _beneficiary, "Grantor cannot also be the beneficiary");
        require(_trustee != beneficiary, "Beneficiary cannot also be the Trustee");
        //priceFeed = AggregatorV3Interface(0x5f0423B1a6935dc5596e7A24d98532b67A0AeFd8); //set contract address for proper price ETH/USD price feed for network (Arbitrum Rinkeby)
        deployerContract = msg.sender;
        owner = payable(_owner); // convert msg.sender to payable.
        trustee = payable(_trustee);
        beneficiary = payable(_beneficiary);
        terminated = false;
        showBeneficiaryAccounting = _showAccounting;
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
        startedTimestamp = block.timestamp;
    }

    //_amount: amount in ETH (Wei) to pay
    function payOwner(Payment memory _payment) internal {
        if(_payment.ethPaid > address(this).balance) {
            (bool sent, ) = owner.call{value: address(this).balance}("");
            require(sent, "Failed to send Ether");
            payments.push(_payment);
        } else {
            (bool sent, ) = owner.call{value: _payment.ethPaid}("");
            require(sent, "Failed to send Ether");
            payments.push(_payment);
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
           Payment memory payment = getPaymentEthAmount(paymentAmounts[noOfPayouts]);
           payOwner(payment);
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
/*
   function withdraw() public {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Failed to withdraw");
    }
*/
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

    function toggleAccounting() public {
        require(msg.sender == trustee, "Only the Trustee can toggle to show accounting");
        showBeneficiaryAccounting = !showBeneficiaryAccounting;
    }

    function viewPayment(uint64 index) public view returns(Payment memory payment) {
        require((showBeneficiaryAccounting && msg.sender == beneficiary) || (msg.sender == owner) || msg.sender == trustee, "You are not allowed to view payments");
        return payments[index];
    }

    function getTrusteeAddress() public view deployerOwnerTrustee returns(address) {
        return trustee;
    }

    function getBeneficiaryAddress() public view deployerOwnerTrustee returns(address) {
        return beneficiary;
    }

    function getOwnerAddress() public view deployerOwnerTrustee returns(address) {
        return owner;
    }

    function getShowBeneficiaryAccounting() public view deployerOwnerTrustee returns(bool) {
        return showBeneficiaryAccounting;
    }

    function getInitialValueData() public view deployerOwnerTrustee returns(uint, uint, uint, uint, uint) {
        return (initialEthAmount, //WEI
        initialUSDValue, // USD to 18 decimals
        initialEthPrice, //USD to 8 decimals
        initialEthPriceRound, 
        initialEthPriceTimestamp);
    }

    function getAnnuityPV() public view deployerOwnerTrustee returns(uint) {
        return annuityPV;
    }

    function getGift() public view deployerOwnerTrustee returns(uint) {
        return gift;
    }

    function getPayoutCount() public view deployerOwnerTrustee returns(uint) {
        return noOfPayouts;
    }

    function getMaxPayouts() public view deployerOwnerTrustee returns(uint) {
        return maxPayouts;
    }

    function getPaymentsMade() public view deployerOwnerTrustee returns(Payment[] memory) {
        return payments;
    }
}