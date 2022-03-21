// SPDX-License-Identifier: MIT
pragma solidity >=0.8.11;

import "hardhat/console.sol";
import "./RoboTrust.sol";
import "./RoboTrustCRUT.sol";

//Needs to allow a user to call a function to deploy a RoboTrust contract (passing in arguments)
//Needs to keep track of all deployed trusts
contract RoboTrustDeployer {
    address internal priceFeedAddress;
    RoboTrust[] public trustList;
    RoboTrustCRUT[] public crutList;
    string internal disclaimer;
    mapping(address => uint[]) internal ownerToTrusts;
    mapping(address => uint[]) internal trusteeToTrusts;
    mapping(address => uint[]) internal beneficiaryToTrusts;
    mapping(address => uint[]) internal addressToCRUT;

    constructor(address _priceFeedAddress) {
        priceFeedAddress = _priceFeedAddress;
        disclaimer = "By signing the smart contract, you acknowledge that use of a digital mechanism for forming a trust may not be permissible under your state's jurisdiction, has not been approved by the Internal Revenue Service, and has not been recognized in any court of law. You represent that you have sought appropriate financial and legal advice, and that you are not reliant on any representations or suggestions of Robotrust.xyz. You hereby waive any right for yourself, your heirs, and assigns to hold Robotrust.xyz liable for (i) any indirect, incidental, special, consequential or punitive damages, or financial loss, whether incurred directly or indirectly or resulting from your access to or use or inability to access or use Robotrust.xyz; or (ii) any conduct of a third party, including any unauthorized access, use, or alteration of your transmissions. You agree that any dispute arising out of or relating to the use of Robotrust.xyz, including the termination of the scope or applicability of this agreement to arbitrate, will be determined by arbitration in the state of Texas or another mutually agreed upon location, before one neutral arbitrator.";
    }

    function createTrust(uint256 _period, uint _numberOfYears, uint[] memory _paymentAmounts, uint _annuityPV, address _trustee, address _beneficiary, bool _showAccounting, string memory _disclaimer) public payable returns(RoboTrust){
        require(keccak256(abi.encodePacked(disclaimer)) == keccak256(abi.encodePacked(_disclaimer)), "You must sign our disclaimer");
        RoboTrust newTrust = (new RoboTrust){value: msg.value}(msg.sender, _trustee, _beneficiary, _period, _numberOfYears, _paymentAmounts, _annuityPV, priceFeedAddress, _showAccounting);
        uint index = trustList.length;
        trustList.push(newTrust);
        ownerToTrusts[msg.sender].push(index);
        trusteeToTrusts[address(newTrust.getTrusteeAddress())].push(index);
        if(newTrust.getShowBeneficiaryAccounting()) {
            beneficiaryToTrusts[address(newTrust.getBeneficiaryAddress())].push(index);
        }
        return newTrust;
    }

    function createCRUT(address _annuant, address _trustee, address _beneficiary, uint16 _numberOfYears, uint16 _paymentPercent, string memory _disclaimer) public payable {
        require(keccak256(abi.encodePacked(disclaimer)) == keccak256(abi.encodePacked(_disclaimer)), "You must sign our disclaimer");
        RoboTrustCRUT newCRUT = (new RoboTrustCRUT){value: msg.value}(msg.sender, _annuant, _trustee, _beneficiary, 60, _numberOfYears, _paymentPercent, priceFeedAddress);
        uint index = crutList.length;
        crutList.push(newCRUT);
        addressToCRUT[msg.sender].push(index);
        if(msg.sender != _trustee) {
            addressToCRUT[_trustee].push(index);
        }
        if(msg.sender != _annuant && _trustee != _annuant) {
            addressToCRUT[_annuant].push(index);
        }
        addressToCRUT[_beneficiary].push(index);
    }

    function getOwnerTrusts(address _owner) public view returns(uint[] memory) {
        return ownerToTrusts[_owner];
    }

    function getTrusteeTrusts(address _trustee) public view returns(uint[] memory) {
        return trusteeToTrusts[_trustee];
    }

    function getBeneficiaryTrusts(address _beneficiary) public view returns(uint[] memory) {
        return beneficiaryToTrusts[_beneficiary];
    }

    function getAddressCRUT(address _address) public view returns(uint[] memory) {
        return addressToCRUT[_address];
    }
}