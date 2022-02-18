//SPDX-License-Identifier: MIT
// v 0.3; implementing keepers script on Arbitrum. DONE.
pragma solidity >=0.8.11;

import "hardhat/console.sol";
import "./FinancialMathHelper.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract RoboTrust is FinancialMathHelper {
    address payable private owner;
    address payable private trustee;
    address payable private beneficiary;
    address private deployerContract;
    uint256 internal immutable period;
    uint256 internal lastTimeStamp;
    uint private noOfPayouts;
    uint private numberOfYears;
    bool public terminated;
    bool private showBeneficiaryAccounting;
    uint private immutable gift; //USD to 18 decimals
    uint private immutable annuityPV;
    uint private immutable startedTimestamp; //USD to 18 decimals
    Payment private initialGrant;
    uint[] private paymentAmounts; //in USD to 18 decimals (10**18)
    Payment[] private payments;

    modifier deployerOwnerTrustee() {
        require(msg.sender == owner || msg.sender == trustee || msg.sender == deployerContract);
        _;
    }

    modifier beneficiaryCanView() {
        require(msg.sender == beneficiary && showBeneficiaryAccounting);
        _;
    }

    constructor(address _owner, address _trustee, address _beneficiary, uint256 _period, uint _numYears, uint[] memory _paymentAmounts, uint _annuityPV, address _priceFeedAddress, bool _showAccounting) FinancialMathHelper(_priceFeedAddress) payable {
        require(_owner != _beneficiary, "Grantor cannot also be the beneficiary");
        require(_trustee != beneficiary, "Beneficiary cannot also be the Trustee");
        deployerContract = msg.sender;
        owner = payable(_owner); // convert msg.sender to payable.
        trustee = payable(_trustee);
        beneficiary = payable(_beneficiary);
        terminated = false;
        showBeneficiaryAccounting = _showAccounting;
        period = _period; // period to next payment i.e. time or number of blocks. need to update to one year for final
        numberOfYears = _numYears; // maximum payouts over the trust's lifespan.
        lastTimeStamp = block.timestamp; 
        paymentAmounts = _paymentAmounts; //list of each payments, will iterate through index
        (uint _usdValue, uint _ethPrice, uint _priceRound, uint _priceTimestamp) = getUSDValue(msg.value);
        initialGrant = Payment(msg.value, block.timestamp, _ethPrice, _priceRound, _priceTimestamp, _usdValue);
        annuityPV = _annuityPV;
        uint _gift;
        if(annuityPV > _usdValue) {
            _gift = 0;
        } else {
            _gift = _usdValue - annuityPV;
        }
        gift = _gift;
        startedTimestamp = block.timestamp;
    }

    //_payment: amount in ETH (Wei) to pay
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
       upkeepNeeded = (block.timestamp - lastTimeStamp) > period && noOfPayouts < numberOfYears && !terminated;
    }
 
   function performUpkeep() external {
       if ((block.timestamp - lastTimeStamp) > period && noOfPayouts < numberOfYears && !terminated) {
           lastTimeStamp = block.timestamp;
           //get USD payment needed to distribute
           Payment memory payment = getPaymentEthAmount(paymentAmounts[noOfPayouts]);
           payOwner(payment);
           //check if this was the last payment and set to terminated/payout beneficiary remaining ETH
           if(noOfPayouts >= numberOfYears) {
               //payout remaining balance to beneficiary
                (bool success, ) = beneficiary.call{value: address(this).balance}("");
                require(success, "Failed to payout beneficiary");
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

    function liquidate() public {
        require(msg.sender == trustee, "Only the Trustee can liquidate the trust");
        (bool success, ) = trustee.call{value: address(this).balance}("");
        require(success, "Failed to liquidate");
        terminated = true;
    }

    function getTrustData() public view deployerOwnerTrustee returns(
        address, //0: owner
        address, //1: trustee
        address, //2: beneficiary
        uint, //3: last payment timestamp
        uint, //4: number of years
        bool, //5: terminated
        bool, //6: show beneficiary account
        uint, //7: Gift amount
        uint, //8: annuity present value total
        Payment memory, //9: initial grant
        uint[] memory, //10: payment Amounts; //in USD to 18 decimals (10**18)
        Payment[] memory //11: payments made;
    ) {
        return(
            owner,
            trustee,
            beneficiary,
            lastTimeStamp,
            numberOfYears,
            terminated,
            showBeneficiaryAccounting,
            gift,
            annuityPV,
            initialGrant,
            paymentAmounts,
            payments
        );
    }

    //TO DO
    function getTrustDataBeneficiary() public view beneficiaryCanView returns(
        address, //0: owner
        address, //1: trustee
        address, //2: contract address
        uint, //3: contract balance
        Payment[] memory, //4: payments made
        uint, //5: starting timestamp
        uint //6: number of years
    ) {
        return (
            owner,
            trustee,
            address(this),
            address(this).balance,
            payments,
            startedTimestamp,
            numberOfYears
        );
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
}