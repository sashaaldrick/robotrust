//SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "hardhat/console.sol";

contract RoboTrust {

    address payable public owner;
    uint public lastExecuted;

    constructor() payable {
        owner = payable(msg.sender); // convert msg.sender to payable.
    }

    function payOwner(uint256 _amount) external {
        (bool sent, ) = owner.call{value: _amount}("");
        require(sent, "Failed to send Ether");
        lastExecuted = block.number;
    }

    function getLastExecuted() external view returns(uint) {
        return lastExecuted;
    }

}