// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "hardhat/console.sol";
import "./RoboTrust.sol";

//Needs to allow a user to call a function to deploy a RoboTrust contract (passing in arguments)
//Needs to keep track of all deployed trusts
contract RoboTrustDeployer {
    address internal priceFeedAddress;
    RoboTrust[] public trustList;
    mapping(address => uint[]) public addressToTrusts;

    constructor(address _priceFeedAddress) {
        priceFeedAddress = _priceFeedAddress;
    }

    function createTrust(uint256 _period, uint _maxPayouts, uint[] memory _paymentAmounts, uint _annuityPV, address _trustee, address _beneficiary) public payable {
        RoboTrust newTrust = (new RoboTrust){value: msg.value}(msg.sender, _trustee, _beneficiary, _period, _maxPayouts, _paymentAmounts, _annuityPV, priceFeedAddress);
        uint index = trustList.length;
        trustList.push(newTrust);
        addressToTrusts[msg.sender].push(index);
    }
}