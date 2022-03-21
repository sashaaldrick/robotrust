//SPDX-License-Identifier: MIT
// v 0.3; implementing keepers script on Arbitrum. DONE.
pragma solidity >=0.8.11;

import "hardhat/console.sol";
import "./FinancialMathHelper.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract RoboTrustCRUT is FinancialMathHelper {
    address payable private owner;
    address payable private annuant;
    address payable private trustee;
    address payable private charity;
    address private deployerContract;
    uint256 internal immutable period;
    uint256 internal lastTimeStamp;
    uint private noOfPayouts;
    uint private numberOfYears;
    bool public terminated;
    //bool private showBeneficiaryAccounting;
    //uint private immutable annuityPV;
    uint private immutable startedTimestamp; //USD to 18 decimals
    Payment private initialGrant;
    //uint[] private paymentAmounts; //in USD to 18 decimals (10**18)
    uint private immutable paymentPercent; //percent of balance to pay annually in hundreds (10% = 100, 100% = 1000,, 12.2 = 122), between 50 and 500
    Payment[] private payments;

    modifier deployerOwnerTrusteeCharity() {
        require(msg.sender == owner || msg.sender == annuant || msg.sender == trustee || msg.sender == deployerContract || msg.sender == charity);
        _;
    }

    constructor(address _owner, address _annuant, address _trustee, address _charity, uint256 _period, uint16 _numYears, uint _paymentPercent, address _priceFeedAddress) FinancialMathHelper(_priceFeedAddress) payable {
        require(_owner != _charity, "Grantor cannot also be the beneficiary");
        require(_trustee != _charity, "Beneficiary cannot also be the Trustee");
        require(_paymentPercent >= 50 && _paymentPercent <= 500, "Payment Percentage must be between 5% and 50%");
        deployerContract = msg.sender;
        owner = payable(_owner); // convert msg.sender to payable.
        annuant = payable(_annuant);
        trustee = payable(_trustee);
        charity = payable(_charity);
        terminated = false;
        period = _period; // period to next payment i.e. time or number of blocks. need to update to one year for final
        numberOfYears = _numYears; // maximum payouts over the trust's lifespan.
        lastTimeStamp = block.timestamp; 
        //paymentAmounts = _paymentAmounts; //list of each payments, will iterate through index
        paymentPercent = _paymentPercent;
        (uint _usdValue, uint _ethPrice, uint _priceRound, uint _priceTimestamp) = getUSDValue(msg.value);
        initialGrant = Payment(msg.value, block.timestamp, _ethPrice, _priceRound, _priceTimestamp, _usdValue);
        
        startedTimestamp = block.timestamp;
    }

    //_payment: amount in ETH (Wei) to pay
    function payAnnuant(Payment memory _payment) internal {
        if(_payment.ethPaid > address(this).balance) {
            (bool sent, ) = annuant.call{value: address(this).balance}("");
            require(sent, "Failed to send Ether");
            payments.push(_payment);
        } else {
            (bool sent, ) = annuant.call{value: _payment.ethPaid}("");
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
       upkeepNeeded = (block.timestamp - lastTimeStamp) > period && noOfPayouts < numberOfYears && !terminated;
    }
 
   function performUpkeep() external {
       if ((block.timestamp - lastTimeStamp) > period && noOfPayouts < numberOfYears && !terminated) {
           lastTimeStamp = block.timestamp;
           // calculate amount of eth to distribute
           uint _ethPayment = address(this).balance * paymentPercent / 1000;
           (uint _usdValue, uint _ethPrice, uint _roundId, uint _timestamp) = getUSDValue(_ethPayment);
           //get USD payment needed to distribute
           Payment memory payment = Payment(_ethPayment, block.timestamp, _ethPrice, _roundId, _timestamp, _usdValue);
           payAnnuant(payment);
           //check if this was the last payment and set to terminated/payout beneficiary remaining ETH
           if(noOfPayouts >= numberOfYears) {
               //payout remaining balance to beneficiary
                (bool success, ) = charity.call{value: address(this).balance}("");
                require(success, "Failed to payout charity");
           }
           if(noOfPayouts >= numberOfYears || address(this).balance == 0) {
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

    function changeBeneficiary(address _newBeneficiary) public {
        require(msg.sender == trustee, "Only the Trustee is allowed to change the Beneficiary address");
        trustee = payable(_newBeneficiary);
    }

    function liquidate() public {
        require(msg.sender == trustee, "Only the Trustee can liquidate the trust");
        (bool success, ) = trustee.call{value: address(this).balance}("");
        require(success, "Failed to liquidate");
        terminated = true;
    }

    function getTrustData() public view deployerOwnerTrusteeCharity returns(
        address, //0: owner
        address, //1: annuant
        address, //2: trustee
        address, //3: beneficiary
        uint, //4: last payment timestamp
        uint, //5: number of years
        bool, //6: terminated
        Payment memory, //7: initial grant
        uint, //8: payment percent
        Payment[] memory //9: payments made;
    ) {
        return(
            owner,
            annuant,
            trustee,
            charity,
            lastTimeStamp,
            numberOfYears,
            terminated,
            initialGrant,
            paymentPercent,
            payments
        );
    }

    function getTrusteeAddress() public view deployerOwnerTrusteeCharity returns(address) {
        return trustee;
    }

    function getCharityAddress() public view deployerOwnerTrusteeCharity returns(address) {
        return charity;
    }

    function getOwnerAddress() public view deployerOwnerTrusteeCharity returns(address) {
        return owner;
    }
}